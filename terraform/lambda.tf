resource "aws_lambda_function" "backend_fn" {
  function_name = "myntra-prs-backend"
  package_type  = "Image"
  image_uri     = "${aws_ecr_repository.backend.repository_url}:latest"
  role          = aws_iam_role.lambda_exec.arn
  timeout       = 30
  memory_size   = 1024 # RAM size in MB
}
