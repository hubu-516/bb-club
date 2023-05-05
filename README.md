# bb-club
bb-club build by js for class.
如需在服务器上搭建，步骤如下:

1. 解压源文件到文件夹，并在根目录下创建post文件夹.
2. 下载editor.md文件，可在github找到开源仓库，或用npm安装得到文件:执行:`npm install editor.md`
3. 建立mysql数据库，包含account.user,account.admin,post.post_detail...(详细请阅读源码),并在js/database.js中修改账号密码。
4. 执行app.js
`sudo node server/app.js`
