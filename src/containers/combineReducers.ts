import { reducer as toastrReducer } from 'react-redux-toastr';
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import linkReducer from '../actions/reducers/linkReducer';

export default combineReducers({
    form: formReducer,
    link: linkReducer,
    toastr: toastrReducer,
});
