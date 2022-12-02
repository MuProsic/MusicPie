var url = 'http://127.0.0.1:5000'
const webCamElement = document.getElementById("camera")
const canvasElement = document.getElementById("canvas")
const camera = new Webcam(webCamElement, "user", canvasElement)
var mood = ''


function startCam(){
    camera.start();
    let startCamButton = document.getElementById('cam_on');
    let stopCamButton = document.getElementById('cam_off');
    let snapButton = document.getElementById('snap');
    let cam = document.getElementById('camera');
    let canvas = document.getElementById('canvas')
    startCamButton.style.display = 'none';
    stopCamButton.style.display = 'block';
    snapButton.style.display = 'block';
    canvas.style.display = 'none';
    cam.style.display = 'block';
    document.getElementById('pred').innerHTML = ''
    document.getElementById('query').style.display = 'none'
}

function stopCam(){
    let startCamButton = document.getElementById('cam_on');
    let stopCamButton = document.getElementById('cam_off');
    let snapButton = document.getElementById('snap');
    let cam = document.getElementById('camera')
    startCamButton.style.display = 'block';
    stopCamButton.style.display = 'none';
    snapButton.style.display = 'none';
    cam.style.display = 'none';
    document.getElementById('cam_on').innerHTML = 'Start Camera'
    camera.stop()
}

function takePicture(){
    let canvas = document.getElementById('canvas')
    canvas.style.display = 'block'
    var photo = camera.snap().split(',')[1]
    stopCam()
    document.getElementById('cam_on').innerHTML = 'Retake'
    // console.log(photo)

    request = new XMLHttpRequest()
    request.open('POST', url+'/getRecommendations', true)
    request.setRequestHeader('Content-Type', 'application/json');
    request.responseType = 'json';
    request.onload = function(){
        let status = request.status;
        if(status === 200){
            data = request.response
            console.log(data['prediction'])
            // console.log(window.atob(data['image']))

            let canvas = document.getElementById('canvas');
            let context = canvas.getContext('2d');
            let new_img = new Image()

            new_img.onload = function() {
                canvas.width = this.naturalWidth
                canvas.height = this.naturalHeight
                context.drawImage(this, 0, 0);
              }
            
            // console.log('data:image/jpg;base64,'+data['image'])
            // var imgURL = URL.createObjectURL('data:image/jpg;base64,'+data['image']);
            // console.log(imgURL)

            document.getElementById('pred').innerHTML = 'Predicted Facial Expression: ' + data['prediction']
            new_img.src = 'data:image/jpg;base64,' + data['image']
            // document.getElementById('canvas').src = imgURL;
            console.log(new_img.src)
            // document.getElementById('canvas').src = new_img.src;

            document.getElementById('query').style.display = 'block'
            mood = data['prediction']
            
        }
        else{
            cancelIdleCallback(status, request.response);
        }
    };
    request.send(photo)


}


function queryYes(){
    let request = new XMLHttpRequest()
    request.open('GET', url)
    request.responseType = 'json';
    request.onload = function(){

    }

    request.send()
    
}


function queryNo(){
    document.getElementById('query').style.display = 'none'
    
    let request = new XMLHttpRequest();
    request.open('GET', url);
    request.responseType = 'json';
    request.setRequestHeader('Content-Type', 'application/json');
    request.onload = function(){
        if(request.status >= 200 && request.status < 400){
            let table = document.getElementById('result');
            table.innerHTML = '';

            for(i in Object.keys(request.response)){
                let row = table.insertRow();
                let artist = row.insertCell(0);
                let song = row.insertCell(1);
                let mood = row.insertCell(2);

                name.innerHTML = Object.keys(request.response)[i];
                grade.innerHTML = request.response[Object.keys(request.response)[i]];
            }
        }
    }
    
    queryData = {"mood": mood};
    request.send(JSON.stringify(queryData));

    
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

