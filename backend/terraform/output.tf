output "lambda_url" {
  description = "URL for the Lambda function"
  value       = aws_lambda_function_url.lambda_ecr_function_url.function_url
}

output "ecr_image_uri" {
  description = "Image URI used for Lambda deployment"
  value       = "${aws_ecr_repository.lambda_ecr_repo.repository_url}:latest"
}
