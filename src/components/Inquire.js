import React from 'react';
import { IndexLink } from 'react-router';
import {Button} from 'antd';
import Show from '../style/Show.css';

const Inquire = props => (
    <div>
        <div className={Show.success}>
            <div>当前余额 {props.sumMoney}元</div>
        </div>
        <div style={{textAlign:'center'}}>
        <IndexLink style={{margin:'15px 25px'}} to="/welcome"><Button size="large">返回</Button></IndexLink>
        </div>
   </div>
);

export default Inquire;