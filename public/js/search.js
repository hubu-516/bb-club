//从url中解析出search
var url_now=window.location.href;
const url = new URL(url_now);


if(url.searchParams.has("search"))
{
    var search=url.searchParams.get("search");
    $.get("/search.html/search",{search:search},function(data,status){
        post_get('post_searched',data,status);
    
    });
}

window.search = function() {
    $.get("/search.html/search",{search:$('#search_input').val()},function(data,status){
        post_get('post_searched',data,status);
    
    });
}
    




