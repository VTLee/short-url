import { IEvent, Response, ErrorResponse, LogLevel } from "configurapi";
import IUrlEntryManager from "../interfaces/iUrlEntryManager";
import UrlEntryManager from "../managers/urlEntryManager";

export async function checkForGetHandler(event: IEvent) {
    //this.emit(LogLevel.Trace, JSON.stringify(event));

    if (event.name.startsWith('list_') && event.request.path.lastIndexOf('/') === 0) {
        this.emit(LogLevel.Trace, "Jumping to get route")
        event.name = "get_v1_shorturl"
        delete event.params;
        event.params = {'shorturl': event.request.path.substr(1)}
        return this.continue()
    }

    return this.continue();
};

/*
{
    "id": "1ab568e6-362b-4404-a6de-0ce8e626271e",
    "correlationId": "b8aa7d7b-1544-4ad5-8c40-88876c4c9a89",
    "versionRegExp": {},
    "params": {
        "test": ""
    },
    "name": "list_test",
    "request": {
        "method": "get",
        "headers": {
            "host": "simple-api.myntan.com",
            "user-agent": "curl/7.58.0",
            "x-amzn-trace-id": "Root=1-5dacad82-12a6573bf43c9074d3d1aab6",
            "x-forwarded-for": "71.63.60.109",
            "x-forwarded-port": "443",
            "x-forwarded-proto": "https"
        },
        "params": {},
        "payload": "",
        "query": {},
        "path": "/test",
        "pathAndQuery": "/test"
    },
    "response": {
        "statusCode": 200,
        "body": "",
        "headers": {}
    },
    "payload": "",
    "method": "list"
}
*/