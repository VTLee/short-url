import { IEvent, LogLevel } from "configurapi";

export async function checkForGetHandler(event: IEvent) {

    if (event.name.startsWith('list_') && event.request.path.lastIndexOf('/') === 0) {
        this.emit(LogLevel.Trace, "Jumping to get route")
        event.name = "get_v1_shorturl"
        delete event.params;
        event.params = {'shorturl': event.request.path.substr(1)}
        return this.continue()
    }

    return this.continue();
};
