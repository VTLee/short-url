#!/bin/sh

for i in `seq 1 36`; do

    echo "Waiting for APIs..."
    nc -z dynamodb 8000 && nc -z shorturl 8001

    if [  "$?" -eq 0  ]; then
        break
    else
        sleep 5
    fi
done

nc -z dynamodb 8000 && nc -z shorturl 8001
if [ "$?" -eq 0 ]; then
    echo 'Services has started and ready.'
else
    echo 'Services has taken too long to start.  Gave up.'
    exit 1
fi
