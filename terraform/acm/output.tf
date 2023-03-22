output "acm_certificate_id" {
  value = aws_acm_certificate.main.id
}

output "acm_certificate_arn" {
  value = aws_acm_certificate.main.arn
}

output "acm_certificate_validation" {
  value = aws_acm_certificate_validation.main
}