import { connect } from 'react-redux';
import Modify from '../components/Modify';
import { pwdChange } from '../actions/userActions';
import { modifyInit } from '../actions/uiActions';

export default connect(
    state => ({
        cardNum: state.getIn(['userData', 'cardNum']),
        modifyOn: state.getIn(['uiState', 'modifyOn']),
        modifyOff: state.getIn(['uiState', 'modifyOff'])
    }),
    (dispatch) => ({
        pwdChange: (cardNum, newPwd) => () => (dispatch(pwdChange(cardNum, newPwd))),
        modifyInit: () => (dispatch(modifyInit()))
    })
)(Modify)