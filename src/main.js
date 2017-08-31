
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, hashHistory } from 'react-router';
import './styles/common.scss';
import routes from './routes';


ReactDOM.render(<Router routes={routes} history={hashHistory} />, document.getElementById('app'));