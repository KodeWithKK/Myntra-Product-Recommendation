output "lambda_url" {
  description = "URL for the Myntra PRS Backend Lambda function"
  value       = aws_lambda_function_url.myntra_prs_backend_url.function_url
}

output "ecr_image_uri" {
  description = "Image URI used for Lambda deployment"
  value       = "${aws_ecr_repository.myntra_prs_backend_repo.repository_url}:latest"
}
