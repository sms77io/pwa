import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';
import {Backdrop, createStyles, Theme} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

import {TopNav} from './TopNav';
import {Snackbars} from './Snackbars';
import {BottomNav} from './BottomNav';
import {RootState} from '../../store/reducers';
import {Options} from '../Options/Options';
import {Send} from '../Send/Send';
import {Contacts} from '../Contacts';
import {Pricings} from '../Pricing/Pricings';
import {Lookup} from '../Lookup/Lookup';
import {setBackdrop} from '../../store/actions';

const cls = (theme: Theme) => createStyles({
    backdrop: {
        color: '#fff',
        zIndex: theme.zIndex.drawer + 1,
    },
});

export const Layout = () => {
    const dispatch = useDispatch();
    const [main, setMain] = useState(<></>);
    const {backdrop, nav} = useSelector(({backdrop, nav}: RootState) => ({backdrop, nav}));
    const classes = makeStyles(cls)();

    useEffect(() => {
        setMain(
            'send' === nav
                ? <Send/>
                : 'options' === nav
                ? <Options/>
                : 'contacts' === nav
                    ? <Contacts/>
                    : 'pricing' === nav
                        ? <Pricings/>
                        : <Lookup/>
        );
    }, [nav]);

    return <>
        <TopNav/>

        <Backdrop className={classes.backdrop} open={backdrop}
                  onClick={() => dispatch(setBackdrop(false))}>
            <CircularProgress/>
        </Backdrop>

        <Snackbars/>

        <Container component='main'>
            {main}
        </Container>

        <BottomNav/>
    </>;
};