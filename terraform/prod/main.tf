terraform {
  backend "s3" {
    key            = "trafficgui-frontend-baseline/main.tfstate"
    bucket         = "227100763841-terraform-state"
    dynamodb_table = "227100763841-terraform-state"
    acl            = "bucket-owner-full-control"
    encrypt        = "true"
    kms_key_id     = "arn:aws:kms:eu-west-1:227100763841:alias/227100763841-terraform-state-encryption-key"
    region         = "eu-west-1"
  }
}

provider "aws" {
  region              = "eu-west-1"
  allowed_account_ids = ["227100763841"]
  default_tags {
    tags = {
      terraform      = "true"
      env            = local.environment
      aktivitetskode = local.aktivitetskode
      application    = "${local.name_prefix}-${local.application_name}"
    }
  }
}

locals {
  name_prefix      = "trafficgui"
  hosted_zone_name = "trafficgui.vydev.io"
  application_name = "trafficgui-frontend-baseline"
  environment      = "prod"
  aktivitetskode   = "15654"
}

module "trafficgui-frontend-baseline" {
  source           = "../template"
  name_prefix      = local.name_prefix
  env              = local.environment
  application_name = local.application_name
  hosted_zone_name = local.hosted_zone_name
}
