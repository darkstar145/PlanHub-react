#!/bin/bash

yarn run build
rsync -avz -e ssh ./build/ sepeng@proj-309-ss-1.cs.iastate.edu:/var/www/html/
