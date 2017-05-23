/*jslint browser: true, devel: true, white: true, eqeq: true, plusplus: true, vars: true*/
/*global $,a*/


function kaguify(){
    "use strict";
    
    var allLinks = $("a");
    
    var i;
    for(i=0; i<allLinks.length; i++){
        if(allLinks[i].href.indexOf("imgur") > 0){
            var newLink = "http://kageurufu.net/imgur/?" + allLinks[i].href.substr(19);
            allLinks[i].href = newLink;
            allLinks[i].text = newLink;
        }
    }
}



function showAlbumPictureLinks(data){
    "use strict";
    
    $("#pictures").append("<h3>"+data.title+"</h3>");
    
    var i;
    for(i=0; i<data.images.length; i++){
        $("#pictures").append("<a href='"+data.images[i]+"'>"+data.images[i]+"</a><br>");
    }
}



function fetchImgurAlbum(albumID){
    "use strict";
    
    $.ajax({
        url: "imgur/album/" + albumID,
        type: "GET"
    }).done(function(data){
        showAlbumPictureLinks(data);
    });
}



$(document).ready(function(){
    "use strict";
    
    $(document).on("paste", function(e){
        var clipboardData = e.clipboardData || e.originalEvent.clipboardData || window.clipboardData;
        var pastedData = clipboardData.getData('text');
        
        var checkIfImgur = pastedData.indexOf("imgur");
        var checkIfGfyCat = pastedData.indexOf("gfycat");
        
        if(checkIfImgur >= 0){
            var isAlbum = pastedData.indexOf("/a/");
            if(isAlbum >= 0){
                fetchImgurAlbum(pastedData.substr(isAlbum+3));
            }
        }
    });
});

