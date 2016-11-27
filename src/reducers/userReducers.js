import atmState from '../constants/models';
import { CARD_INPUT, PWD_INPUT, CARD_LOGIN, LOGIN_CHANGE, MONEY_INIT, MODIFY_INIT, HOME_INIT } from '../constants/actionTypes';

const userData = atmState.get('userData');

const userReducers = function(state = userData, action) {
    switch (action.type) {
        case CARD_INPUT:
            return state.set('cardNum', action.payload.cardNum);
        case PWD_INPUT:
            return state.set('password', action.payload.password);
        case LOGIN_CHANGE:
            return state.set('isLogin', action.payload.loginState);
        case MODIFY_INIT:
            return state.set('password', '');
        case HOME_INIT:
            return state.set('cardNum', '').set('password', '');
        default:
            return state;
    }
}

export default userReducers;