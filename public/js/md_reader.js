// 用于解析markdown文件
// 依赖：marked.js


const rendererMD = new marked.Renderer();

//从url中解析出post_id
var url_now=window.location.href;
const url = new URL(url_now);
var post_id=url.searchParams.get("post");

//定义mark解析
marked.setOptions({
  renderer: rendererMD,
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
})

// 从服务器获取markdown文件
$.get("/post/"+post_id+".md",function(data,status){
    var markedHtml = marked.parse(data)
    document.getElementById("mdviewer").innerHTML=markedHtml
});
