import {LookupResponse} from '../components/Lookup/types';
import {IOptions} from '../components/Options/types';
import {SmsDump} from './sendSms';
import {Contact} from 'sms77-client';
import localForage from 'localforage';

import i18n from '../i18n';

const pkg = require('../../package.json');

const defaults: ILocalStore = {
    contacts: [],
    history: [],
    lookups: [],
    options: {
        apiKey: '',
        from: 'sms77io',
        signature: '',
        signaturePosition: 'append',
        to: '',
    },
};

localForage.config({
    driver: localForage.INDEXEDDB,
    name: pkg.sms77.name,
    version: 1.0,
    storeName: pkg.sms77.name, // must be alphanumeric (+ underscores)
});

localForage.length().then(async length => {
    if (0 === length) {
        console.log(i18n.t('common:initOptions'));

        for (const key of Object.keys(defaults) as (keyof ILocalStore)[]) {
            await localForage.setItem(key, defaults[key]);
        }
    }
}).catch(e => console.error(e));

export type ILocalStore = {
    contacts: Contact[],
    history: SmsDump[],
    lookups: LookupResponse[],
    options: IOptions,
}

export class LocalStore {
    static async get<T = any>(key: string): Promise<T> {
        return (await localForage.getItem<T>(key));
    }

    static async getDeep<T = any>(key: string): Promise<T> {
        const props = LocalStore.splitKeys(key);

        let data: any = await localForage.getItem<T>(props.length ? props.shift()! : key);

        for (const prop of props) {
            data = data[prop];
        }

        return data;
    }

    static async set<T>(key: string, value: T): Promise<T> {
        return (await localForage.setItem(key, value));
    }

    static async setDeep<T>(key: string, value: T): Promise<T> {
        const props = LocalStore.splitKeys(key);

        if (props.length) {
            let data: any = LocalStore.get(props.shift()!);

            for (const prop of props) {
                data = data[prop];
            }
        }

        return (await localForage.setItem(key, value));
    }

    static async option<T>(key: keyof IOptions): Promise<T> {
        return (await LocalStore.get('options'))[key] as unknown as T;
    }

    static async append<T>(key: string, value: any): Promise<T> {
        let values: any = await LocalStore.get<T>(key);

        if (!Array.isArray(values)) {
            values = [value];
        }

        values.push(value);

        return await localForage.setItem(key, values);
    }

    private static splitKeys(key: string): string[] {
        return key.split('.');
    }
}