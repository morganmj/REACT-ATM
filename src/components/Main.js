/*------------------最高级组件的定义------------------*/
import React from 'react';
import User from '../containers/UserContainer.js';
import styles from '../style/Main.css'
import { Card } from 'antd';

const Main = props => ( 
    <div className={styles.all}>
    <Card className={styles.layout}>
    <div className={styles.title}>ATM系统</div> 
    <User/>
    <div> {props.children}</div>
    </Card>
    </div>
);

export default Main;