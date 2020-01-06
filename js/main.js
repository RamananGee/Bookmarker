document.getElementById('myForm').addEventListener('submit', saveBookmark);

//Save Bookmark


function saveBookmark(e) {
    e.preventDefault();
    var siteName = document.getElementById('siteName').value;
    var siteUrl = document.getElementById('siteUrl').value;
    
    if(!validateForm(siteName, siteUrl))
    {
        return false;
    }
    var bookmark = {
        name: siteName,
        url: siteUrl
    }
    if(localStorage.getItem('bookmarks') === null){
        var bookmarks = [];

        bookmarks.push(bookmark);

        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }
    else{
        
        var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));//this is an array
        bookmarks.push(bookmark);
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
         }

        //  document.getElementById('siteName').value = '';
        //  document.getElementById('siteUrl').value = ''; or 
        document.getElementById('myForm').reset();
        fetchBookmarks();
     
}

//Delete bookmark
function deleteBookmark(url){
    //Get bookmark from localStorage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    for(var i=0; i<bookmarks.length; i++){
        if(bookmarks[i].url == url){
            bookmarks.splice(i, 1);
        }
    }
    //Reset back to localStorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    fetchBookmarks();
}

function fetchBookmarks(){
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    var bookmarksResults = document.getElementById('bookmarksResults');

    bookmarksResults.innerHTML = '';
    for(var i=0 ; i<bookmarks.length; i++){
        var name = bookmarks[i].name;
        var url = bookmarks[i].url;

        bookmarksResults.innerHTML += '<div class="well">'+
                                      '<h3>'+name+
                                      '<a class="btn btn-default" target="_blank" href="'+url+'">Visit</a>'+
                                      '<a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger"  href="#">Delete</a>'+
                                      '</h3>'+
                                      '</div>';
    }
}


function validateForm(siteName,siteUrl){
    if(!siteName || !siteUrl){
        alert('please fill in the form');
        return false;
    }

    var expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);

    if(!siteUrl.match(regex)){
        alert('Please use a valid url');
        return false;
    }
    return true;
}