

//向服务器请求精华帖子
$.get("/index.html/digest",function(data,status){
    post_get('digest',data,status);

});