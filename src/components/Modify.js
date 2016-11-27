import React from 'react';
import { IndexLink } from 'react-router';
import styles from '../style/Choice.css';
import Show from '../style/Show.css';
import { Input,Button,Alert } from 'antd';

class Modify extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isShow: 'none',
            value1:'',
            value2:'',
            pwdState:'0',
        };
        this.submit=this.submit.bind(this);
    }
    inputChange1(e){
        this.setState({value1:e.target.value});
    }
    inputChange2(e){
        this.setState({value2:e.target.value});
    }
    submit(){
        console.log(this.state.value1)
        if(this.state.value1===''){
            this.setState({pwdState:'-1'});
        }
        else if(this.state.value1!==this.state.value2){
            this.setState({pwdState:'-2'});
        }
        else{
            console.log("ok");
            this.props.pwdChange(this.props.cardNum,this.state.value2)();
        }
    }
    render(){
        const back=<IndexLink style={{margin:'15px 25px'}} to="/" onClick={this.props.modifyInit}><Button size="large">返回</Button></IndexLink>;
        return (
            <div className="modify-input Choice">
            <div style={{display:this.props.modifyOn}}>
               <Input type="password" value={this.state.value1} placeholder="输入新密码" onChange={this.inputChange1.bind(this)} />
               <Input type="password" value={this.state.value2} placeholder="确认新密码" onChange={this.inputChange2.bind(this)} />
               <div className={styles.btn}>
                   <Button style={{margin:'15px 25px'}}  type="primary" onClick={this.submit}>确定</Button>
                   {back}
               </div>
               <div style={{margin:'auto',width:'220px',visibility:(this.state.pwdState==='0')?'hidden':'visible'}}>
                    {
                    (this.state.pwdState=='-1')?
                    (<div>
                        <Alert type="error" message="新密码不能为空" showIcon/>
                    </div>):
                    (<div>
                        <Alert type="error" message="输入密码不一致" showIcon/>
                    </div>)
                    }
               </div>
            </div>
            {
               (()=>{
                   let modifyOff=this.props.modifyOff;
                   if(modifyOff=='0'){
                       return null;
                   }
                   if(modifyOff=='-1'){
                       return <div><div className={Show.fail}>修改失败</div><div style={{textAlign:'center'}}>{back}</div></div>;
                   }
                   if(modifyOff=='1'){
                       return <div><div className={Show.success}>修改成功</div><div style={{textAlign:'center'}}>{back}</div></div>;
                   }
               })()   
               }
               </div>
        )
    }
}


export default Modify;