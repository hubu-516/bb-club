
//从url中解析出post_id
var url_now=window.location.href;
const url = new URL(url_now);
var post_id=url.searchParams.get("post");
//向服务器请求精华帖子
$.get("/comment_get",{comment_post:post_id},function(data,status){
    comment_get('comment',data,status);

});

$('#submit').click(function(){
    $.post('/comment_submit',{comment_content:$('#comment_content').val(),comment_post:post_id},function(data,ststus){
        if(data.code == -198)
        {
            alert(data.message);
        }
        else
        {
            if(data.code == 201)
            {
                location.reload();
            }
        }
    });
});
