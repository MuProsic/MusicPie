var url = 'http://127.0.0.1:5000'

function init(){
    let greetButton = document.getElementById("get-started-button");
    let message = document.getElementById("message");
    message.innerHTML = "What do you wish to do?";
    greetButton.style.display='none';

    let getRecs = document.getElementById("get-recs");
    let rateArtists = document.getElementById("rate-artists");
    let viewArtists = document.getElementById('view-artists');
    // var rateSongs = document.getElementById("rate-songs");
    getRecs.style.display = 'block';
    // rateArtists.style.display = 'block';
    viewArtists.style.display = 'block';
    // rateSongs.style.display = 'block';

}

function recs(){
    let request = new XMLHttpRequest();
    let redirect = url+'/getRecommendations'
    request.open("GET", redirect, false);
    
    // request.setRequestHeader("Content-Type", "application/json");
    request.send();
    // console.log(request.status)
    if(request.status >= 200 && request.status < 400){
        console.log(request.status)
        window.location.href = '/getRecommendations'
    }
    
    
}


function view(){
    let request = new XMLHttpRequest();
    request.open('GET', url+'/viewArtists')
    request.onload = function(){
        if(request.status >= 200 && request.status < 400){
            // redirect
            window.location.href = '/viewArtists'
        }
    }
    request.send()
    
}


function rate(){
    let request = new XMLHttpRequest();
    request.open('GET', url+'/rateArtists')
    request.onload = function(){
        if(request.status >= 200 && request.status < 400){
            // redirect
            window.location.href = '/rateArtists'
        }
    }
    request.send()
}