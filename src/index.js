import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {Provider} from 'react-redux';
import mainReducer from './redux/reducers';
import './index.css';
import Content from './components/Template.react';
import registerServiceWorker from './registerServiceWorker';
import applyFilters from './redux/middlewares/applyFilters';

var store = createStore(mainReducer, applyMiddleware(thunkMiddleware, applyFilters));

ReactDOM.render(
    <Provider store={store}>
    <Content/>
</Provider>, document.getElementById('root'));
registerServiceWorker();