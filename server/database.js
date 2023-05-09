//引入mysql模块
const mysql = require('mysql');

//创建post数据库连接
const db_post=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'516..',
    database:'post',
    timezone:"SYSTEM"
});

//创建account数据库连接
const db_account=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'516..',
    database:'account',
    timezone:"SYSTEM"
});

//设置post数据库对外接口
module.exports.db_post = db_post;
module.exports.db_account = db_account;
