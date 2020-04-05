import { handleActions } from 'redux-actions';

import { StoreI } from 'types/storeTypes';

const STORE_INTIAL_STATE: StoreI = {};

const storeReducer = handleActions({}, STORE_INTIAL_STATE);

export default storeReducer;
