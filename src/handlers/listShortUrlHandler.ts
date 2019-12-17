import { IEvent, Response, LogLevel, ErrorResponse } from "configurapi";
import { PageResponse } from 'configurapi-handler-json';
import IUrlEntryPage from "../interfaces/iUrlEntryPage";
import IUrlEntryManager from "../interfaces/iUrlEntryManager";
import UrlEntryManager from "../managers/urlEntryManager";
import IUrlEntryFilter from "../interfaces/iUrlEntryFilter";
import UrlEntryFilter from "../entities/urlEntryFilter";
import ListUrlEntryView from "../views/ListUrlEntryView";

export async function listShortUrlHandler(event:IEvent, uManager?:IUrlEntryManager)
{
    this.emit(LogLevel.Trace, JSON.stringify(event))
    if (!event.params['owner']) {
        event.response = new ErrorResponse(`Unable to process request.`, 400);
        return this.complete()
    }
    let filter : IUrlEntryFilter = new UrlEntryFilter({owner: event.params['owner']})

    let um : IUrlEntryManager = uManager || new UrlEntryManager();
    let result : IUrlEntryPage = await um.getByOwner(filter);
    event.response = new PageResponse(ListUrlEntryView.fromUrlEntries(result.items), result.nextPageToken)
};
