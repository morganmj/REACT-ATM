/*------------------用户组件的定义------------------*/
import React from 'react';
import {Input, Alert, Button} from 'antd';

class User extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            checkState:'0'//0表示都不为空；-1表示至少一个为空
        };
        this.check=this.check.bind(this);
        this.submit=this.submit.bind(this);
    }
    check(){
        if(this.props.cardNum===''||this.props.password===''){
            this.setState({checkState:'-1'});
        }
        else{
            this.props.cardLogin(this.props.cardNum, this.props.password)();
        }
    }
    submit(type){
        var self=this;
        return function(e) {
            if(self.state.checkState==='-1'){
                self.setState({checkState:'0'});
            }
            if(type==='a'){
                self.props.changeCardNum(e);
            }
            if(type==='b'){
                self.props.changePassword(e);
            }
        };
    }
    render(){
        return (
        <div className="login-input"  style={{display:this.props.userShow}}>
            <Input size="large" type="text" value={this.props.cardNum} onChange={this.submit('a')}/>
            <Input size="large" type="password" value={this.props.password} onChange={this.submit('b')}/>
            <Button type="primary" onClick={this.check}>登    录</Button>
            {
                (this.state.checkState==='0')?
                (<div style={{visibility:this.props.pwdShow}}>
                     <Alert type="error" message="密码错误" showIcon/>
                 </div>):
                (<Alert  type="error" message="卡号或密码不能为空" showIcon/>)
            }
        </div>
        );
    }
}


export default User;