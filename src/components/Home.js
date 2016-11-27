/*------------------Atm主页的定义------------------*/
import React from 'react';
import { Link } from 'react-router';
import {Button} from 'antd';
import styles from '../style/Home.css';
const Home = props => (
  <div className={styles.main}>
      <div className={styles.all}>
           <Link to="/welcome/withdrawals"><Button className={styles.item} type="ghost">取款</Button></Link>
           <Link to="/welcome/deposit"><Button className={styles.item} type="ghost">存款</Button></Link>
      </div>
      <div className={styles.all}>
           <Link to="/welcome/transfer"><Button className={styles.item} type="ghost">转账</Button></Link>
           <Link to="/welcome/inquire"><Button className={styles.item} type="ghost">查询</Button></Link>
      </div>
      <div className={styles.all}>
           <Link to="/welcome/modify"><Button className={styles.item} type="ghost">修改密码</Button></Link>
           <Link to="/" onClick={props.homeInit}><Button className={styles.item} type="ghost">退卡</Button></Link>
      </div>
  </div>
);

export default Home;