$.get('/information',function(data,status){
    var html='';
    html+='<div  class="center_div"><h2>用户名:'+data.data.username+'</h2></div>';
    document.getElementById('information').innerHTML=html;
});