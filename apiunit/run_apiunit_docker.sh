#!/bin/bash
if [ "$#" -ne 1 ]; then
    echo "Please specify a one arguemnt command (login/pull/up/down)";
fi

if [ "$1" == "login" ]; then
    loginCMD=$(aws ecr get-login --region=us-east-1 --no-include-email --registry-ids 328794784071);
    eval $loginCMD;
elif [ "$1" == "pull" ]; then
    docker-compose -f docker-compose-component-testing.yml pull;
    echo "Pull Compelete";
elif [ "$1" == "up" ]; then
    export NPM_API_KEY=$(awk -F= '{ print $2 }' ~/.npmrc)
    docker-compose -f docker-compose-component-testing.yml down;
    cd .. && npm run build && cd apiunit
    (docker-compose -f docker-compose-component-testing.yml up --force-recreate --exit-code-from apiunit && docker-compose -f docker-compose-component-testing.yml down) || (docker-compose -f docker-compose-component-testing.yml down && exit 1)
    echo "Up Compelete";
elif [ "$1" == "down" ]; then
    docker-compose -f docker-compose-component-testing.yml down;
    echo "Down Compelete";
else
    echo "Invalid Command";
fi
