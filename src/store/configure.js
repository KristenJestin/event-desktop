import { createStore } from 'redux'
import { persistCombineReducers, persistStore } from 'redux-persist'
import storage from 'redux-persist/es/storage'

import addEvent from './reducers/eventReducer'

const persistConfig = {
	key: 'root',
	storage: storage
}

const store = createStore(persistCombineReducers(persistConfig, { addEvent }))

export default store
export const persistor = persistStore(store)
