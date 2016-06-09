#!/bin/bash
# get today's date
OUTPUT="$(date)"
# You must add following two lines before
# outputting data to the web browser from shell
# script
 echo "Content-type: text/html"
 echo ""
 echo "<html><head><title>Demo</title></head><body>"
 echo "Today is $OUTPUT <br>"
 echo "Current directory is $(pwd) <br>"
 echo "Shell Script name is $0"
 echo "</body></html>"
