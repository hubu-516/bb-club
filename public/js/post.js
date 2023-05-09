//解析url得到当前页面id
var url_now=window.location.href;
const url = new URL(url_now);
var page_id=url.searchParams.get("page");
var num_total=0;
var page_num;


//向服务器请求总帖子数量
$.get('/post/num_total',function(data,status){
    num_total=data.num_total;
    $('#num_total').text('帖子总数:'+num_total);
    //向上取整得page总数
    page_num = Math.ceil(num_total/5);
    for(var i=1;i<page_num;i++)
    {
        var a=i+1;
	
        $('#page'+i).after('<li id="page' + a + '"><a href="?page=' + a + '" id="page_a' + a + '">' + a + '</a></li>');
    
    }
    //使当前页面相应翻页按钮亮起
    $('#page_a'+page_id).attr('class','active');
});



//向服务器请求帖子
$.get("/post.html/post",{page:page_id},function(data,status){
    post_get('post',data,status);

});


//左右翻页事件
$('#turnleft').click(function(){
    location='/post.html?page='+(page_id == 1 ? 1:page_id-1);
});
$('#turnright').click(function(){
    location='/post.html?page='+(page_id == page_num ? page_num:Number(page_id)+1);
});
