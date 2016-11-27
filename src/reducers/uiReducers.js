import atmState from '../constants/models';
import { CARD_INPUT, PWD_INPUT, USER_SHOW, PWD_SHOW, WITH_SHOW, WITH_INIT, DEPOSIT_SHOW, DEPOSIT_INIT, TRANSFER_SHOW, TRANSFER_INIT, MODIFY_SHOW, MODIFY_INIT, HOME_INIT } from '../constants/actionTypes';

const uiState = atmState.get('uiState');
const userShoW = (uiState.get('userShow') === "none") ? "block" : "none";
const uiReducers = function(state = uiState, action) {
    switch (action.type) {
        case CARD_INPUT:
            return state.set('pwdShow', "hidden");
        case PWD_INPUT:
            return state.set('pwdShow', "hidden");
        case USER_SHOW:
            return state.set('userShow', userShoW);
        case PWD_SHOW:
            return state.set('pwdShow', "visible");
        case WITH_SHOW:
            return state.set('withOn', 'none').set('withOff', action.payload.withOff);
        case WITH_INIT:
            return state.set('withOn', 'block').set('withOff', '0');
        case DEPOSIT_SHOW:
            return state.set('depositOn', 'none').set('depositOff', action.payload.depositOff);
        case DEPOSIT_INIT:
            return state.set('depositOn', 'block').set('depositOff', '0');
        case TRANSFER_SHOW:
            return state.set('transferOn', 'none').set('transferOff', action.payload.transferOff);
        case TRANSFER_INIT:
            return state.set('transferOn', 'block').set('transferOff', '0');
        case MODIFY_SHOW:
            return state.set('modifyOn', 'none').set('modifyOff', action.payload.modifyOff);
        case MODIFY_INIT:
            return state.set('modifyOn', 'block').set('modifyOff', '0').set('userShow', 'block').set('pwdShow', 'hidden');
        case HOME_INIT:
            return state.set('userShow', 'block');
        default:
            return state;
    }
}

export default uiReducers;