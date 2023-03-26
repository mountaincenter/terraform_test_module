output "alb_dns_name" {
  value = aws_lb.sample_lb.dns_name
}

output "alb_id" {
  value = aws_lb.sample_lb.id
}

output "alb_zone_id" {
  value = aws_lb.sample_lb.zone_id
}

output "target_group_arn" {
  value = aws_lb_target_group.sample_lb_tg.arn
}