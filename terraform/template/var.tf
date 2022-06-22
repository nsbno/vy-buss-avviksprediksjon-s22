variable "name_prefix" {
  description = "A prefix used for naming resources."
  type        = string
}

variable "env" {
  description = "The name of the environment (e.g., `test`, `stage`, `prod`)"
  type        = string
}

variable "tags" {
  description = "A map of tags (key-value pairs) passed to resources."
  type        = map(string)
  default     = {}
}

variable "hosted_zone_name" {
  description = "the hosted zone name for the account (domain)"
  type        = string
}

variable "application_name" {
  description = "name of the application"
  type        = string
}
