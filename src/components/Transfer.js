import React from 'react';
import {IndexLink} from 'react-router';
import { Radio } from 'antd';
import { Input,Button,Alert } from 'antd';
import styles from '../style/Choice.css';
import Show from '../style/Show.css';
const RadioGroup = Radio.Group;

class Transfer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            valueRadio:'',
            valueInput:'',
            valueInput2:'',
            isShow:'hidden',
            transferState:'hidden'
        };
        this.submit=this.submit.bind(this);
    };
    radioChange(e){
        this.setState({valueRadio:e.target.value});
        if(e.target.value===0){
             this.setState({isShow:'visible'});
              this.setState({valueInput:''})
        }
        else{
            this.setState({isShow:'hidden'}); 
        }
    };
    inputChange(e){
        this.setState({valueInput:e.target.value})
    }
    inputChange2(e){
        this.setState({valueInput2:e.target.value})
    }
    submit(){
        if(this.state.valueRadio===''||(this.state.valueRadio===0&&!(/^[1-9]\d*$/.test(this.state.valueInput)))){
            this.setState({transferState:'visible'});
        }
        else{
           this.props.moneyTransfer(this.props.cardNum,this.state.valueInput2,this.state.valueRadio===0?this.state.valueInput:this.state.valueRadio)();
        }
    }
    render() {
         const radioStyle={
                fontSize:'18px',
                lineHeight:'1px',
                margin:'15px 22px'
            }
            const back=<IndexLink style={{margin:'15px'}} to="/welcome" onClick={this.props.transferInit}><Button size="large">返回</Button></IndexLink>;
        return (
            <div className="Choice">
            <div style={{display:this.props.transferOn}}>
                <div className={styles.choice}>
                    <RadioGroup onChange={this.radioChange.bind(this)} value={this.state.valueRadio} style={{height:'28px',lineHeight:'28px'}}>
                        <Radio style={radioStyle} key="a" value={100}>100</Radio>
                        <Radio style={radioStyle} key="b" value={200}>200</Radio>
                        <Radio style={radioStyle} key="c" value={500}>500</Radio>
                        <br/>
                        <Radio style={radioStyle} key="d" value={1000}>1000</Radio>
                        <Radio style={radioStyle} key="e" value={0}>其他金额</Radio>
                        <Input type="text" onChange={this.inputChange.bind(this)} value={this.state.valueInput} style={{visibility:this.state.isShow,width:'100px',fontSize:'18px'}}/>
                    </RadioGroup>
                    <div style={{margin:'30px 23px',fontSize:'18px'}}>输入对方账号：<Input type="text" onChange={this.inputChange2.bind(this)} value={this.state.valueInput2} style={{width:'200px',fontSize:'18px'}}/></div>
                </div>
                <div style={{visibility:this.state.transferState,width:'210px',margin:'-20px auto 0'}}><Alert type="error" message="请选择或输入有效金额" showIcon/></div>
                <div className={styles.btn}>
                   <Button type="primary" size="large" style={{margin:'15px'}} onClick={this.submit}>确定</Button>
                   {back}
                </div>
            </div>
            {
                (()=>{
                    let transferOff=this.props.transferOff;
                    if(transferOff=='0'){
                        return null;
                    }
                    if(transferOff=='1'){
                        return <div><div className={Show.success}>转账成功</div><div style={{textAlign:'center'}}>{back}</div></div>;
                    }
                    if(transferOff=='-1'){
                        return <div><div className={Show.fail}>余额不足</div><div style={{textAlign:'center'}}>{back}</div></div>;
                    }
                    if(transferOff=='-4'){
                        return <div><div className={Show.fail}>账号不存在</div><div style={{textAlign:'center'}}>{back}</div></div>;
                    }
                })()
            }
            </div>
        );
    };
};

export default Transfer;