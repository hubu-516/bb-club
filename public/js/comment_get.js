function comment_get(content,data,status){
    if(status=='success'){
        console.log(data);
        var html='';
        for(var i=0;i<data.data.length;i++){
            html+='<div style="cursor: auto;" class="center_div"><span style="font-size: 20px;">'+data.data[i].comment_content+'<br></span><span class="post_ref_info">评论者：' + data.data[i].comment_author + ' 发布时间：'+data.data[i].comment_date+ '</span></div><hr style="height:1px;border:none;border-top:1px dashed #0000003b;"/>'; 
        }
        document.getElementById(content).innerHTML=html;
    }
    };
    