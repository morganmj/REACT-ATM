/*------------------用户登录及修改密码的action定义------------------*/
import { createAction } from 'redux-actions';
import { browserHistory } from 'react-router'
import { CARD_INPUT, PWD_INPUT, CARD_CHECK, LOGIN_CHANGE, USER_SHOW, PWD_SHOW } from '../constants/actionTypes';
import { userShow, pwdShow, transferShow, modifyShow } from './uiActions';
import { moneyInit } from './atmActions';
export const loginChange = createAction(LOGIN_CHANGE);
export const cardNumInput = createAction(CARD_INPUT);
export const passwordInput = createAction(PWD_INPUT);
export const cardCheck = (cardNum = '', password = '') => {
    return (dispatch) => {
        let data = JSON.stringify({
            cardNum: cardNum,
            password: password
        });
        //console.log(data);
        fetch("http://localhost:3001/loginCheck", {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            cache: 'default',
            body: data
        }).then(response => {
            return response.json();
        }).then(data => {
            data.err == '0' ?
                (dispatch(loginChange({ loginState: true })), dispatch(userShow()), browserHistory.push('/welcome'), dispatch(moneyInit({ money: data.money }))) :
                (dispatch(pwdShow()) /*, console.log("错误密码")*/ )
        })
    };
};

export const pwdChange = (cardNum = '', newPwd = '') => {
    return (dispatch) => {
        let data = JSON.stringify({
            cardNum: cardNum,
            newPwd: newPwd
        });
        //console.log(data);
        fetch("http://localhost:3001/pwdChange", {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            cache: 'default',
            body: data
        }).then(responese => {
            return responese.json()
        }).then(data => {
            data.err == '0' ? (dispatch(modifyShow({ modifyOff: '1' }))) : (dispatch(modifyShow({ modifyOff: '-1' })))
        })
    }
}