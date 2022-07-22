#!/bin/bash

# Simple script to install NodeJS 16 and npm 8

echo "> Downloading install script for NodeJs v16..."
curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
status1=$?

echo "> Installing NodeJs..."
sudo apt install -y nodejs
status2=$?



echo ""
if [ $status1 -eq 0 ] && [ $status2 -eq 0 ]; then
    echo "> Installation completed successfully!"
elif [ $status1 -ne 0 ]; then
    echo "> Installation failed! Unable to add PPAs."
else 
    echo "> Installation failed! Unable to install NodeJS."
fi
echo ""