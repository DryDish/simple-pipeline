# Setup for Ubuntu Server 22.04

# THIS GUIDE IS WIP, LOTS WILL BE CHANGED BY THE TIME I AM DONE

This is a guide to prepare a new Ubuntu Server instance to be able to run the
 pipeline as it was intended to.

Required software that is not included in the Ubuntu Server 22.04 ISO:
* Docker
* Docker Compose

First thing is always to update and upgrade the current packages

* `sudo apt update && sudo apt upgrade`


# Install Docker & Docker Compose Automatically
I have provided a [script](
    linux-files/install-scripts/install-docker.sh
) to automatically install docker and docker compose.

To use it first mark it as executable with the command:
* `chmod +x install-docker.sh`

Then execute it with sudo:
* `sudo ./install-docker.sh`

# Install Docker & Docker Compose Manually

### Docker dependencies
1. `sudo apt-get install ca-certificates curl gnupg lsb-release`

### Docker repositories
Add Dockers GPG key to use their repositories, as Ubuntu's ones tend to be out
 of date

1. `sudo mkdir -p /etc/apt/keyrings`
2. `curl -fsSL https://download.docker.com/linux/ubuntu/gpg |  sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg`

Add the repository with the newly added gpg key

3. `echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null`


### Install Docker components
Update apt and install docker

1. `sudo apt update`
2. `sudo apt-get install docker-ce docker-ce-cli containerd.io docker-compose-plugin`

### Postinstall (optional)
The following steps will allow the execution of docker without having to
 provide the root password

1. `sudo groupadd docker`
2. `sudo usermod -aG docker $USER`

Now that that's completed, reboot to apply the changes

3. `sudo reboot`

To validate that Docker and Docker Compose is installed correctly run:
* `docker run hello-world` and `docker compose version`

# NodeJS in Ubuntu Server
As of the time of writing the latest node version available on the Ubuntu
 repositories is 10.22.9.

In order to install a more recent version of NodeJS we can use the helper
 script provided by NodeSource. It will automatically add the PPA for the
NodeJS version specified. The advantage of doing it this way is that it
 will be kept up to date by apt as well.

# Install NodeJS 16 Automatically
I have provided a [script](
    ./linux-files/install-scripts/install-nodejs.sh
) to install NodeJS in one execution as well.

This one is far less useful, as it only runs two lines, but nice to have for
 simplicity.

# Install NodeJS 16 Manually
Script to add PPAs and update APT cache from NodeSource
* `curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -`

Install NodeJS and NPM
* `sudo apt install -y nodejs`



# Project Setup


## clone repo
Create a folder in /opt where we will store the application
* `sudo mkdir /opt/hook-server`

And a folder for the application logs
* `mkdir -p ~/.log/hook-server`

Clone the repository to a temporary directory
*  `git clone https://github.com/DryDish/simple-pipeline /tmp/gittemp`

Move the hook-server out of the repository folders
* `mv /tmp/gittemp/hook-server /tmp/hook-server`

Install the NPM modules in the hook-server subfolder
* `cd /tmp/hook-server`
* `npm install`

Build the project with:
* `npm run build`

Mark the built app.js as executable:
* `chmod +x /tmp/hook-server/build/app.js`

Move the compiled application folder to /opt/hook-server
* `sudo mv /tmp/hook-server /opt/`

Copy the service config to /etc/systemd/system:
* `sudo cp /tmp/gittemp/linux-files/hook-server.service /etc/systemd/system/hook-server.service`

Enable the service so that it starts on boot, and start it:
* `sudo systemctl enable hook-server.service --now`

To validate that the service is running correctly run:
* `systemctl status hook-server.service | grep Active`

The output should look something like this: 
> Active: active (running) since Thu 2022-07-21 22:10:26 UTC; 3s ago

If more logs are needed, run the following command to see all logs:
* `journalctl -u hook-server.service`

If desired an additional flag of `-f` can be added to the previous command to
 follow the logs as they are generated
