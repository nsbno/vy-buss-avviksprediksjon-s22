terraform {
  backend "s3" {
    key            = "trafficgui-frontend-baseline/main.tfstate"
    bucket         = "663800104758-terraform-state"
    dynamodb_table = "663800104758-terraform-state"
    acl            = "bucket-owner-full-control"
    encrypt        = "true"
    kms_key_id     = "arn:aws:kms:eu-west-1:663800104758:alias/663800104758-terraform-state-encryption-key"
    region         = "eu-west-1"
  }
}

provider "aws" {
  region              = "eu-west-1"
  allowed_account_ids = ["663800104758"]
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
  hosted_zone_name = "test.trafficgui.vydev.io"
  application_name = "trafficgui-frontend-baseline"
  environment      = "test"
  aktivitetskode   = "15654"
}

module "trafficgui" {
  source           = "../template"
  name_prefix      = local.name_prefix
  env              = local.environment
  application_name = local.application_name
  hosted_zone_name = local.hosted_zone_name
}
