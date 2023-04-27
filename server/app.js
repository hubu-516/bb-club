//引用express
const express = require('express');                                 
const app = express();

//引入根目录
app.use(express.static('../public'));                               


//开始监听5555端口
app.listen(5555, () => {
    console.log('Server is running on port 5555');                  
});


