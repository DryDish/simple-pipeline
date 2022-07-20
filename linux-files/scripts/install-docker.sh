#!/bin/bash
# Must be run as sudo

# Add required dependecies
apt-get install ca-certificates curl gnupg lsb-release

# Get docker gpg key to validate their repositories
mkdir -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | \
    gpg --dearmor -o /etc/apt/keyrings/docker.gpg


# Add docker repository
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | \
    sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Update package manager and install docker and docker compose
apt update
apt-get install docker-ce docker-ce-cli containerd.io docker-compose-plugin


# add docker to usergroup
groupadd docker
usermod -aG docker $USER

echo "Install completed, please reboot before you attempt to use docker."

exit 0
