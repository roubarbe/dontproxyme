/*jslint devel: true, node: true, white: true, eqeq: true, plusplus: true, vars: true*/
/*global static*/

console.log("Setting up constants and global variables...");
var imgurClientID = "Client-ID f58fe435ddc2ae1";

console.log("Loading Request...");
var request = require("request");

console.log("Loading Express...");
var express = require("express");

console.log("Initializing Express...");
var app = express();



//Is provided with a JSON of all IMGUR album data, then throws back cleaned up JSON
function imgurCleanup(data){
    "use strict";
    
    var cleanedUpAlbum = {
        "title":data.data.title,
        "images":[]
    };
    
    var i;
    console.log(data);
    for(i=0; i < data.data.images.length; i++){
        cleanedUpAlbum.images.push(data.data.images[i].link);
    }
    
    return(cleanedUpAlbum);
}



//If it's an IMGUR album or picture
app.get("/imgur/:type/:id", function(req, res){
    "use strict";
    
    // Make sure parameters were defined in the URL
    if(typeof req.params.type != undefined){
        
        // User asked for an album
        if(req.params.type == "album"){
            request({
                uri: "https://api.imgur.com/3/album/"+req.params.id,
                method: "GET",
                timeout: 10000,
                followRedirect: true,
                maxRedirects: 10,
                headers: {"Authorization":imgurClientID}
            }, function(error, response, body){
                var convertBody = JSON.parse(body);
                
                var cleanedUp = imgurCleanup(convertBody);
                
                res.send(cleanedUp);
            });
        }
        
        // User asked for a single image
        else if(req.params.type == "picture"){
            res.send("Asking for a single IMGUR picture");
        }
        
        // Nothing was defined
        else{
            res.send("Please specify if album or picture");
        }
    }
    else{
        res.send("Undefined type");
    }
});



app.use(express.static('public'));



app.listen(process.env.PORT || 21134, function () {
    "use strict";
    console.log('Don\'t Proxy Me running on port 21134!');
});