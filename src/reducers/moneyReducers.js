import atmState from '../constants/models';
import { MONEY_INIT } from '../constants/actionTypes';
const sumMoney = atmState.get('sumMoney');

const moneyReducers = function(state = sumMoney, action) {
    switch (action.type) {
        case MONEY_INIT:
            return action.payload.money;
        default:
            return state;
    }
};
export default moneyReducers;