import { connect } from 'react-redux';
import Withdrawals from '../components/Withdrawals';
import { moneyOut } from '../actions/atmActions';
import { withInit } from '../actions/uiActions';

export default connect(
    state => ({
        cardNum: state.getIn(['userData', 'cardNum']),
        withOn: state.getIn(['uiState', 'withOn']),
        withOff: state.getIn(['uiState', 'withOff']),
    }),
    (dispatch) => ({
        moneyOut: (cardNum, withdrawalsMoney) => () => (dispatch(moneyOut(cardNum, withdrawalsMoney))),
        withInit: () => (dispatch(withInit()))
    }))(Withdrawals);