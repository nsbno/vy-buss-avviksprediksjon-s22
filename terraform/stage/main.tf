terraform {
  backend "s3" {
    key            = "trafficgui-frontend-baseline/main.tfstate"
    bucket         = "395212561532-terraform-state"
    dynamodb_table = "395212561532-terraform-state"
    acl            = "bucket-owner-full-control"
    encrypt        = "true"
    kms_key_id     = "arn:aws:kms:eu-west-1:395212561532:alias/395212561532-terraform-state-encryption-key"
    region         = "eu-west-1"
  }
}

provider "aws" {
  region              = "eu-west-1"
  allowed_account_ids = ["395212561532"]
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
  hosted_zone_name = "stage.trafficgui.vydev.io"
  application_name = "trafficgui-frontend-baseline"
  environment      = "stage"
  aktivitetskode   = "15654"
}

module "trafficgui-frontend-baseline" {
  source           = "../template"
  name_prefix      = local.name_prefix
  env              = local.environment
  application_name = local.application_name
  hosted_zone_name = local.hosted_zone_name
}
