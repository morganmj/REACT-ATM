import { connect } from 'react-redux';
import Inquire from '../components/Inquire';

export default connect(state => ({
    sumMoney: state.get('sumMoney')
}))(Inquire);