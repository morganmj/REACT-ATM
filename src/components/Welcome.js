import React from 'react';
import {IndexLink} from 'react-router';
import styles from '../style/Welcome.css';

const Welcome = props => (
    <div>
        <div className={styles.title}>欢迎使用ATM系统</div>
        <div>{props.children}</div>
    </div>
);

export default Welcome;