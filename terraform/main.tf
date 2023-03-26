module "network" {
  source   = "./network"
  r_prefix = var.r_prefix
}

module "security_group" {
  source   = "./security_group"
  r_prefix = var.r_prefix
  vpc_id   = module.network.vpc_id
}

module "alb" {
  source                     = "./loadbalancer"
  r_prefix                   = var.r_prefix
  vpc_id                     = module.network.vpc_id
  public_subnet_ids          = module.network.public_subnet_ids
  security_group             = module.security_group.sg_alb
  acm_certificate_validation = module.acm_backend.acm_certificate_validation
  acm_certificate_arn        = module.acm_backend.acm_certificate_arn
}


module "acm_frontend" {
  source      = "./acm"
  domain_name = var.domain_name
  fqdn_name   = local.fqdn.web_name
  alias_name  = module.cloudfront.cloudfront_distribution_domain_name
  zone_id     = module.cloudfront.cloudfront_distribution_hosted_zone_id
  providers = {
    aws = aws.virginia
  }
}

module "cloudfront" {
  source             = "./cloudfront"
  r_prefix           = var.r_prefix
  alb_id             = module.alb.alb_id
  fqdn_web_name      = local.fqdn.web_name
  fqdn_api_name      = local.fqdn.api_name
  bucket_name        = local.bucket.name
  acm_certificate_id = module.acm_frontend.acm_certificate_id
  wafrule_arn        = module.waf.wafrule_arn
}

module "waf" {
  source   = "./waf"
  r_prefix = var.r_prefix
}

module "acm_backend" {
  source      = "./acm"
  domain_name = var.domain_name
  fqdn_name   = local.fqdn.api_name
  alias_name  = module.alb.alb_dns_name
  zone_id     = module.alb.alb_zone_id
}

module "ecr_nginx" {
  source          = "./ecr"
  repository_name = "${var.r_prefix}-nginx"
}

module "ecr_app" {
  source          = "./ecr"
  repository_name = "${var.r_prefix}-app"
}

module "ecs" {
  source            = "./ecs"
  r_prefix          = var.r_prefix
  db_host           = module.rds.db_host
  db_name           = var.db_name
  db_password       = var.db_password
  db_username       = var.db_username
  rails_master_key  = var.rails_master_key
  target_group_arn  = module.alb.target_group_arn
  public_subnet_ids = module.network.public_subnet_ids
  security_group    = module.security_group.sg_alb
}

module "rds" {
  source             = "./rds"
  r_prefix           = var.r_prefix
  private_subnet_ids = module.network.private_subnet_ids
  db_name            = var.db_name
  db_username        = var.db_username
  security_group     = module.security_group.sg_db
}


# =================
# S3 Object Update
# =================
module "distribution_files" {
  source   = "hashicorp/dir/template"
  base_dir = "../frontend/react-app/build"
}

resource "aws_s3_object" "multiple_objects" {
  for_each     = module.distribution_files.files
  bucket       = module.cloudfront.s3_bucket_web_id
  key          = each.key
  source       = each.value.source_path
  content_type = each.value.content_type
  etag         = filemd5(each.value.source_path)
}
