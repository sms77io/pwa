import React, {useEffect, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useDispatch} from 'react-redux';
import {makeStyles} from '@material-ui/core/styles';

import {LocalStore} from '../../util/LocalStore';
import {setTo} from '../../store/actions';
import {ApiKey} from './ApiKey';
import {From} from '../From';
import {To} from '../To';
import {Signature} from './Signature';
import {IOptions} from './types';

export const Options = () => {
    const $apiKey = useRef();
    const dispatch = useDispatch();
    const {t} = useTranslation();
    const classes = makeStyles(theme => ({
        root: {
            '& .MuiTextField-root, .MuiFormControl-root': {
                marginBottom: theme.spacing(3),
            },
        },
    }))();
    const [state, setState] = useState<IOptions>();

    useEffect(() => {
        LocalStore.get('options').then(opts => {
            console.log({opts});

            setState(opts);

            !opts!.apiKey.length && ($apiKey.current! as HTMLInputElement).focus();
        }).catch(err => console.error(err));
    }, []);

    const handleChange = async ({target: {name, value}}: any) => {
        setState({...state!, [name]: value});

        const opts = await LocalStore.get('options');
        opts[name as keyof IOptions] = value;

        await LocalStore.set('options', opts);
    };

    return <>
        <h1>Options</h1>

        <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <p>
                {t('common:optionsSavedAutomatically')}
            </p>

            <p>
                {t('common:markedFieldsRequired')}
            </p>
        </div>

        {state && <form className={classes.root}>
            <ApiKey inputRef={$apiKey} onChange={handleChange} value={state!.apiKey}/>

            <From onChange={from => handleChange({target: {name: 'from', value: from}})}
                  value={state!.from}/>

            <To onChange={async to => {
                await handleChange({target: {name: 'to', value: to}});

                dispatch(setTo(to));
            }} value={state!.to}/>

            <Signature onChange={handleChange} signature={state!.signature}/>
        </form>}
    </>;
};