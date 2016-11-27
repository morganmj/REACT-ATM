import { combineReducers } from 'redux-immutable';
import userData from './userReducers';
import sumMoney from './moneyReducers';
import uiState from './uiReducers';
const rootReducer = combineReducers({ userData, sumMoney, uiState });

export default rootReducer;