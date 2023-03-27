# eval ssh-agent
eval `ssh-agent -s`
# add private key
ssh-add /home/lance/.ssh/extreme_pem_aws_20220814.pem
# connect to remote host
ssh ubuntu@johndusel.com
