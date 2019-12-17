import IUrlEntry from './iUrlEntry'
import IUrlEntryPage from './iUrlEntryPage';
import UrlEntryFilter from '../entities/urlEntryFilter';

interface IUrlEntryManager {
    add(urlEntry: IUrlEntry): Promise<void>;
    getOne(id: string): Promise<IUrlEntry>;
    getByOwner(filter: UrlEntryFilter): Promise<IUrlEntryPage>;
    delete(shortUrl: string): Promise<void>;
};

export default IUrlEntryManager;
