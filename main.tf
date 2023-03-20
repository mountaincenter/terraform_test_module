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

module "ecs" {
  source            = "./ecs"
  r_prefix          = var.r_prefix
  target_group_arn  = module.alb.target_group_arn
  public_subnet_ids = module.network.public_subnet_ids
  security_group    = module.security_group.sg_alb
}