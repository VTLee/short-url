import { IEvent, Response, ErrorResponse } from "configurapi";
import IUrlEntryManager from "../interfaces/iUrlEntryManager";
import UrlEntryManager from "../managers/urlEntryManager";
import IUrlEntry from "../interfaces/iUrlEntry";
import UrlEntry from "../entities/urlEntry";

export async function addEntryHandler(event: IEvent, urlEntryManager?: IUrlEntryManager) {
    let urlEntry : IUrlEntry = new UrlEntry(event.payload['target']);
    let um : IUrlEntryManager = new UrlEntryManager();
    if (!urlEntry.target) {
        event.response = new ErrorResponse(`No target given`, 400);
        return;
    }
    urlEntry.owner = 'me'
    await um.add(urlEntry);
    event.response = new Response(`Response: ${JSON.stringify(event)}`, 200)
};
