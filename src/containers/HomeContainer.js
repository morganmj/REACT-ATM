/*------------------action类型定义------------------*/
import { connect } from 'react-redux';
import Home from '../components/Home';
import { homeInit } from '../actions/uiActions';

export default connect(
    state => ({}),
    (dispatch) => ({
        homeInit: () => (dispatch(homeInit()))
    })
)(Home);