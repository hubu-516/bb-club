
window.search = function() {
    $.get("/search.html/search",{search:$('#search_input').val()},function(data,status){
        post_get('post_searched',data,status);
    
    });
}
    




