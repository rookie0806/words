import React from 'react';
import ReactDOM from 'react-dom';
import Helmet from 'react-helmet';
import {Provider} from "react-redux";
import store, {history} from "./redux/configureStore";
import {ConnectedRouter} from "connected-react-router";

import './index.css';
import App from 'components/App';

ReactDOM.render(
    
    <Provider store={store}>
        <Helmet>
                <title>학생관리시스템</title>
                <meta name="description" content="학생관리시스템" data-react-helmet="true"/>
            </Helmet>
        <ConnectedRouter history={history}>
        <App />
       
        </ConnectedRouter>
    </Provider>, 
    document.getElementById('root')
);
