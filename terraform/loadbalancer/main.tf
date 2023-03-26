# =====================
# Loadbalancer
# =====================
resource "aws_lb" "sample_lb" {
  name            = "${var.r_prefix}-alb"
  security_groups = [var.security_group]

  subnets = var.public_subnet_ids

  load_balancer_type = "application"

  internal                   = false
  enable_deletion_protection = false

  access_logs {
    bucket = aws_s3_bucket.sample_lb_logs.bucket
  }
}

###### Target Group ######
resource "aws_lb_target_group" "sample_lb_tg" {
  name                 = "${var.r_prefix}-lb-tg"
  port                 = 80
  depends_on           = [aws_lb.sample_lb]
  target_type          = "ip"
  protocol             = "HTTP"
  vpc_id               = var.vpc_id
  deregistration_delay = 300

  health_check {
    interval            = 30
    path                = "/health_check"
    port                = "traffic-port"
    protocol            = "HTTP"
    timeout             = 5
    healthy_threshold   = 5
    unhealthy_threshold = 2
    matcher             = 200
  }
}

###### Listener ######
resource "aws_lb_listener" "sample_lb_listener" {
  port     = "80"
  protocol = "HTTP"

  load_balancer_arn = aws_lb.sample_lb.arn

  # default_action {
  #   target_group_arn = aws_lb_target_group.sample_lb_tg.arn
  #   type             = "forward"
  # }
  default_action {
    type = "redirect"

    redirect {
      port        = "443"
      protocol    = "HTTPS"
      status_code = "HTTP_301"
    }
  }
}

# resource "aws_lb_listener" "http_to_https" {
#   port     = "8080"
#   protocol = "HTTP"

#   load_balancer_arn = aws_lb.sample_lb.arn

#   default_action {
#     type = "redirect"

#     redirect {
#       port        = "443"
#       protocol    = "HTTPS"
#       status_code = "HTTP_301"
#     }
#   }
# }

###### Listener Rule ######
resource "aws_lb_listener_rule" "sample_lb_listener_rule" {
  depends_on   = [aws_lb_target_group.sample_lb_tg]
  listener_arn = aws_lb_listener.sample_lb_listener.arn
  priority     = 100

  action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.sample_lb_tg.arn
  }

  condition {
    path_pattern {
      values = ["/*"]
    }
  }
}

###### Listener HTTPS ######
resource "aws_lb_listener" "sample_lb_listener_https" {
  load_balancer_arn = aws_lb.sample_lb.arn
  certificate_arn   = var.acm_certificate_arn
  port              = "443"
  protocol          = "HTTPS"
  ssl_policy        = "ELBSecurityPolicy-2016-08"
  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.sample_lb_tg.id
  }
  depends_on = [
    var.acm_certificate_validation
  ]
}

# =====================
# S3 Loadbalancer Log
# =====================
resource "aws_s3_bucket" "sample_lb_logs" {
  bucket = "${var.r_prefix}-lb-logs-yam"
}
