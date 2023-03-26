# =================
# Route53 Record
# =================
resource "aws_route53_record" "main" {
  zone_id = data.aws_route53_zone.naked.id
  type    = "A"
  name    = var.fqdn_name
  alias {
    name                   = var.alias_name
    zone_id                = var.zone_id
    evaluate_target_health = true
  }
}

resource "aws_route53_record" "main_amc_c" {
  for_each = {
    for d in aws_acm_certificate.main.domain_validation_options : d.domain_name => {
      name   = d.resource_record_name
      record = d.resource_record_value
      type   = d.resource_record_type
    }
  }
  zone_id         = data.aws_route53_zone.naked.id
  name            = each.value.name
  type            = each.value.type
  ttl             = 172800
  records         = [each.value.record]
  allow_overwrite = true
}
