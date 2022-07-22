#!/bin/bash

# Export any and all required ENVs, to be executed on the build server
export TEST_IMAGE='express-app-tests'
export APP_PORT=3000
export MYSQL_ROOT_PASSWORD='12345678'
export MYSQL_HOST='addresses-db-prod'
export SERVICE_HOST='express-app-prod'
export MYSQL_USER='test'
export MYSQL_PASSWORD='12345678'
export DOCKER_USER='username'
export DOCKER_TOKEN='password'
