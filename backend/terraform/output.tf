output "api_gateway_url" {
  description = "Public URL for Flask backend via API Gateway"
  value       = aws_apigatewayv2_stage.default_stage.invoke_url
}

output "ecr_image_uri" {
  description = "Docker image URI to push to"
  value       = "${aws_ecr_repository.lambda_ecr_repo.repository_url}:latest"
}
