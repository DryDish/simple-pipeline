#!/bin/bash

# Runs the build script, adds timestamps and appends the output to a log folder with a filename of the date at runtime
./scripts/build_script.sh 2>&1 | awk '{ print strftime("[%Y-%m-%d %H:%M:%S] -- "), $0; fflush(); }' | tee -a /home/ubuntu/.log/hook-server/$(date +"%F").txt

# Capture exit code of build_script.sh
EXIT_CODE=${PIPESTATUS[0]}

# Return exit code
exit $EXIT_CODE
