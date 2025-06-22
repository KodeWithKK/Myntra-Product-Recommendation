output "api_gateway_url" {
  description = "Public URL for Flask backend via API Gateway"
  value       = "https://${aws_api_gateway_rest_api.api.id}.execute-api.ap-south-1.amazonaws.com/${aws_api_gateway_stage.api_stage.stage_name}/"
}

output "ecr_image_uri" {
  description = "Docker image URI to push to"
  value       = "${aws_ecr_repository.lambda_ecr_repo.repository_url}:latest"
}
