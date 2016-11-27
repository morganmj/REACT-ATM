import React from 'react';
import {IndexLink} from 'react-router';
import { Radio,Input,Button,Alert} from 'antd';
import styles from '../style/Choice.css';
const RadioGroup = Radio.Group;
import Show from '../style/Show.css';
class Withdrawals extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            valueRadio:'',
            valueInput:'',
            isShow:'hidden',
            withState:'hidden'
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
    submit(){
        if(this.state.valueRadio===''||(this.state.valueRadio===0&&!(/^[1-9]\d*$/.test(this.state.valueInput)))){
            this.setState({withState:'visible'});
        }
        else{
            this.props.moneyOut(this.props.cardNum,this.state.valueRadio===0?this.state.valueInput:this.state.valueRadio)();
        }
    }
    render() {
        const radioStyle={
            fontSize:'18px',
            lineHeight:'1px',
            margin:'15px 22px'
        }
        const back=<IndexLink style={{margin:'15px 25px'}} to="/welcome" onClick={this.props.withInit}><Button size="large">返回</Button></IndexLink>;
        return (
            <div className="Choice">
            <div style={{display:this.props.withOn}}>
                <div className={styles.choice}>
                    <RadioGroup onChange={this.radioChange.bind(this)} value={this.state.valueRadio}>
                        <Radio style={radioStyle} key="a" value={100}>100</Radio>
                        <Radio style={radioStyle} key="b" value={200}>200</Radio>
                        <Radio style={radioStyle} key="c" value={500}>500</Radio>
                        <br/>
                        <Radio style={radioStyle} key="d" value={1000}>1000</Radio>
                        <Radio style={radioStyle} key="e" value={0}>其他金额</Radio>
                        <Input type="text" onChange={this.inputChange.bind(this)} value={this.state.valueInput} style={{visibility:this.state.isShow,width:'100px',fontSize:'18px'}}/>
                    </RadioGroup>
                </div>
                <div style={{visibility:this.state.withState,width:'210px',margin:'-20px auto 0'}}><Alert type="error" message="请选择或输入有效金额" showIcon/></div>
                <div className={styles.btn}>
                    <Button type="primary" size="large" style={{margin:'15px 25px'}} onClick={this.submit}>确定</Button>
                    {back}
                </div>
            </div>
            {this.props.withOff=='0'?null:(this.props.withOff=='1'?(<div><div className={Show.success}>转账成功</div><div style={{textAlign:'center'}}>{back}</div></div>):<div><div className={Show.fail}>余额不足取款失败</div><div style={{textAlign:'center'}}>{back}</div></div>)}
            </div>
        );
    };
};

export default Withdrawals;