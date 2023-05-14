$(document).ready(function() {
   // 当页面加载完成后执行
 
   // 获取信息流的div元素
   var $stream = $('.stream');
 
   // 获取用户输入的元素
   var $input = $('.information');
 
   // 定义会话ID
   var session_id = null;
 
   // 当用户在输入框中按下回车键时
   $input.keydown(function(event) {
     if (event.keyCode === 13) { // 如果按下的是回车键
       var message = $input.text(); // 获取用户输入的文本
       event.preventDefault();
       $input.text(''); // 清空
       //将用户输入的内容添加在上一行，不可编辑
       $stream.append('<div class="line"><p>>' + message + '</p></div>');
       //将用户输入的内容加到游戏消息流的最后面
       
         
       
      // 定义请求的数据
   var data = {message: message};

   // 如果有会话ID，则将其添加到请求数据中
   if (session_id !== null) {
     data.session_id = session_id;
   }
 
   // 使用$.ajax()方法向后端发送请求
   $.ajax({
     url: '/bottle',
     type: 'POST',
     data: data,
     dataType: 'json',
     success: function(response) {
       // 从响应中获取会话ID
       session_id = response.session_id;
 
       // 在信息流中添加从后端返回的数据

       $stream.append('<div class="line"><p>' +response.message + '</p></div>');
       
     },
     error: function(xhr, status, error) {
       console.log('Error:', error);
     }
   });
 }
}); });