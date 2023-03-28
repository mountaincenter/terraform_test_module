variable "aws_access_key" {}
variable "aws_secret_key" {}
variable "aws_account_id" {}
variable "db_name" {
  default = "sample_app_production"
}
variable "db_username" {
  default = "root"
}
variable "db_password" {}
variable "rails_master_key" {}
variable "domain_name" {}
# 作成するリソースのプレフィックス
variable "r_prefix" {
  default = "sample"
}

locals {
  fqdn = {
    web_name = "web.${var.domain_name}"
    api_name = "api.${var.domain_name}"
  }
  bucket = {
    name = local.fqdn.web_name
  }
  db_name = {
    name = "sample_app_production"
  }
}
