function post_get(content,data,status){
if(status=='success'){
    console.log(data);
    var html='';
    for(var i=0;i<data.data.length;i++){
        html+='<a href="post_view.html?post=' + data.data[i].post_title + '"class="a_black"><div  class="center_div"><span class="post_ref_title">'+data.data[i].post_title+'<br></span><span style="font-size: 20px;">'+data.data[i].post_introduction+'<br></span><span class="post_ref_info">作者：' + data.data[i].post_author + ' 发布时间：'+data.data[i].post_date+ '</span></div></a><hr style="height:1px;border:none;border-top:1px dashed #0000003b;"/>'; 
    }
    document.getElementById(content).innerHTML=html;
}
};
