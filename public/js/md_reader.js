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
    // var markedHtml = marked.parse(data);
    // document.getElementById("mdviewer").innerHTML=markedHtml;
    var testEditor;
    $(function () {
        testEditor = editormd.markdownToHTML("doc-content", {//注意：这里是上面DIV的id
            markdown:data,
            
            path    : "module/editor.md/lib/",
            htmlDecode: "style,script,iframe",
            width   : "80%",
            emoji: true,
            taskList: true,
            tex: true, // 默认不解析
            flowChart: true, // 默认不解析
            sequenceDiagram: true, // 默认不解析
            codeFold: true,
    });});
});


