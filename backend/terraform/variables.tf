variable "mongodb_uri" {
  description = "MongoDB connection URI"
  type        = string
}

variable "secret_key" {
  description = "Secret key for application security"
  type        = string
  sensitive   = true
}

variable "jwt_secret_key" {
  description = "JWT secret key for token signing"
  type        = string
  sensitive   = true
}

variable "frontend_url" {
  description = "URL of the frontend application"
  type        = string
}
