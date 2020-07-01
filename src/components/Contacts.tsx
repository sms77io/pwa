import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useDispatch} from 'react-redux';
import Sms77Client, {Contact as Sms77Contact} from 'sms77-client';
import Button from '@material-ui/core/Button';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import List from '@material-ui/core/List';

import {notify} from '../util/notify';
import {LocalStore} from '../util/LocalStore';
import {setBackdrop, setNav, setTo} from '../store/actions';

const pkg = require('../../package.json');

export const Contacts = () => {
    const {t} = useTranslation('contacts');
    const dispatch = useDispatch();
    const [apiKey, setApiKey] = useState<string>('');
    const [contacts, setContacts] = useState<Sms77Contact[]>([]);

    useEffect(() => {
        LocalStore.option<string>('apiKey').then(apiKey => {
            setApiKey(apiKey);

            if ((apiKey || '').length) {
                LocalStore.get('contacts').then(contacts => {
                    if (Array.isArray(contacts)) {
                        setContacts(contacts);

                        if (!contacts.length) {
                            syncContacts()
                                .then()
                                .catch(e => notify(e.toString ? e.toString() : JSON.stringify(e)));
                        }
                    }
                }).catch(e => console.error(e));
            }
        }).catch(err => console.error(err));
    }, []);

    const syncContacts = async () => {
        dispatch(setBackdrop(true));

        const contacts = await (new Sms77Client(apiKey as string, pkg.sms77.sentWith))
            .contacts({action: 'read', json: true,}) as Sms77Contact[];

        dispatch(setBackdrop(false));

        await LocalStore.set('contacts', contacts);

        setContacts(contacts);
    };

    return <>
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <h1 style={{display: 'inline-flex'}}>{t('contacts')}</h1>

            <Button onClick={syncContacts} disabled={0 === apiKey.length}>
                {t('reload')}
            </Button>
        </div>

        {
            contacts.length
                ? <List>
                    {contacts.map((c, i) => {
                        const number = (c.number || c.Number)!;
                        const email = c.email || '';

                        return <ListItem button key={i}>
                            <ListItemText
                                primary={`${(c.nick || c.Name)} ● ${(number)}${email.length ? ` ● ${email}` : ''}`}/>

                            <ListItemSecondaryAction>
                                <Button disabled={0 === number.length} fullWidth onClick={() => {
                                    dispatch(setTo(number));

                                    dispatch(setNav('send'));
                                }} size='small' variant='outlined'>{t('send')}</Button>
                            </ListItemSecondaryAction>
                        </ListItem>;
                    })}
                </List>
                : <p>{t('noEntries')}</p>
        }
    </>;
};