output "ecr_image_url" {
  value = aws_ecr_repository.app.repository_url
}