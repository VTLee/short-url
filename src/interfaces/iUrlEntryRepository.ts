import IUrlEntry from "./iUrlEntry";
import IUrlEntryFilter from "./iUrlEntryFilter";
import IUrlEntryPage from "./iUrlEntryPage";

export default interface IUrlEntryRepostiry {
    add(entry: IUrlEntry): Promise<void>;
    getOne(id: string): Promise<IUrlEntry>;
    get(filter?: IUrlEntryFilter): Promise<IUrlEntryPage>;
    //update(entry: IUrlEntry): Promise<void>;
    delete(id: string): Promise<void>;
}