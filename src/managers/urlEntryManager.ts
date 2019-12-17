import IUrlEntryRepostiry from "../interfaces/iUrlEntryRepository";
import UrlEntryProviderFactory from "../repository/providers/urlEntryProviderFactory";
import UrlEntryRepository from "../repository/urlEntryRepository";
import IUrlEntryManager from "../interfaces/iUrlEntryManager";
import IUrlEntry from "../interfaces/iUrlEntry";
import IUrlEntryFilter from "../interfaces/iUrlEntryFilter";
import UrlEntryFilter from "../entities/urlEntryFilter";
import NotFoundError from "../errors/notFoundError";
import IUrlEntryPage from "../interfaces/iUrlEntryPage";

export default class UrlEntryManager implements IUrlEntryManager
{
    private repository;

    constructor(repository:IUrlEntryRepostiry = new UrlEntryRepository(UrlEntryProviderFactory.create()))
    {
        this.repository = repository;
    }
    
    async add(urlEntry: IUrlEntry): Promise<void> {
        return await this.repository.add(urlEntry);
    }

    async getOne(id: string): Promise<IUrlEntry> {
        const response = await this.repository.getOne(id);
        if (!response) {
            throw new NotFoundError(`${id} not found`);
        }
        return response;
    }

    async getByOwner(filter: UrlEntryFilter): Promise<IUrlEntryPage> {
        return await this.repository.get(filter);
    }

    async delete(id: string): Promise<void> {
        return await this.repository.delete(id);
    }
}