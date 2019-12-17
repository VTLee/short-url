import Config from '../../config';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { NodeNamo } from 'nodenamo';
import IUrlEntryProvider from '../../interfaces/iUrlEntryProvider';
import IUrlEntry from '../../interfaces/iUrlEntry';
import UrlEntry from '../../entities/urlEntry';
import IUrlEntryFilter from '../../interfaces/iUrlEntryFilter';
import NodenamoUrlEntry from './decorators/namoUrlEntry';
import IUrlEntryPage from '../../interfaces/iUrlEntryPage';
import UrlEntryPage from '../../entities/urlEntryPage';

export default class UrlEntryNodenamoProvider implements IUrlEntryProvider {
    private client: NodeNamo;
    private baseConfig;
    constructor(config: object = {}) {
        this.baseConfig = Object.assign(config, {
            httpOptions: {
                timeout: Config.DYNAMODB_SOCKET_TIMEOUT_IN_MS,
                connectTimeout: Config.DYNAMODB_CONNECT_TIMEOUT_IN_MS
            },
            maxRetries: Config.DYNAMODB_MAX_RETRIES,
            region: Config.AWS_DEFAULT_REGION
        });
        this.client = new NodeNamo(new DocumentClient(this.baseConfig));
    }


    async add(entry: IUrlEntry): Promise<void> {
        await this.client.insert(new NodenamoUrlEntry(entry)).into(NodenamoUrlEntry).execute();
    }

    async getOne(id?: string): Promise<IUrlEntry> {
        let result: NodenamoUrlEntry = await this.client.get(id).from(NodenamoUrlEntry).execute<NodenamoUrlEntry>();
        return UrlEntry.fromJson(result);
    }

    async get(filter?: IUrlEntryFilter): Promise<IUrlEntryPage> {
        let results = await this.client.list()
                .from(NodenamoUrlEntry)
                .by(filter[Object.keys(filter).find(k => filter[k] != undefined)])
                .execute<NodenamoUrlEntry>()
        return new UrlEntryPage({
            items: results.items.map(e => UrlEntry.fromJson(e)),
            nextPageToken: results.lastEvaluatedKey ? encodeURIComponent(results.lastEvaluatedKey) : undefined
        });
    }

    async update(entry: IUrlEntry): Promise<void> {
        await this.client.update(new NodenamoUrlEntry(entry)).from(NodenamoUrlEntry).execute();
    }

    async delete(id: string): Promise<void> {
        await this.client.delete(id).from(NodenamoUrlEntry).execute();
    }
}
