# Simple pipeline

Small project to try and make a simple CI/CD pipeline from scratch using
NodeJs, Docker , Docker Compose and Bash scripts.

This project uses NodeJS with Express to make a small server to listen for
incoming GitHub webhooks.

The pipeline expects a docker compose that marks one of the images as the test
image. If there are other images that must run together with the test image,
they must be marked as dependent on in the docker-compose.yml.

For the purposes of this pipeline, I use this repository :
[repo link](https://github.com/DryDish/assignment-tests-mandatory).

This pipeline has two hard-coded image names so for now it really only works
with this repository, but could be made more generic in the future.

# Install instructions

I have made three scripts that should automate the entire set up of the
application.

Those scripts where created to work with Ubuntu Server 22.04, as this is what I
used when i had hosted this on AWS. It may work for other _Debian_ based
distributions as well.

To get the application running, just clone this repository to a fresh instance
of Ubuntu Server 22.04 navigate to linux-files/install-scripts and run them in
this order:

1. [install-docker.sh](linux-files/install-scripts/install-docker.sh) (this will also ask you to reboot after installation )
2. [install-nodejs.sh](linux-files/install-scripts/install-nodejs.sh)
3. [setup-project.sh](linux-files/install-scripts/setup-project.sh)

Once those scripts are executed the system should be up and running listening
on port 8080.

If something goes wrong, i have included a manual install guide that can be
found: [here](ubuntu-server-setup.md)

# Running the pipeline

If you want to see the pipeline in action, you can use Postman or something
similar to send a POST request to `localhost:8080/github` with the sample
[webhook message](linux-files/test-files/sample-webhook.json) I included in the
folder: linux-files/test-files/ of the repository.

# Running the pipeline

In this repository i have included a sample message of what GitHub would send
to the server in the event of a push event in a.json file called
[sample-webhook.json](linux-files/test-files/sample-webhook.json) located in:
_linux-files/test-files/sample-webhook.json_

This is a slightly modified version of a real webhook sent by GitHub, and will
make the pipeline pull the repository mentioned earlier, and run the test suite
on it.

Use Postman, or something similar, to send a post request to
`localhost:8080/github` with the body of the message being the contents of the
sample-webhook.json file.

It will do the following:

1. Checkout the branch specified in the file
2. Spin up the containers required to run the test suite
3. Execute the test suite
4. If the test suite passes, it will build the containers of the application
5. Sign in to DockerHub with the credentials provided in the
   [setup-env.sh](hook-server/src/utils/scripts/setup-env.sh) file.
6. Push the docker images to the remote repository.

If the test suite passes, the exit code will be `0`.

Any non `0` exit code is to be considered a failed pipeline execution.

Currently, pipeline will fail with error `2`, as the credentials for DockerHub
are only placeholders. If you wish to have them actually upload, change the
value of the Docker Hub credentials in
_/opt/hook-server/src/utils/scripts/setup-env.sh_.

Any change to any script in that folder will be applied on the next execution
of the pipeline, no reloading required.
