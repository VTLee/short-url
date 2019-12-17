import { IEvent, Response, LogLevel, ErrorResponse } from "configurapi";
import IUrlEntryManager from "../interfaces/iUrlEntryManager";
import UrlEntryManager from "../managers/urlEntryManager";
import UrlEntry from "../entities/urlEntry";
import NotFoundError from "../errors/notFoundError";

export async function getShortUrlHandler(event: IEvent, urlEntryManager?: IUrlEntryManager) {
    let um: IUrlEntryManager = urlEntryManager || new UrlEntryManager();
    let result: UrlEntry;
    try {
        result = await um.getOne(event.params['shorturl']);
    }
    catch (e) {
        event.response = new ErrorResponse(e.message, e instanceof NotFoundError ? 404 : 500);
        return this.complete();
    }
    event.response = new Response(`Redirecting to ${result.target}`, 301, { Location: result.target })
};
