#!/bin/bash

# This script has to be run from the root of the project folder

echo "Preparing environment..."
# Set up all needed variables
source scripts/setup-env.sh

echo "Checking ENVs..."
if [ -z "$DOCKER_USER" ] || [ -z "$DOCKER_TOKEN" ] || [ -z "$TEST_IMAGE" ]; then
    echo "Core ENVs are not set, aborting"
    exit 1
else 
    echo "All needed ENVs are set, proceeding..."
fi

echo "Taking down any previous instance of the test environment..."
# Remove any lingering environments
docker compose down

echo "Running the test environment..."
# Run the tests
docker compose up $TEST_IMAGE --build --exit-code-from $TEST_IMAGE 
test_result=$?

echo "Cleaning up..."
# Remove environments
docker compose down

# If express-app-tests service does not return errors
if [ $test_result -eq 0 ]; then

    echo "Tests passed! Building the project..."
    # Build the project
    docker compose build express-app-prod addresses-db-prod --no-cache

    echo "Logging in to DockerHub..."
    # Log in to DockerHub using ENV for username and token
    docker login -u $DOCKER_USER -p $DOCKER_TOKEN
    login_result=$?

    if [ $login_result -eq 0 ]; then
 
        echo "Login Success! Updating images..."
        # Push the images to DockerHub
        docker compose push express-app-prod addresses-db-prod 
        upload_result=$?

        if [ $upload_result -eq 0 ]; then
            echo "Images updated successfully!"
            exit 0
        else
            echo "Images failed to upload. Error code: 3"
            exit 4
        fi
    else
        echo "Login failed. exiting. Error code: 2"
        exit 3
    fi
else
    echo "Tests did not pass. exiting. Error code: 1"
    exit 2
fi
