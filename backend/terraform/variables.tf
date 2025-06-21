variable "mongodb_uri" {
  description = "MongoDB connection URI"
  type        = string
  default     = ""
}

variable "secret_key" {
  description = "Secret key for application security"
  type        = string
  sensitive   = true
  default     = ""
}

variable "jwt_secret_key" {
  description = "JWT secret key for token signing"
  type        = string
  sensitive   = true
  default     = ""
}

variable "frontend_url" {
  description = "URL of the frontend application"
  type        = string
  default     = ""
}
