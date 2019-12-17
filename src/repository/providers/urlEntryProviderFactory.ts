import IUrlEntryProvider from "../../interfaces/iUrlEntryProvider";
import Config from "../../config";
import UrlEntryNodenamoProvider from "./namoUrlProvider";
import {Credentials} from 'aws-sdk';

export default class UrlEntryProviderFactory
{
    static create(provider:string = Config.DATA_PROVIDER): IUrlEntryProvider
    {
        if(provider === Config.DATA_PROVIDER_AWS)
        {
            return new UrlEntryNodenamoProvider();
        }
        else if (provider === Config.DATA_PROVIDER_LOCAL_DYNAMODB) {
            return new UrlEntryNodenamoProvider({
                endpoint: Config.LOCAL_DYNAMODB_ENDPOINT,
                region: Config.AWS_DEFAULT_REGION,
                credentials: new Credentials(Config.LOCAL_DYNAMO_DB_ACCESS_KEY, Config.LOCAL_DYNAMO_DB_SECRET_KEY)
            });
        }

        else
        {
            throw new Error(`Unsupported data provider: '${provider}'`);
        }
    }
};
