import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
//import registerServiceWorker from './registerServiceWorker';
import { unregister } from './registerServiceWorker';
import './styles/bootstrap.css';

ReactDOM.render(<App />, document.getElementById('root'));
//registerServiceWorker();
unregister();
