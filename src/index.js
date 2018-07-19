import React from 'react'
import {render} from 'react-dom'
import {Provider} from "react-redux";
import AppContainer from "./components/App/App";
import {createStore,applyMiddleware} from 'redux';
import rootReducer from "./reducers";
import { composeWithDevTools } from "redux-devtools-extension";

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware()))

render(
        <Provider store={store}>
            <AppContainer/>
        </Provider>,
    document.getElementById('root')
)



