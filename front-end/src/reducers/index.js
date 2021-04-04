import {combineReducers} from 'redux'
import alert from './alert'
import auth from './auth'
import profile from './profile'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import hardSet from 'redux-persist/lib/stateReconciler/hardSet'

const persistConfig = {
    key:'root',
    storage,
    whitelist:['auth','profile'], //list of states you want to persist
}
const rootReducer = combineReducers({
    alert, auth, profile
})
const persistedReducer = persistReducer(persistConfig, rootReducer)

export default persistedReducer