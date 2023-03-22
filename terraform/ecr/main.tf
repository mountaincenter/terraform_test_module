# ===========
# ECR
# ===========
resource "aws_ecr_repository" "app" {
  name                 = var.repository_name
  image_tag_mutability = "MUTABLE"
  image_scanning_configuration {
    scan_on_push = true
  }
  force_delete = true
}

resource "aws_ecr_lifecycle_policy" "lifecycle_policy" {
  repository = aws_ecr_repository.app.name

  policy = <<EOF
  {
    "rules": [
      {
        "rulePriority": 1,
        "description": "Delete images when count is more than 500",
        "selection": {
          "tagStatus": "any",
          "countType": "imageCountMoreThan",
          "countNumber": 500
        },
        "action": {
          "type": "expire"
        }
      }
    ]
  }
EOF
}

# ===================
# CloudWatch Logs
# ===================
resource "aws_cloudwatch_log_group" "sample_log_group" {
  name = "/ecs/${var.repository_name}"
}