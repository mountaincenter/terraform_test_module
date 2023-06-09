variable "aws_access_key" {}
variable "aws_secret_key" {}
variable "aws_account_id" {}
variable "database_name" {
  default = "sample_app_production"
}
variable "database_username" {
  default = "root"
}
variable "database_password" {}
variable "domain_name" {}
# 作成するリソースのプレフィックス
variable "r_prefix" {
  default = "test"
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
