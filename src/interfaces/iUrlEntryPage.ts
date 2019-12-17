import  IUrlEntry  from '../interfaces/iUrlEntry';
export default interface IUrlEntryPage {
    items: IUrlEntry[];
    nextPageToken: string;
}
