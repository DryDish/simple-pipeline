hook-server is stored in the home directory of the ec2 instance. namely `/home/ubuntu`

the service file must be copied to `/ect/systemd/system`

the app.js inside src must be marked as executable with `chmod u+x app.js` 

the first line of the file must be : `#!/home/ubuntu/.nvm/versions/node/v17.8.0/bin/node` 
It points to the node binary. I have node installed there, as that is where NVM put it.