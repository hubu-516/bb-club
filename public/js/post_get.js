function post_get(content,data,status){
if(status=='success'){
    console.log(data);
    var html='';
    for(var i=0;i<data.data.length;i++){
        const date_obj = new Date(data.data[i].post_date);
        let date='';
        date += date_obj.getFullYear()+'-';
        date += date_obj.getMonth()+'-';
        date += date_obj.getDay()+' ';
        date += date_obj.getHours()+':';
        date += date_obj.getMinutes();
        html+='<a href="post_view.html?post=' + data.data[i].post_title + '"class="a_black"><div  class="center_div"><span class="post_ref_title">'+data.data[i].post_title+'<br></span><span style="font-size: 20px;">'+data.data[i].post_introduction+'<br></span><span class="post_ref_info">作者：' + data.data[i].post_author + ' 发布时间：'+date+ '</span></div></a>'; 
    }
    document.getElementById(content).innerHTML=html;
}
};
module.exports.post_get = post_get;