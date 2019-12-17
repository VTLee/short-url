import IUrlEntry from "../interfaces/iUrlEntry";
import IUrlEntryPage from "../interfaces/iUrlEntryPage";

export default class UrlEntryPage implements IUrlEntryPage {
    public items: IUrlEntry[];
    public nextPageToken: string;
    constructor({
        items,
        nextPageToken,
    }: {
        items?: IUrlEntry[], nextPageToken?: string
    } = {}) {
        this.items = items;
        this.nextPageToken = nextPageToken;   
    }
}
