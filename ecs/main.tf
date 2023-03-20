# ==============
# ECS Cluster
# ==============
resource "aws_ecs_cluster" "sample_cluster" {
  name = "${var.r_prefix}-cluster"
}

# ===================
# Task Definitions
# ===================
resource "aws_ecs_task_definition" "sample_app_nginx" {
  family                   = "sample-app"
  requires_compatibilities = ["FARGATE"]
  network_mode             = "awsvpc" # Fargateを使う場合は「awsvpc」で固定
  task_role_arn            = "arn:aws:iam::${data.aws_caller_identity.current.account_id}:role/ecs-task-role"
  execution_role_arn       = "arn:aws:iam::${data.aws_caller_identity.current.account_id}:role/ecs-task-role"
  cpu                      = 512
  memory                   = 1024
  container_definitions    = file("./ecs/app-nginx.json")
}

resource "aws_ecs_service" "sample_service" {
  cluster                            = aws_ecs_cluster.sample_cluster.id
  launch_type                        = "FARGATE"
  deployment_minimum_healthy_percent = 100
  deployment_maximum_percent         = 200
  name                               = "sample-service"
  task_definition                    = aws_ecs_task_definition.sample_app_nginx.arn
  desired_count                      = 1 # 常に1つのタスクが稼働する状態にする

  lifecycle {
    ignore_changes = [desired_count, task_definition]
  }

  load_balancer {
    target_group_arn = var.target_group_arn
    container_name   = "nginx"
    container_port   = 80
  }

  network_configuration {
    subnets          = var.public_subnet_ids
    security_groups  = [var.security_group]
    assign_public_ip = "true"
  }
}

# ===================
# CloudWatch Logs
# ===================
resource "aws_cloudwatch_log_group" "sample_log_group" {
  name = "/ecs/sample"
}