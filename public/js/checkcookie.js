$('#logout').click(function(){
	const con = confirm('确定要注销账户么？')
	if(con == true)
	{
		//发送注销请求
		$.get('/logout',function(data,status){
		});
		location.reload();
	}
	
	
});

$('#bash').click(function(){

	$.get('/checkcookie',function(data,status){
		if(data.code==199&& data.vip==1)
		{
			window.open('http://qlwd.club:7680/bash','_blank','location=no');
			
		}
		else
		{
			alert("请先登录vip账户再开启终端");
		}
	});
});

$.get('/checkcookie',function(data,status){
	if(data.code==199)
	{
		$('#user_name').text(data.username);
		$('#logout').text('注销');
		
	}
	else
	{
		if(location.pathname == '/information.html')
		{
			
			alert("未登录！请先登录！");
			history.back();
		}		
		else
		{
			if(location.pathname == '/post_edit.html')
			{
				alert("未登录！请先登录！");
				window.close();
			}
		}
	}
	});
