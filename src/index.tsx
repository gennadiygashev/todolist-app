import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'  
import createSagaMiddleware from 'redux-saga'
import rootReducer from './store'
import * as serviceWorker from './serviceWorker'
import './index.scss'
import { rootSaga } from './store'

const sagaMiddleware = createSagaMiddleware()
const store = createStore(rootReducer, applyMiddleware(thunk, logger, sagaMiddleware))
sagaMiddleware.run(rootSaga)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)

serviceWorker.unregister()
