import IUrlEntry from "../interfaces/iUrlEntry";
import IUrlEntryRepostiry from "../interfaces/iUrlEntryRepository";
import UrlEntry from "../entities/urlEntry";
import IUrlEntryProvider from "../interfaces/iUrlEntryProvider";
import UrlEntryProviderFactory from "./providers/urlEntryProviderFactory";
import IUrlEntryFilter from "../interfaces/iUrlEntryFilter";
import IUrlEntryPage from "../interfaces/iUrlEntryPage";

export default class UrlEntryRepository implements IUrlEntryRepostiry {
    provider:IUrlEntryProvider;

    constructor(provider: IUrlEntryProvider = UrlEntryProviderFactory.create()) {
        this.provider = provider;
    }

    async add(entry: IUrlEntry): Promise<void> {
        return await this.provider.add(entry);
    }

    async get(filter: IUrlEntryFilter): Promise<IUrlEntryPage> {
        return await this.provider.get(filter);
    }

    async getOne(id: string): Promise<IUrlEntry> {
        return await this.provider.getOne(id);
    }

    // async update(updatedEntry: IUrlEntry): Promise<void> {
    //     return;
    // }
    
    async delete(shortUrl: string): Promise<void> {
        return await this.provider.delete(shortUrl);
    }

}
