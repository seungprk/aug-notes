import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

const entryDiv = document.createElement('div');
entryDiv.id = 'app';
document.body.appendChild(entryDiv);

ReactDOM.render(<App />, document.getElementById('app'));

