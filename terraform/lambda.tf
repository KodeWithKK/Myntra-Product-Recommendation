resource "null_resource" "wait_for_image" {
  triggers = {
    image_pushed = timestamp()
  }

  provisioner "local-exec" {
    command = <<EOT
      aws ecr describe-images \
        --repository-name myntra-prs-backend \
        --image-ids imageTag=latest \
        --region ap-south-1 \
        || (echo "Image not yet available" && exit 1)
    EOT
  }
}


resource "aws_lambda_function" "backend_fn" {
  depends_on    = [null_resource.wait_for_image]
  function_name = "myntra-prs-backend"
  package_type  = "Image"
  image_uri     = "${aws_ecr_repository.backend.repository_url}:latest"
  role          = aws_iam_role.lambda_exec.arn
  timeout       = 30
  memory_size   = 1024 # RAM size in MB
}
