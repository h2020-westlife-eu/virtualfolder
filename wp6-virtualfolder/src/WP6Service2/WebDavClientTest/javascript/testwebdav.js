
function ajaxrequest(method, url, callback,contentdivid,content) {
    var request;
    // compatible with IE7+, Firefox, Chrome, Opera, Safari
    request = new XMLHttpRequest();
    request.onreadystatechange = function(){
        if (request.readyState == 4 && request.status == 200){
            callback(request.responseText,contentdivid);
        } else {
            console.log(request.response)
            alert('There was an error. See console. ');
        }
    }
    request.open(method, url, true);
    request.send(content);
}

function downloadcallback(responsetext,contentdivid) {
    document.getElementById(contentdivid).innerHTML = responsetext;
}

function uploadcallback(responsetext,contentdivid) {
    document.getElementById(contentdivid).innerHTML = "Upload OK.";
}

function downloadwebdavfile(url,contentdivid) {
    ajaxrequest("GET",url, downloadcallback,contentdivid)
}

function uploadwebdavfile(url,contentdivid,content) {
    ajaxrequest("PUT",url,uploadcallback,content)
}