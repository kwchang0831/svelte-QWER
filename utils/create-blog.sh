#!/bin/bash

BASE_PATH="./user/blogs"

# Check if a directory name is provided
if [ "$#" -ne 1 ]; then
    echo "Usage: $0 <directory-name>"
    exit 1
fi

# Get the current date in ISO 8601 format with timezone
CURRENT_DATE=$(date "+%Y-%m-%dT%H:%M:%S.000")
TIMEZONE_FORMATTED=$(date "+%z" | sed 's/\([0-9][0-9]\)\([0-9][0-9]\)/\1:\2/')


# Every time you enter pnpm run createblog YourDirName, 
# a folder will be created for you based on the following configuration, 
# along with a default content for index.md. 
# You are free to edit the information as needed.

DIRECTORY="$BASE_PATH/$1"
MD_TEMPLATE="---
title: 
description: 
summary: 
published: '$CURRENT_DATE$TIMEZONE_FORMATTED'
updated: '$CURRENT_DATE$TIMEZONE_FORMATTED'
cover: ./cover.jpg
coverCaption: Photo by
coverStyle: 'IN'
series_tag:
series_title:
tag:
  - [svelte-QWER]
---"

# Ensure base path exists
if [ ! -d "$BASE_PATH" ]; then
    mkdir -p "$BASE_PATH"
fi

# Check if directory exists
if [ -d "$DIRECTORY" ]; then
    echo "Directory $DIRECTORY already exists!"
else
    mkdir "$DIRECTORY"
    echo "$MD_TEMPLATE" > "$DIRECTORY/index.md"
    echo "Directory $DIRECTORY and index.md created successfully!"
fi