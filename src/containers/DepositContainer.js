/*------------------action类型定义------------------*/
import { connect } from 'react-redux';
import Deposit from '../components/Deposit';
import { moneyIn } from '../actions/atmActions';
import { depositInit } from '../actions/uiActions';

export default connect(
    state => ({
        cardNum: state.getIn(['userData', 'cardNum']),
        depositOn: state.getIn(['uiState', 'depositOn']),
        depositOff: state.getIn(['uiState', 'depositOff']),
    }),
    (dispatch) => ({
        moneyIn: (cardNum, depositMoney) => () => (dispatch(moneyIn(cardNum, depositMoney))),
        depositInit: () => (dispatch(depositInit()))
    }))(Deposit);