#!/bin/bash

# Simple script to install NodeJS 16 and npm 8

curl -fsSL https://deb.nodesource.com/setup_16.x | bash -
status1=$?

sudo apt install -y nodejs
status2=$?


echo ""
if [ $status1 -eq 0 ] && [ $status2 -eq 0 ]; then
    echo "Installation completed successfully"
elif [ $status1 -gt 0 ]; then
    echo "Failed to install NodeJS. Could not add PPAs."
else 
    echo "Failed to install NodeJS."
fi
