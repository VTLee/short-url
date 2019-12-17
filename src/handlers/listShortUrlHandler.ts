import { IEvent, Response, LogLevel } from "configurapi";

export async function listShortUrlHandler(event:IEvent)
{
    this.emit(LogLevel.Trace, JSON.stringify(event))
    // let target : string = event.request.path.substr(1);
    // console.log(`Lookup for ID ${target}`)
    // let um : IUrlEntryManager = new UrlEntryManager();
    // let result = await um.getOne(target);
    // console.log(`Result: ${JSON.stringify(result)}`)
    // event.request.headers['OVERRIDE_RESPONSE'] = new Response(undefined, 301, { Location: result.target });
    // this.emit(LogLevel.Trace, "Done with checkForGetHandler")

    event.response = new Response(`Response: ${JSON.stringify(event)}`, 200)
};
