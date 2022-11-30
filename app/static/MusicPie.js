var url = 'http://127.0.0.1:5000'
const webCamElement = document.getElementById("camera")
const canvasElement = document.getElementById("canvas")
const camera = new Webcam(webCamElement, "user", canvasElement)


function startCam(){
    camera.start()
}

function stopCam(){
    camera.stop()
}

function takePicture(){
    var photo = camera.snap().split(',')[1]
    console.log(photo)

    request = new XMLHttpRequest()
    request.open('POST', url+'/getRecommendations', true)
    // request.setRequestHeader("Content-Type", "application/json");
    request.send(photo)
}


function init(){
    var greetButton = document.getElementById("get-started-button");
    var message = document.getElementById("message");
    message.innerHTML = "What do you wish to do?";
    greetButton.style.display='none';

    var getRecs = document.getElementById("get-recs");
    var rateArtists = document.getElementById("rate-artists");
    // var rateSongs = document.getElementById("rate-songs");
    getRecs.style.display = 'block';
    rateArtists.style.display = 'block';
    // rateSongs.style.display = 'block';

}


function recs(){
    var request = new XMLHttpRequest();
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


function getMusic(){
    // this function will get the prediction from the classifier as a string
    // the function will send the string to the server,
    // and the server will add the string into the sql query
    
}

