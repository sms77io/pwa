import React, {SyntheticEvent, useEffect, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import makeStyles from '@material-ui/core/styles/makeStyles';
import ClearIcon from '@material-ui/icons/Clear';
import Grid from '@material-ui/core/Grid';
import SendIcon from '@material-ui/icons/Send';

import {To} from '../To';
import {From} from '../From';
import {LocalStore} from '../../util/LocalStore';
import {sendSms} from '../../util/sendSms';
import {addSnackbar, setBackdrop, setNav, setTo} from '../../store/actions';
import {RootState} from '../../store/reducers';
import {History} from './History';
import {MessageToolbar} from './MessageToolbar';
import {IOptions} from '../Options/types';

export const Send = () => {
    const dispatch = useDispatch();
    const classes = makeStyles(theme => ({
        clear: {
            color: 'red',
        },
        form: {
            '& .MuiTextField-root': {
                margin: theme.spacing(1),
            },
        },
    }))();
    const [text, setText] = useState('');
    const [from, setFrom] = useState('');
    const {t} = useTranslation('send');
    const $textarea = useRef();
    const to = useSelector(({to}: RootState) => to);

    useEffect(() => {
        LocalStore.get('options').then(opts => {
            if ('' === opts.apiKey || !opts.apiKey) {
                dispatch(addSnackbar(t('common:pleaseSetApiKey')));

                dispatch(setNav('options'));
            }

            setDefaults(opts).then(() => {
            }).catch(e => console.error(e));
        }).catch(err => console.error(err));
    }, []);

    const handleClear = async () => {
        setText('');

        await setDefaults(await LocalStore.get('options'));
    };

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();

        dispatch(setBackdrop(true));
        dispatch(addSnackbar(await sendSms({text, to, from})));
        dispatch(setBackdrop(false));
    };

    const setDefaults = async ({signature, from, to}: IOptions) => {
        if (signature) {
            setText(signature);
        }

        setFrom(from);

        setTo(to);
    };

    return <>
        <h1>{t('h1')}</h1>

        <form className={classes.form} onSubmit={handleSubmit}>
            <MessageToolbar onAction={setText} textarea={$textarea.current!}/>

            <TextField
                fullWidth
                label={t('label')}
                helperText={t('helperText')}
                inputRef={$textarea}
                multiline
                onChange={ev => setText(ev.target.value)}
                required
                rows='3'
                value={text}
            />

            <To onChange={to => dispatch(setTo(to))} value={to}/>

            <From onChange={from => setFrom(from)} value={from}/>

            <Grid container>
                <Grid item xs={3}>
                    <Button className={classes.clear} endIcon={<ClearIcon/>} fullWidth
                            onClick={handleClear} variant='outlined'>
                        {t('clear')}
                    </Button>
                </Grid>

                <Grid item xs={1}/>

                <Grid item xs={8}>
                    <Button color='primary' disabled={!text.length} endIcon={<SendIcon/>} fullWidth
                            type='submit'
                            variant='outlined'>
                        {t('send')}
                    </Button>
                </Grid>
            </Grid>
        </form>

        <History/>
    </>;
};