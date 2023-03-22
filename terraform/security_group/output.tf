output "sg_alb" {
  value = aws_security_group.sample_sg_alb.id
}

output "sg_db" {
  value = aws_security_group.sample_sg_db.id
}
