/*------------------atm具体操作的action定义------------------*/
import { createAction } from 'redux-actions';
import { MONEY_INIT, MONEY_OUT } from '../constants/actionTypes';
import { withShow, depositShow, transferShow } from './uiActions';
export const moneyInit = createAction(MONEY_INIT);
export const moneyOut = (cardNum, withdrawalsMoney) => {
    return (dispatch) => {
        let data = JSON.stringify({ cardNum: cardNum, withdrawalsMoney: withdrawalsMoney });
        fetch("http://localhost:3001/withdrawals", {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            cache: 'default',
            body: data
        }).then(response => {
            return response.json();
        }).then(
            data => {
                data.err == "0" ? ( /*console.log('取款成功'), */ dispatch(withShow({ withOff: '1' })), dispatch(moneyInit({ money: data.money }))) : ( /*console.log('余额不足'), */ dispatch(withShow({ withOff: '-1' })))
            });
    }
};

export const moneyIn = (cardNum, depositMoney) => {
    return (dispatch) => {
        let data = JSON.stringify({ cardNum: cardNum, depositMoney: depositMoney });
        fetch("http://localhost:3001/deposit", {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            cache: 'default',
            body: data
        }).then(response => {
            return response.json();
        }).then(
            data => {
                data.err == "0" ? ( /*console.log('取款成功'), */ dispatch(depositShow({ depositOff: '1' })), dispatch(moneyInit({ money: data.money }))) : ( /*console.log('余额不足'),*/ dispatch(depositShow({ depositOff: '-1' })))
            });
    }
};

export const moneyTransfer = (cardNum, toCardNum, transferMoney) => {
    return (dispatch) => {
        let data = JSON.stringify({ cardNum: cardNum, toCardNum: toCardNum, transferMoney: transferMoney });
        fetch("http://localhost:3001/transfer", {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            cache: 'default',
            body: data
        }).then(response => {
            return response.json();
        }).then(
            data => {
                if (data.err == "0") {
                    dispatch(transferShow({ transferOff: '1' }), dispatch(moneyInit({ money: data.money })))
                };
                if (data.err == "-1") {
                    dispatch(transferShow({ transferOff: '-1' }))
                };
                if (data.err == "-4") {
                    dispatch(transferShow({ transferOff: '-4' }))
                };
            });
    }
};