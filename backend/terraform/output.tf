output "lambda_url" {
  description = "URL for the deployed Lambda function via API Gateway"
  value       = aws_apigatewayv2_stage.default_stage.invoke_url
}

output "ecr_image_uri" {
  description = "Image URI used for Lambda deployment"
  value       = "${aws_ecr_repository.lambda_ecr_repo.repository_url}:latest"
}
