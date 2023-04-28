//引用express
const express = require('express');                                 
const app = express();

//引入post数据库
const post = require('./database.js');

//引入public目录
app.use(express.static('../public'));                               

//引入md文件,虚拟到post目录
app.use('/post', express.static('../post'))

//开始连接数据库
post.db_post.connect(status => {
    console.log('Database(post):'+status);
});

//向服务器返回精华帖子
app.get('/index.html/digest',function(req,res){
    let sql='SELECT * FROM post.post_detail WHERE post_digest=1;';
    post.db_post.query(sql,(err,result)=>{
        if(err){res.send(err);}
        res.send({code:200,data:result,message:'获取成功'})
    });
});

//开始监听5555端口
app.listen(5555, () => {
    console.log('Server is running on port 5555');                  
});


