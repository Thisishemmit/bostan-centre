#!/bin/bash

# accept commit message as first argument
if [ -z "$1" ]
then
    echo "Please provide a commit message"
    exit 1
fi
#add all files to staging area
git add .

#commit with message

git commit -m "$1"

#push to origin

git push -u origin master
