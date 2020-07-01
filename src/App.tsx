import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import {ThemeProvider} from '@material-ui/core/styles';
import {Provider} from 'react-redux';

import {Layout} from './components/Layout/Layout';
import theme from './theme';
import {store} from './store';

export type AppContext = {}

const defaults: AppContext = {};

const ThemeContext = React.createContext<AppContext>(defaults);

export default () => <ThemeContext.Provider value={defaults}>
    <Provider store={store}>
        <ThemeProvider theme={theme}>
            <CssBaseline/>

            <Layout/>
        </ThemeProvider>
    </Provider>
</ThemeContext.Provider>