# =============
# RDS
# =============
# DB Subnet Group
resource "aws_db_subnet_group" "sample_db_subnet_group" {
  name        = "${var.r_prefix}-db-subnet-group"
  description = "${var.r_prefix}-db-subnet-group"
  subnet_ids  = var.private_subnet_ids

  tags = {
    Name = "${var.r_prefix}-db-subnet-group"
  }
}

# DB Instance
resource "aws_db_instance" "sample_db" {
  identifier          = "${var.r_prefix}-db"
  engine              = "mysql"
  engine_version      = "8.0.32"
  instance_class      = "db.t2.micro"
  allocated_storage   = 20
  storage_type        = "gp2"
  db_name             = var.db_name
  username            = var.db_username
  password            = "password"
  port                = 3306
  multi_az            = true
  skip_final_snapshot = true

  vpc_security_group_ids = [var.security_group]
  db_subnet_group_name   = aws_db_subnet_group.sample_db_subnet_group.name
}
