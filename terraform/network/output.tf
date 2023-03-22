output "vpc_id" {
  value = aws_vpc.sample_vpc.id
}

output "public_subnet_ids" {
  value = values(aws_subnet.sample_public_subnet)[*].id
}

output "private_subnet_ids" {
  value = values(aws_subnet.sample_private_subnet)[*].id
}