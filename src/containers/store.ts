import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import combineReducers from './combineReducers';

export default function configureStore(initialState: any = {}) {
    return createStore(combineReducers, initialState, composeWithDevTools(applyMiddleware(thunk)));
}
