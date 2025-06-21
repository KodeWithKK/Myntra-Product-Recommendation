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
resource "aws_ecr_repository" "myntra_prs_backend_repo" {
  name                 = "myntra-prs-backend"
  image_tag_mutability = "MUTABLE"
  force_delete         = true
}

resource "aws_ecr_lifecycle_policy" "ecr_lifecycle" {
  repository = aws_ecr_repository.myntra_prs_backend_repo.name

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
    ignore_changes = [name] # in case name was already created manually
  }
}

resource "aws_iam_role_policy_attachment" "lambda_logs" {
  role       = aws_iam_role.lambda_exec_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}


# --- Lambda Function ---
resource "aws_lambda_function" "myntra_prs_backend_lambda" {
  function_name = "myntra-prs-backend"
  role          = aws_iam_role.lambda_exec_role.arn
  package_type  = "Image"
  image_uri     = "${aws_ecr_repository.myntra_prs_backend_repo.repository_url}:latest"
  timeout       = 10
  memory_size   = 2048

  tags = {
    Project = "Myntra-prs-backend"
  }

  depends_on = [aws_ecr_repository.myntra_prs_backend_repo]

  lifecycle {
    ignore_changes = [image_uri]
  }
}

# --- Lambda Function URL ---
resource "aws_lambda_function_url" "myntra_prs_backend_url" {
  function_name      = aws_lambda_function.myntra_prs_backend_lambda.function_name
  authorization_type = "NONE"
}
