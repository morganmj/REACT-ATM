import { connect } from 'react-redux';
import User from '../components/User';
import { cardNumInput, passwordInput, cardCheck } from '../actions/userActions';

export default connect(state => ({
    cardNum: state.getIn(['userData', 'cardNum']),
    password: state.getIn(['userData', 'password']),
    userShow: state.getIn(['uiState', 'userShow']),
    pwdShow: state.getIn(['uiState', 'pwdShow'])
}), (dispatch) => ({
    changeCardNum: (event) => (dispatch(cardNumInput({ cardNum: event.target.value }))),
    changePassword: (event) => (dispatch(passwordInput({ password: event.target.value }))),
    cardLogin: (cardNum, password) => () => (dispatch(cardCheck(cardNum, password)))
}))(User);