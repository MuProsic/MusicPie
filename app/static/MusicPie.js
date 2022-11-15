function startCam(){
    const webCamElement = document.getElementById("camera")
    const canvasElement = document.getElementById("canvas")
    const camera = new Webcam(webCamElement, "user", canvasElement)
    camera.start()
}

function stopCam(){
    
}

function takePicture(){

}

function getMusic(){
    // this function will get the prediction from the classifier as a string
    // the function will send the string to the server,
    // and the server will add the string into the sql query
    
}

