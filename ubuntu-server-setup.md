# Setup for Ubuntu Server 22.04

# THIS GUIDE IS WIP, LOTS WILL BE CHANGED BY THE TIME I AM DONE

This is a guide to prepare a new Ubuntu Server instance to be able to run the pipeline as it was intended to.

Required software that is not included in the Ubuntu Server 22.04 ISO:
* Docker
* Docker Compose

First thing is always to update and upgrade the current packages

* `sudo apt update && sudo apt upgrade`


# Install Docker & Docker Compose Automatically
I have provided a [script](linux-files/scripts/install-docker.sh) to automatically install docker and docker compose.

To use it first mark it as executable with the command:
* `chmod +x install-docker.sh`

Then execute it with sudo:
* `sudo ./install-docker.sh`

# Install Docker & Docker Compose Manually

### Docker dependencies
1. `sudo apt-get install ca-certificates curl gnupg lsb-release`

### Docker repositories
Add Dockers GPG key to use their repositories, as Ubuntu's ones tend to be out of date

1. `sudo mkdir -p /etc/apt/keyrings`
2. `curl -fsSL https://download.docker.com/linux/ubuntu/gpg |  sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg`

Add the repository with the newly added gpg key

3. `echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null`


### Install Docker components
Update apt and install docker

1. `sudo apt update`
2. `sudo apt-get install docker-ce docker-ce-cli containerd.io docker-compose-plugin`

### Postinstall (optional)
The following steps will allow the execution of docker without having to provide the root password

1. `sudo groupadd docker`
2. `sudo usermod -aG docker $USER`

Now that that's completed, reboot to apply the changes

3. `sudo reboot`

To validate that docker is installed run: `docker run hello-world`.
To validate that docker compose is installed run: `docker compose version`

# Project Setup


## clone repo
Make two folders, one for the repository code and one for the application code.
* `mkdir -p ~/gittemp && mkdir -p ~/hook-server`

Enter the repository folder.
* `cd ~/gittemp`

Clone the repository to this directory

* `git clone https://github.com/DryDish/simple-pipeline`






## run shit i guess
Make a new folder in your home folder called 'hook-server'.

* `mkdir -p ~/hook-server`

