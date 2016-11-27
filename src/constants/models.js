import Immutable from 'immutable';

const atmState = Immutable.fromJS({
    sumMoney: '10',
    userData: {
        cardNum: '',
        password: '',
        isLogin: false,
        userId: '',
        userName: ''
    },
    uiState: {
        userShow: 'block',
        pwdShow: 'hidden',
        withOn: 'block',
        withOff: '0', //'0'表示没有信息显示，'1'表示取款成功，'-1'表示余额不足
        depositOn: 'block',
        depositOff: '0',
        transferOn: 'block',
        transferOff: '0',
        modifyOn: 'block',
        modifyOff: '0'
    }
});

export default atmState;