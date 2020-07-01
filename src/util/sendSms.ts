import Sms77Client, {SmsJsonResponse, SmsParams} from 'sms77-client';
import i18n from '../i18n';

import {notify} from './notify';
import {LocalStore} from './LocalStore';

const pkg = require('../../package.json');

export type SendSmsProps = {
    from: string
    text: string
    to: string
}

export type SmsDump = {
    errors: string[]
    notification: string
    opts: SmsParams
    res: SmsJsonResponse
};

const getOpts = (text: string, to: string, from?: string): SmsParams => {
    const opts: any = {
        json: 1,
        text,
        to,
    };

    if ('string' === typeof from && from.length) {
        opts.from = from;
    }

    return opts;
};

export const sendSms = async ({text, to, from}: SendSmsProps): Promise<string> => {
    let res = null;
    const errors = [];

    const {apiKey, ...restOpts} = await LocalStore.get('options');

    if ('' === apiKey) {
        errors.push(i18n.t('common:apiKeyNotSet'));
    } else {
        to = to.length ? to : restOpts.to;

        from = from.length ? from : restOpts.from;
    }

    const opts = getOpts(text, to, from);

    if (errors.length) {
        errors.unshift(i18n.t('error.pre'));

        const notification = errors.join('\n');

        await notify(notification);

        return notification;
    }

    const lines = [];

    res = await (new Sms77Client(apiKey as string, pkg.sms77.sentWith)).sms(opts);

    const {balance, messages, sms_type, success, total_price} = res as SmsJsonResponse;

    if (100 === Number.parseInt(success)) {
        lines.push(i18n.t('success.msg.success.text', {
            balance,
            messageCount: messages.length,
            smsType: sms_type,
            totalPrice: total_price,
        }));

        for (const sms of messages) {
            let line = '';

            if (sms.success) {
                line += i18n.t('success.msg.success.line_1', {id: sms.id, parts: sms.parts});
                line += i18n.t('success.msg.success.line_2', {
                    price: sms.price,
                    recipient: sms.recipient,
                    sender: sms.sender,
                    text: sms.text,
                });
            } else {
                line += i18n.t('success.msg.error.line_1', {
                    id: sms.id,
                    recipient: sms.recipient
                });
                line += i18n.t('success.msg.error.line_2', {
                    sender: sms.sender,
                    encoding: sms.encoding
                });
            }

            sms.messages && sms.messages.forEach((msg: string) => line += ` / ${msg}`);

            lines.push(line);
        }
    } else {
        lines.push(i18n.t('error', {to, error: JSON.stringify(res)}));
    }

    const notification = lines.join('\n');

    const dump: SmsDump = {res: res as SmsJsonResponse, notification, errors, opts};

    await LocalStore.append('history', dump);

    await notify(notification);

    return notification;
};