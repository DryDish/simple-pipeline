#!/bin/bash

echo "> Updating and upgading apt cache and packages..."
sudo apt update && sudo apt upgrade -y:

echo "> Adding required dependencies..."
sudo apt-get install ca-certificates curl gnupg lsb-release

echo "> Getting docker gpg key to validate their repositories..."
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | \
   sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg

echo "> Adding docker repository..."
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | \
    sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

echo "> Updating package manager and installing docker and docker compose..."
sudo apt update
sudo apt-get install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin


echo "> Adding docker to usergroup..."
sudo groupadd docker
sudo usermod -aG docker $(logname)

echo ""
echo "> Script completed, please reboot before you attempt to use docker!"
echo ""
read -p '> Would you like to restart now? [y/N]: ' answer

if [[ "$answer" =~ ^[yY] ]]; then
    echo "> Rebooting in 3 seconds..."
    sleep 3
    sudo shutdown -r now
fi
exit 0
