data "aws_caller_identity" "current-account" {}
data "aws_region" "current" {}
data "aws_availability_zones" "main" {}

provider "aws" {
  region = "us-east-1"
  alias  = "certificate_provider"
}

locals {
  service_account_id = "171757367282"
  current_account_id = data.aws_caller_identity.current-account.account_id
  current_region     = data.aws_region.current.name
  shared_config      = jsondecode(data.aws_ssm_parameter.shared_config.value)
}

resource "aws_s3_bucket" "frontend-baseline" {
  bucket = "${local.current_account_id}-${var.application_name}"
  acl    = "private"

  website {
    index_document = "index.html"
    error_document = "index.html"
  }

  versioning {
    enabled = true
  }
}
module "trafficgui-frontend-baseline-website" {
  source = "github.com/nsbno/terraform-aws-multi-domain-static-site?ref=9e45b42"
  providers = {
    aws.certificate_provider = aws.certificate_provider
  }
  name_prefix         = var.name_prefix
  use_external_bucket = true
  website_bucket      = aws_s3_bucket.frontend-baseline.id

  domain_name = {
    name = "${var.application_name}.${var.hosted_zone_name}"
    zone = var.hosted_zone_name
  }

  subject_alternative_names = []
}

resource "aws_ssm_parameter" "trafficgui-frontend-baseline-version" {
  name      = "/${var.name_prefix}/versions/${var.application_name}"
  value     = "latest"
  type      = "String"
  overwrite = true
  lifecycle {
    ignore_changes = [value]
  }
}


##################################
#                                #
# Frontend deployment            #
#                                #
##################################
module "frontend_deployment" {
  source       = "github.com/nsbno/terraform-aws-frontend-deployment?ref=8300163"
  lambda_name  = "${var.name_prefix}-pipeline-unzip-to-bucket"
  lambda_owner = local.service_account_id
  role_name    = "${var.application_name}-unzip-to-bucket-cross-account"
  frontend_applications = [
    {
      s3_source_bucket = "${local.service_account_id}-pipeline-artifact"
      s3_source_key    = "nsbno/trafficgui-aws/frontends/${var.application_name}/${aws_ssm_parameter.trafficgui-frontend-baseline-version.value}.zip"
      s3_target_bucket = aws_s3_bucket.frontend-baseline.id
    }
  ]
}

##################################
#                                #
# Shared configuration           #
#                                #
##################################
data "aws_ssm_parameter" "shared_config" {
  name = "/trafficgui/shared_application_config"
}
