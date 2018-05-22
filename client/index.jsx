import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import App from './components/App';

const entryDiv = document.createElement('div');
entryDiv.id = 'app';
document.body.appendChild(entryDiv);

Modal.setAppElement(document.getElementById('app'));
ReactDOM.render(<App />, document.getElementById('app'));

