import IUrlEntry from '../interfaces/iUrlEntry';

export default class UrlEntry implements IUrlEntry {
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
        id?: string, owner?: string, target?: string,
        enabled?: boolean, createdTimestamp?: string, modifiedTimestamp?: string
    } = {}) {
        this.id = id || UrlEntry.generateRandomBase32String(5);
        this.owner = owner;
        this.target = target;
        this.enabled = enabled;
        this.createdTimestamp = createdTimestamp;
        this.modifiedTimestamp = modifiedTimestamp;

    }

    static fromJson(obj: object): IUrlEntry {
        if (obj === undefined) return undefined;
        return new UrlEntry(obj);
    }

    public static generateRandomBase32String(codeLength: number) {
        let base32 = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
        let code: string = "";
        let nowInMs = (new Date()).getTime();
        for (let i = 0; i < codeLength; i++) {
            code += base32.charAt(Math.floor(Math.floor(Math.random() * nowInMs) % 32));
        }
        return code.toLowerCase();
    }

};
