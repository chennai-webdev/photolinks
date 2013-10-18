var authorId = "";
var authorName = "";

//Intialize the app

var initApp = function(){
    
    $.getJSON("http://api.flickr.com/services/feeds/photos_public.gne?api_key=56b2fb2e889e31f7efcea5124d832ab4&user_id=37176929@N08&format=json&jsoncallback=?").done(getPublicPhotos);
}

//get public photos

var getPublicPhotos = function(data){
    
    $(".view").hide();
    $("#feed").show();
    $("#main-header").text("Public Photos Feed");
    $.each(data.items, function(i,item){
    var tagSet = "";
    tagSet += "<div class='photoBlock'><img src='"+item.media.m+"'/><span>"+item.author+"</span><br /><span class='linkpage' data-id='"+item.author_id+"' data-author='"+item.author+"'>Go to This authors page</span></div>";
    $(tagSet).appendTo("#feed");
    });
    
    $(".linkpage").on("click",function(){
    authorId = $(this).attr("data-id");
    authorName = $(this).attr("data-author");
    
    $.getJSON("http://api.flickr.com/services/rest/?method=flickr.people.getPublicPhotos&api_key=56b2fb2e889e31f7efcea5124d832ab4&user_id="+authorId+"&format=json&jsoncallback=?").done(getAuthorPhotos);
    });
    
};

//get authors photos

var getAuthorPhotos = function(data){

    $(".view").hide();
    $("#author").show();
    $("#main-header").text(authorName+"'s Public Photos");
    $.each(data.photos.photo, function(i,item){
    var tagSet2 = "";
    tagSet2 += "<div class='photoBlock'><img src='http://farm"+item.farm+".staticflickr.com/"+item.server+"/"+item.id+"_"+item.secret+"_n.jpg'/><span>"+item.title+"</span><br /><span class='linkpage2'>Go to This authors friends page</span></div>"
    $(tagSet2).appendTo("#author");
    });
    
    $(".linkpage2").on("click",function(){
    
    $.getJSON("http://api.flickr.com/services/rest/?method=flickr.photos.getContactsPublicPhotos&api_key=56b2fb2e889e31f7efcea5124d832ab4&user_id="+authorId+"&format=json&jsoncallback=?").done(getAuthorsFriendsPhoto);

    });
    
};

//get authors friends photos
var getAuthorsFriendsPhoto = function(data){
    
    $(".view").hide();
    $("#friends").show();
    $("#main-header").text(authorName+"'s Friends Public Photos");
    $.each(data.photos.photo, function(i,item){
    var tagSet3 = "";
    tagSet3 += "<div class='photoBlock'><img src='http://farm"+item.farm+".staticflickr.com/"+item.server+"/"+item.id+"_"+item.secret+"_n.jpg'/><br /><span>"+item.title+"</span></div>"
    $(tagSet3).appendTo("#friends");
    });
    
};

//on dom ready

$(function(){
    
    //Init
    initApp();

})
