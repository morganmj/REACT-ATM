import { createAction } from 'redux-actions';
import { USER_SHOW, PWD_SHOW, WITH_SHOW, WITH_INIT, DEPOSIT_SHOW, DEPOSIT_INIT, TRANSFER_SHOW, TRANSFER_INIT, MODIFY_SHOW, MODIFY_INIT, HOME_INIT } from '../constants/actionTypes';

export const userShow = createAction(USER_SHOW);
export const pwdShow = createAction(PWD_SHOW);
export const withShow = createAction(WITH_SHOW);
export const withInit = createAction(WITH_INIT);
export const depositShow = createAction(DEPOSIT_SHOW);
export const depositInit = createAction(DEPOSIT_INIT);
export const transferShow = createAction(TRANSFER_SHOW);
export const transferInit = createAction(TRANSFER_INIT);
export const modifyShow = createAction(MODIFY_SHOW);
export const modifyInit = createAction(MODIFY_INIT);
export const homeInit = createAction(HOME_INIT);