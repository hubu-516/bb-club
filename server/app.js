//引用express
const express = require('express');                                 
const { findSourceMap } = require('module');
//解析数据模块(不是很清楚)
const bodyParser = require('body-parser');
//cookie中间件
const cookieParser = require('cookie-parser');
//文件读写模块
const fs = require('fs')
//express模块
const app = express();

//设置中间件解析数据
app.use(bodyParser.urlencoded({ extended: false }));
//引入post数据库
const db = require('./database.js');
const { data } = require('jquery');

//引入public目录
app.use(express.static('../public'));                               

//引入md文件,虚拟到post目录
app.use('/post', express.static('../post'))

app.use(cookieParser());

//开始连接数据库
db.db_post.connect(status => {
    console.log('Database(post):'+status);
});
db.db_account.connect(status => {
    console.log('Database(account):'+status);
});


//定义sql搜索函数
function sql_search(sql,res)
{   
    db.db_post.query(sql,(err,result)=>{
        if(err){res.send(err);}
        res.send({code:200,data:result,message:'获取成功'});
    });
};

//向服务器返回精华帖子
app.get('/index.html/digest',function(req,res){
    let sql='SELECT * FROM post.post_detail WHERE post_digest=1;';
    sql_search(sql,res);
    return;
});

//返回帖子搜索
app.get('/search.html/search',function(req,res)
{
    //去除频繁字
    var reg1 = new RegExp("的","g");
    var search = req.query.search.replace(reg1,"");

    var sql='SELECT * FROM post.post_detail WHERE post_title LIKE "%'+req.query.search+'%" or post_introduction LIKE "%'+req.query.search+'%"or post_author LIKE "%'+req.query.search+'%"';
    sql+='or post_title REGEXP "['+req.query.search+']{2,}"';
    sql+='or post_introduction REGEXP "['+req.query.search+']{2,}";';
    sql_search(sql,res);
    return;
});

//处理注册请求
app.post('/register',function(req,res){
    const { new_username, new_email, new_password, password_again } = req.body;
    var sql = 'SELECT * FROM account.user WHERE username=? or email=? '
    db.db_account.query(sql,[new_username,new_email],(err,result)=>{
        if(err){res.send(err);}
        {
            if(result.length>0)
            {
                //已存在账号或邮箱           
                res.send('<h1>已存在该账号或邮箱</h1>');
            }
            else
            {
              sql="INSERT INTO user (username,email,password) VALUES (?,?,?)";
              db.db_account.query(sql,[new_username,new_email,new_password],(err,result)=>{
                if(err)
                {res.send(err);}
                res.send('注册成功');
              });
            }
        }
    }); 
    return;
});


//处理登录请求
app.post('/login',function(req,res){
    const{email,password} = req.body;
    var sql = 'SELECT * FROM account.user WHERE email=? and password=?';
    db.db_account.query(sql,[email,password],(err,result)=>{
        if(err)
        {
            res.send('error');
            throw err;
        }
        else
        {
            if(result.length>0)
            {
                //利用http修改用户浏览器cookie,并且利用httponly保证了安全性
                res.cookie('cookie_user',result[0].username,{httpOnly:true,maxAge:7*86400*1000});
                res.cookie('cookie_vip',result[0].vip,{httpOnly:true,maxAge:7*86400*1000});
                res.redirect('/index.html');
            }
            else
            {
                res.send('<a href="/login.html">账号或密码错误(点击返回)</a>');
            }
        }
    });
    return;
});

//处理检查登录
app.get('/checkcookie',function(req,res){
    var sql = "SELECT * FROM account.user WHERE username=?";
    db.db_account.query(sql,[req.cookies.cookie_user],(err,result)=>{
        if(result.length>0)
        {
            res.send({code:199,username:req.cookies.cookie_user,vip:req.cookies.cookie_vip});
        }
        else
        {
            res.send({code:-199});
        }
    });
	
});

//处理注销请求
app.get('/logout',function(req,res){
    res.clearCookie('cookie_user',{httpOnly:true});
    res.redirect('/index.html');
});


//返回帖子总数
app.get('/post/num_total',function(req,res){
    if(req.query.tag==''||req.query.tag == "全部")
    {
        var sql = 'SELECT COUNT(*) FROM post.post_detail';
    }
    else
    {
        var sql = 'SELECT COUNT(*) FROM post.post_detail WHERE post_tag = ?';
    }
    db.db_post.query(sql,[req.query.tag],(err,result)=>{
    res.send({num_total:result[0]['COUNT(*)']});
    });
});

//处理帖子请求
app.get('/post.html/post',function(req,res){
    if(req.query.tag==''||req.query.tag == "全部")
    {
        var sql = 'SELECT * FROM post.post_detail limit ?,?';
        db.db_account.query(sql,[(req.query.page-1)*5,5],(err,result)=>{
            if(err)
            {   
            }
            res.send({code:200,data:result,message:'获取成功'});
        });
    }
    else
    {
        var sql = 'SELECT * FROM post.post_detail WHERE post_tag = ? limit ?,? ';
        db.db_account.query(sql,[req.query.tag,(req.query.page-1)*5,5],(err,result)=>{
            if(err)
            {   
            }
            res.send({code:200,data:result,message:'获取成功'});
        });
    }

    
    
});



//返回用户信息
app.get('/information',function(req,res){
    var sql = 'SELECT * FROM account.user WHERE username = ?';
    	if(req.cookies.cookie_user != null)
	{
	db.db_account.query(sql,[req.cookies.cookie_user],(err,result)=>{
        if(err)
        {}
        delete result[0].password;
        res.send({code:200,data:result[0],message:'获取成功'});
	});
	}
});



//处理发布的帖子
app.post('/post_submit',function(req,res){
    var sql = 'SELECT * FROM post.post_detail WHERE post_title=?';
    db.db_account.query(sql,[req.body.post_title],(err,result)=>{
        if(err)
        {res.send(err);}
        else
        {
            if(result.length>0)
            {
                res.send("已有同名帖子！！！");
            }
            else
            {
                //向数据库写入索引
                sql = 'INSERT INTO post.post_detail (post_title,post_introduction,post_author,post_tag) VALUES (?,?,?,?)';
                db.db_account.query(sql,[req.body.post_title,req.body.post_detail,req.cookies.cookie_user,req.body.post_tag],(err,result)=>{
                    if(err){res.send(err);return;}
                    else
                    {
                        sql = 'SELECT post_id FROM post.post_detail WHERE post_title = ?';
                        db.db_account.query(sql,[req.body.post_title],(err,result)=>{
                            if(err){res.send(err);}
                            else
                            {
                                fs.writeFile('../post/'+req.body.post_title+'.md',req.body['editormd-markdown-doc'],err=>{
                                    if(err)
                                    {
                                        res.send(err);
                                        return;
                                    }
                                    res.send('<h2>发布成功</h2>');
                                });
                            }
                        });
                    }
                });
            }
        }
    });

});

//处理获取评论
app.get('/comment_get',function(req,res){
    var sql= 'SELECT * FROM post.post_comment WHERE comment_post = ?';
    db.db_post.query(sql,[req.query.comment_post],(err,result)=>{
        if(err)
        {}
        res.send({code:200,data:result,message:'获取成功'});
    });
});

//处理评论发布
app.post('/comment_submit',function(req,res){
    var sql = 'INSERT INTO post_comment (comment_content,comment_author,comment_post) VALUES (?,?,?)';
    db.db_post.query(sql,[req.body.comment_content,req.cookies.cookie_user,req.body.comment_post],(err,result)=>{
        if(err)
        {
            res.send({code:-198,message:err.sqlMessage});
            console.log(err);
        }
        else
        {
            res.send({code:201});
        }
        
    });
});


app.listen(80, () => {
    console.log('Server is running on port 80');                  
});


