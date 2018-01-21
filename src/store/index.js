import { applyMiddleware, createStore, compose } from 'redux'
import { persistStore, persistCombineReducers } from 'redux-persist'
import localforage from 'localforage' // default: localStorage if web, AsyncStorage if react-native
import thunk from 'redux-thunk'
import reducers from '../reducers'

const config = {
  key: 'root',
  storage: localforage,
  whitelist: ['carrito', 'auth']
}

const reducer = persistCombineReducers(config, reducers)
function configureStore() {
  let store = createStore(reducer, {}, applyMiddleware(compose(thunk)))
  let persistor = persistStore(store)

  return { persistor, store }
}

export const { persistor, store } = configureStore()
