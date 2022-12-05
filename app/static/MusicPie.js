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
    let canvas = document.getElementById('canvas');
    

    
    startCamButton.style.display = 'none';
    stopCamButton.style.display = 'block';
    snapButton.style.display = 'block';
    canvas.style.display = 'none';
    cam.style.display = 'block';
    document.getElementById('pred').innerHTML = ''
    document.getElementById('query').style.display = 'none'
    document.getElementById('query_addons').style.display = 'none'

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
    if (document.getElementById('result').rows.length !== 0) {
        console.log("TRUEEEE")
        console.log(document.getElementById('result').length)
        // document.getElementById('result').remove()
    }
    document.getElementById('cam_on').innerHTML = 'Retake'
    // console.log(photo)

    request = new XMLHttpRequest()
    request.open('POST', url+'/getRecommendations', true)
    // request.setRequestHeader('Content-Type', 'application/json');
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
            // console.log(new_img.src)
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


function displayQueryAddons(){
    document.getElementById('query_addons').style.display = 'block'
}


function queryYes(){
    
    queryData = {"mood": mood,
                "with_artist_name": false,
                "with_energy": false,
                "energy": 0,
                "artist": ""};

    let artist = document.getElementById('add_artist_name').innerHTML
    let energy = document.getElementById('add_energy').innerHTML

    if(artist === null && energy === null){
        console.log("TRUEEEEEE")
        document.getElementById('warning_message').style.display = 'block'
    }
    else{
        if(artist !== null){
            queryData['with_artist_name'] = true
        }
        if(energy !== null){
            queryData['with_energy'] = true
        }

        let request = new XMLHttpRequest()
        request.open('POST', url+'/getRecommendations', true)
        request.responseType = 'json';
        request.setRequestHeader('Content-Type', 'application/json');
        request.onload = function(){
            if(request.status >= 200 && request.status < 400){
                let table = document.getElementById('result');
                table.innerHTML = '';
                data = request.response
                console.log(data[0][0])
                
                // inserting table headers
                let header = table.createTHead();
                let header_row = header.insertRow();
                let artist = header_row.insertCell(0);
                let song = header_row.insertCell(1);
                let emotion = header_row.insertCell(2);
                let energy = header_row.insertCell(3);
                
                artist.innerHTML = 'Artist';
                song.innerHTML = 'Song';
                emotion.innerHTML = 'Genre Mood';
                energy.innerHTML = 'Energy (0-1)';
    
    
                for(let i = 0; i < data.length; i++){
                    let row = table.insertRow()
        
                    for(let j = 0; j < data[i].length; j++){
                        let col = row.insertCell(j);
                        col.innerHTML = data[i][j]
                    }
                }
            }
        }

        request.send()
    }
    
    
}


function queryNo(){
    // reqData = {"photo": photo, "getRecs": false, "predict": true}
    document.getElementById('query').style.display = 'none'
    
    let request = new XMLHttpRequest();
    request.open('POST', url+'/getRecommendations', true);
    request.responseType = 'json';
    request.setRequestHeader('Content-Type', 'application/json');
    request.onload = function(){
        if(request.status >= 200 && request.status < 400){
            let table = document.getElementById('result');
            table.innerHTML = '';
            data = request.response
            console.log(data[0][0])
            
            // inserting table headers
            let header = table.createTHead();
            let header_row = header.insertRow();
            let artist = header_row.insertCell(0);
            let song = header_row.insertCell(1);
            let emotion = header_row.insertCell(2);
            let energy = header_row.insertCell(3);
            
            artist.innerHTML = 'Artist';
            song.innerHTML = 'Song';
            emotion.innerHTML = 'Genre Mood';
            energy.innerHTML = 'Energy (0-1)';


            for(let i = 0; i < data.length; i++){
                let row = table.insertRow()
    
                for(let j = 0; j < data[i].length; j++){
                    let col = row.insertCell(j);
                    col.innerHTML = data[i][j]
                }
            }
        }
    }
    
    queryData = {"mood": mood,
                "with_artist_name": false,
                "with_energy": false};
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

