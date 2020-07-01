import React from 'react';
import {useTranslation} from 'react-i18next';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import FacebookIcon from '@material-ui/icons/Facebook';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import TwitterIcon from '@material-ui/icons/Twitter';
import RssFeedIcon from '@material-ui/icons/RssFeed';
import GitHubIcon from '@material-ui/icons/GitHub';
import Button from '@material-ui/core/Button';
import HelpIcon from '@material-ui/icons/HelpOutline';

import logo from '../../assets/img/white-3240x640.png';

export const TopNav = () => {
    const {t} = useTranslation();

    const classes = makeStyles({
        toolbar: {
            justifyContent: 'space-between',
        },
        link: {
            color: '#fff',
        },
        logo: {
            maxWidth: '128px',
        }
    })();

    return <AppBar variant='outlined' position='static'>
        <Toolbar variant='dense' className={classes.toolbar}>
            <a href='#!' onClick={() => window.location.assign('https://www.sms77.io/')}>
                <img src={logo} alt='' className={classes.logo}/>
            </a>

            <ButtonGroup color='primary' aria-label={t('socialsBtnGroup')}>
                <Button className={classes.link} size='small'
                        onClick={() => window.location.assign('https://www.facebook.com/sms77.io/')}>
                    <FacebookIcon/>
                </Button>

                <Button className={classes.link}
                        onClick={() => window.location.assign('https://www.linkedin.com/company/sms77/')}>
                    <LinkedInIcon/>
                </Button>

                <Button className={classes.link}
                        onClick={() => window.location.assign('https://twitter.com/sms77io')}>
                    <TwitterIcon/>
                </Button>

                <Button className={classes.link}
                        onClick={() => window.location.assign('https://www.sms77.io/de/feed/')}>
                    <RssFeedIcon/>
                </Button>

                <Button className={classes.link}
                        onClick={() => window.location.assign('https://github.com/sms77io')}>
                    <GitHubIcon/>
                </Button>

                <Button className={classes.link}
                        onClick={() => window.location.assign('https://www.sms77.io/en/company/contact/')}>
                    <HelpIcon/>
                </Button>
            </ButtonGroup>
        </Toolbar>
    </AppBar>;
};