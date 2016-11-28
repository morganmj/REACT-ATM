var mongoose = require('mongoose');
var express = require('express');
var bodyParser = require('body-parser');
var config = require('./config.js');
//import Immutable from 'immutable';
var app = new express();
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});
/*------------------连接数据库配置数据库------------------*/
app.listen(config.port, function() {
    console.log('成功启动');
});
var url = config.url;
mongoose.Promise = global.Promise;
mongoose.connect(url);

/*------------------card模式设计------------------*/
var Schema = mongoose.Schema;
var cardSchema = new Schema({
    cardNum: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    created_at: Date,
    updated_at: Date
});
var card = mongoose.model('card', cardSchema);

var moneySchema = new Schema({
    cardNum: {
        type: String,
        required: true,
        unique: true
    },
    money: {
        type: String,
        required: true
    }
});
var money = mongoose.model('money', moneySchema);

app.post('/newCard', function(req, res) {
    console.log(req.body);
    var newCard = new card({
        password: req.body.password,
        cardNum: req.body.cardNum,
        // 千万别用这种密码
    });

    newCard.save(function(err) {
        if (err) {
            res.send({ error: err });
        } else {
            console.log('插入新卡成功');
            res.send({ message: 'done', newCard: newCard });
        }
    });
});

app.post('/newMoney', function(req, res) {
    console.log(req.body);
    var newMoney = new money({
        cardNum: req.body.cardNum,
        money: req.body.money
            // 千万别用这种密码
    });

    newMoney.save(function(err) {
        if (err) {
            res.send({ error: err });
        } else {
            res.send({ message: 'done', newMoney: newMoney });
        }
    });
});

app.post('/loginCheck', function(req, res) {
    var cardNum = req.body.cardNum;
    var password = req.body.password;
    card.findOne({
        cardNum: cardNum
    }, function(err, card) {
        if (err) {
            res.send(err);
        } else {
            if (password !== card.password) {
                console.log('卡号密码错误');
                res.send({ err: '-2', info: '密码错误' });
            } else {
                console.log('卡号密码正确');
                money.findOne({
                    cardNum: cardNum,
                }, function(err, money) {
                    if (err) {
                        res.send(err);
                    } else {
                        console.log('得到钱');
                        res.send({ err: '0', money: money.money, info: '卡号密码正确' });
                    }
                })
            }
        }
    });
});

app.post('/inquire', function(req, res) {
    var cardNum = req.body.cardNum;
    console.log('查询余额卡号：' + cardNum);
    money.findOne({
        cardNum: cardNum
    }, function(err, money) {
        if (err) {
            res.send(err);
        } else {
            if (money == undefined) {
                res.send({ err: '-1', info: '没有当前卡号' });
            } else {
                console.log(money.money);
                res.send({ err: '0', money: money, info: '返回余额' });
            }
        }

    })
});


app.post('/withdrawals', function(req, res) {
    var cardNum = req.body.cardNum;
    var withdrawalsMoney = req.body.withdrawalsMoney;
    money.findOne({
        cardNum: cardNum
    }, function(err, money1) {
        if (err) {
            res.send(err);
        } else {
            var oldMoney = money1.money;
            if (parseInt(oldMoney) < parseInt(withdrawalsMoney)) {
                res.send({ err: '-1', info: '余额不足' });
            } else {
                money.findOneAndUpdate({ cardNum: cardNum }, { $set: { money: (parseInt(oldMoney) - parseInt(withdrawalsMoney)) } }, function(err, doc) {
                    if (err) {
                        console.log("Something wrong when updating data!");
                    }
                    res.send({ err: '0', info: '取款成功', money: (parseInt(oldMoney) - parseInt(withdrawalsMoney)) });
                })
            }
        }

    })
});


app.post('/deposit', function(req, res) {
    var cardNum = req.body.cardNum;
    var depositMoney = req.body.depositMoney;
    money.findOne({
        cardNum: cardNum
    }, function(err, money1) {
        if (err) {
            res.send({ err: '-1', info: '存款失败' });
        } else {
            var oldMoney = money1.money;
            money.findOneAndUpdate({ cardNum: cardNum }, { $set: { money: (parseInt(oldMoney) + parseInt(depositMoney)) } }, function(err, doc) {
                if (err) {
                    console.log("Something wrong when updating data!");
                }
                res.send({ err: '0', info: '存款成功', money: (parseInt(oldMoney) + parseInt(depositMoney)) });
            })
        }

    })
});

app.post('/transfer', function(req, res) {
    var cardNum = req.body.cardNum;
    var transferMoney = req.body.transferMoney;
    var toCardNum = req.body.toCardNum;
    money.findOne({
        cardNum: cardNum
    }, function(err, money1) {
        if (err) {
            res.send(err);
        } else {
            var fromMoney = money1.money;
            if (parseInt(fromMoney) < parseInt(transferMoney)) {
                res.send({ err: '-1', info: '转出余额不足' });
            } else {
                money.findOne({ cardNum: toCardNum }, function(err, money2) {
                    if (err) {
                        res.send(err);
                    } else {
                        if (!money2) {
                            res.send({ err: '-4', info: '转出账号不存在' });
                        } else {
                            money.findOneAndUpdate({ cardNum: cardNum }, { $set: { money: (parseInt(fromMoney) - parseInt(transferMoney)) } }, function(err, doc) {
                                if (err) {
                                    res.send({ err: '-2', info: '转出失败' });
                                } else {
                                    var toMoney = money2.money;
                                    money.findOneAndUpdate({ cardNum: toCardNum }, { $set: { money: (parseInt(toMoney) + parseInt(transferMoney)) } }, function(err) {
                                        if (err) {
                                            res.send({ err: '-3', info: '转入失败' });
                                        } else {
                                            res.send({ err: '0', info: '转账成功', money: (parseInt(fromMoney) - parseInt(transferMoney)) });
                                        }
                                    })

                                }
                            })
                        }
                    }
                })
            }
        }
    })
});


app.post('/pwdChange', function(req, res) {
    var cardNum = req.body.cardNum;
    var newPwd = req.body.newPwd;
    console.log(newPwd);
    card.findOneAndUpdate({ cardNum: cardNum }, { $set: { password: newPwd } }, function(err) {
        if (err) {
            res.send({ err: '-1', info: '修改密码失败' });
        }
        res.send({ err: '0', info: '修改密码成功' });
    })
});