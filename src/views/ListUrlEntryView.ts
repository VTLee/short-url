import IUrlEntry from "../interfaces/iUrlEntry";

export default class ListUrlEntryView {

    id: string;
    owner: string;
    target: string;
    enabled: boolean;
    createdTimestamp: string;
    modifiedTimestamp: string;

    constructor({
        id,
        owner,
        target,
        enabled,
        createdTimestamp,
        modifiedTimestamp
    }: {
        id?: string, owner?: string,
        target?: string, enabled?: boolean,
        createdTimestamp?: string,
        modifiedTimestamp?: string
    } = {}) {
        this.id = id;
        this.owner = owner;
        this.target = target;
        this.enabled = enabled;
        this.createdTimestamp = createdTimestamp;
        this.modifiedTimestamp = modifiedTimestamp;
    }

    static fromUrlEntries(entries: IUrlEntry[]) {
        return entries.map((i) => new ListUrlEntryView(i))
    }
}
