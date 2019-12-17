import { IEvent } from 'configurapi';
import IUrlEntryFilter from '../interfaces/iUrlEntryFilter';

export default class UrlEntryFilter {

    shortUrl?: string;
    owner?: string;

    constructor({
        shortUrl,
        owner
    }: { shortUrl?: string, owner?: string } = {}) {
        this.shortUrl = shortUrl;
        this.owner = owner;
    }

    static create(event: IEvent): IUrlEntryFilter {
        let getParam = (name) => name in event.params && event.params[name] ? event.params[name] : undefined;

        let shortUrl = getParam('shortUrl');
        let owner = getParam('owner');

        return new UrlEntryFilter({shortUrl, owner});
    }
};
