import { connect } from 'react-redux';
import Transfer from '../components/Transfer';
import { moneyTransfer } from '../actions/atmActions';
import { transferInit } from '../actions/uiActions';

export default connect(
    state => ({
        cardNum: state.getIn(['userData', 'cardNum']),
        transferOn: state.getIn(['uiState', 'transferOn']),
        transferOff: state.getIn(['uiState', 'transferOff']),
    }),
    (dispatch) => ({
        moneyTransfer: (cardNum, toCardNum, transferMoney) => () => (dispatch(moneyTransfer(cardNum, toCardNum, transferMoney))),
        transferInit: () => (dispatch(transferInit()))
    }))(Transfer);