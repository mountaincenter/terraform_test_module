# =================
# ACM Certificate
# =================
resource "aws_acm_certificate" "main" {
  domain_name       = var.fqdn_name
  validation_method = "DNS"
}

resource "aws_acm_certificate_validation" "main" {
  certificate_arn         = aws_acm_certificate.main.arn
  validation_record_fqdns = [for record in aws_route53_record.main_amc_c : record.fqdn]
}
