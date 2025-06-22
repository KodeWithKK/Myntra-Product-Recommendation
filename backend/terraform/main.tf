terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "6.0.0"
    }
  }

  backend "s3" {
    bucket       = "k3-tfstates"
    key          = "myntra-prs-backend/terraform.tfstate"
    region       = "ap-south-1"
    encrypt      = true
    use_lockfile = true
  }
}

provider "aws" {
  region = "ap-south-1"
}

# --- ECR Repository ---
resource "aws_ecr_repository" "lambda_ecr_repo" {
  name                 = "myntra-prs-backend"
  image_tag_mutability = "MUTABLE"
  force_delete         = true
}

resource "aws_ecr_lifecycle_policy" "ecr_lifecycle" {
  repository = aws_ecr_repository.lambda_ecr_repo.name

  policy = jsonencode({
    rules = [
      {
        rulePriority = 1
        description  = "Keep only latest image"
        selection = {
          tagStatus     = "tagged"
          tagPrefixList = ["latest"]
          countType     = "imageCountMoreThan"
          countNumber   = 1
        }
        action = {
          type = "expire"
        }
      }
    ]
  })
}

# --- IAM Role for Lambda ---
resource "aws_iam_role" "lambda_exec_role" {
  name = "myntra-prs-backend-role"
  assume_role_policy = jsonencode({
    Version = "2012-10-17",
    Statement = [{
      Action = "sts:AssumeRole",
      Effect = "Allow",
      Principal = {
        Service = "lambda.amazonaws.com"
      }
    }]
  })

  lifecycle {
    ignore_changes = [name]
  }
}

resource "aws_iam_role_policy_attachment" "lambda_logs" {
  role       = aws_iam_role.lambda_exec_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

# --- Lambda Function ---
resource "aws_lambda_function" "lambda_ecr_function" {
  function_name = "myntra-prs-backend"
  role          = aws_iam_role.lambda_exec_role.arn
  package_type  = "Image"
  image_uri     = "${aws_ecr_repository.lambda_ecr_repo.repository_url}:latest"
  timeout       = 10
  memory_size   = 2048

  environment {
    variables = {
      MONGODB_URI    = var.mongodb_uri
      SECRET_KEY     = var.secret_key
      JWT_SECRET_KEY = var.jwt_secret_key
      FRONTEND_URL   = var.frontend_url
    }
  }

  tags = {
    Project = "Myntra-prs-backend"
  }

  depends_on = [aws_ecr_repository.lambda_ecr_repo]

  lifecycle {
    ignore_changes = [image_uri]
  }
}

# === HTTP API Gateway Setup ===

# 1. Create HTTP API
resource "aws_apigatewayv2_api" "http_api" {
  name          = "myntra-prs-backend-api"
  protocol_type = "HTTP"
}

# 2. Lambda Integration
resource "aws_apigatewayv2_integration" "lambda_integration" {
  api_id                 = aws_apigatewayv2_api.http_api.id
  integration_type       = "AWS_PROXY"
  integration_uri        = aws_lambda_function.lambda_ecr_function.invoke_arn
  integration_method     = "POST"
  payload_format_version = "2.0"
}

# 3. Route (ANY /{proxy+})
resource "aws_apigatewayv2_route" "default_route" {
  api_id    = aws_apigatewayv2_api.http_api.id
  route_key = "ANY /{proxy+}"
  target    = "integrations/${aws_apigatewayv2_integration.lambda_integration.id}"
}

# 4. Deploy Stage
resource "aws_apigatewayv2_stage" "default_stage" {
  api_id      = aws_apigatewayv2_api.http_api.id
  name        = "$default"
  auto_deploy = true
}

# 5. Lambda Permission for API Gateway
resource "aws_lambda_permission" "allow_apigw_invoke" {
  statement_id  = "AllowAPIGatewayInvoke"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.lambda_ecr_function.function_name
  principal     = "apigateway.amazonaws.com"
  source_arn    = "${aws_apigatewayv2_api.http_api.execution_arn}/*/*"
}
