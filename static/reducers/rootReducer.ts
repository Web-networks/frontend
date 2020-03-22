import { combineReducers } from 'redux';

import formDataReducer from './formDataReducer';
import storeReducer from './storeReducer';

const rootReducer = combineReducers({
    formData: formDataReducer,
    store: storeReducer,
});

export default rootReducer;
