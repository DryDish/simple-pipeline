#!/bin/bash

echo "> Creating folder for the app in /opt..."
sudo mkdir -p /opt/hook-server

echo "> Creating folder for logs in /home/$(logname)/.log/hook-server..."
mkdir -p /home/$(logname)/.log/hook-server

echo "> Cloning repo to /tmp/ folder..."
git clone https://github.com/DryDish/simple-pipeline /tmp/gittemp

echo "> Extracting hook-server out of repository folders..."
mv /tmp/gittemp/hook-server /tmp/hook-server


echo "> Entering the hook-sever folder to run npm install..."
cd /tmp/hook-server
npm install

echo "> Building the hook-server application..."
npm run build

echo "> Marking the built application as executable..."
chmod +x /tmp/hook-server/build/app.js

echo "> Moving the compiled application to its /opt/ folder..."
sudo mv /tmp/hook-server /opt/

echo "> Coping the service config to /etc/systemd/system/..."
sudo cp /tmp/gittemp/linux-files/hook-server.service /etc/systemd/system/hook-server.service

echo "> Enabling and starting the service..."
sudo systemctl enable hook-server.service --now

echo ""
echo "> Script exectution completed!"
echo ""
