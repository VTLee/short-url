import * as fs from 'fs';
import Config from '../config';
import * as stripComments from 'strip-json-comments';
import { DynamoDB } from 'aws-sdk';
import { ServiceConfigurationOptions } from 'aws-sdk/lib/service';
import { NodeNamo } from 'nodenamo';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import NodenamoUrlEntry from '../repository/providers/decorators/namoUrlEntry';
import UrlEntryProviderFactory from '../repository/providers/urlEntryProviderFactory';
import UrlEntry from '../entities/urlEntry';


let directory = process.argv[2] || 'default';

function readFile(filePath: string): any {
    return JSON.parse(stripComments(fs.readFileSync(filePath).toString()));
}

function getDynamoDb(): DynamoDB {
    let serviceConfigOptions: ServiceConfigurationOptions = {
        region: Config.AWS_DEFAULT_REGION,
        endpoint: Config.LOCAL_DYNAMODB_ENDPOINT
    };

    return new DynamoDB(serviceConfigOptions);
}

export async function main() {
    let provider = Config.DATA_PROVIDER_LOCAL_DYNAMODB;

    console.log(`Using ${provider} provider...`);
    console.log(`Populating data using data from 'scripts/${directory}/'`);

    if (!Config.LOCAL_DYNAMODB_ENDPOINT) {
        console.error('Local dynamo endpoint is not set.');
        process.exit(1);
    }

    let nodenamo = new NodeNamo(new DocumentClient({
        endpoint: Config.LOCAL_DYNAMODB_ENDPOINT,
        region: Config.AWS_DEFAULT_REGION,
        accessKeyId: 'a_non_empty_value',
        secretAccessKey: 'a_non_empty_value'
    }))
    // await nodenamo.deleteTable().for(NodenamoMessage).execute()
    //     .catch((e) => console.log("Error deleting table before recreation. Probably not a big deal."));
    console.log(`Creating table using NodeNamo`)
    await nodenamo.createTable().for(NodenamoUrlEntry).execute();
    console.log(`Table create should be done`)


    /**
     * Populate Content
     */
    console.log(`Reading data to populate`)

    let shorturls = readFile(`scripts/${directory}/shorturl.json`);

    let urlProvider = UrlEntryProviderFactory.create();
    console.log(`Populating database from ${shorturls.length} records`)
    for (let shorturl of shorturls) {
        if (!shorturl.createdTimestamp) shorturl.createdTimestamp = new Date().toISOString();
        if (!shorturl.modifiedTimestamp) shorturl.modifiedTimestamp = new Date().toISOString();
        await urlProvider.add(UrlEntry.fromJson(shorturl));
        process.stdout.write('.');
    }
}
main().catch((e) => { console.log(e); process.exit(1) });
