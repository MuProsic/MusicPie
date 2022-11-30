import cv2
import base64
import numpy as np
import tensorflow as tf
from tensorflow.keras.models import load_model
from flask import render_template, redirect, Flask, request, url_for
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
CATEGORIES = ['angry', 'disgust', 'fear', 'happy', 'neutral', 'sad', 'surprise']

with app.app_context():
    @app.route('/', methods=['GET', 'POST'])
    def home():
        return render_template("home.html")

    @app.route('/getRecommendations', methods=['GET', 'POST'])
    def getRecs():
        if request.method == 'POST':
            data = request.get_data()
            
            # Decoding image
            img_str = base64.b64decode(data)
            nparr = np.fromstring(img_str, np.uint8)
            img = cv2.imdecode(nparr, cv2.IMREAD_GRAYSCALE)
            
            
            # Load the cascade
            face_cascade = cv2.CascadeClassifier('haarcascade_frontalface_default.xml')
            faces = face_cascade.detectMultiScale(
                    img,
                    scaleFactor=1.1,
                    minNeighbors=4
                    # minSize=(30, 30)
            )

            # Draw rectangle around the faces and crop the faces
            faces_arr = []
            for (x, y, w, h) in faces:
                cv2.rectangle(img, (x, y), (x+w, y+h), (255, 0, 0), 2)
                cropped = img[y:y + h, x:x + w]
                faces_arr.append(cropped)
            
            # Pre-processing image to feed into model
            new_img = cv2.resize(faces_arr[0], (48, 48))
            new_img = new_img.reshape(-1, 48, 48, 1)

            # Making facial expression prediction
            model = load_model('../cnn_model/facial_emotion_recognition.h5')
            pred = model.predict(new_img)
            print("THE PREDICTION IS.........",CATEGORIES[np.argmax(pred)])
            return CATEGORIES[np.argmax(pred)]
            
                # cv2.imwrite('face.jpg', faces)
            # np.save('image', img_np)
            
            # with open('image.png', 'wb') as f:
                # f.write(img_str)
            

        return render_template('MusicPie.html')

    @app.route('/rateArtists', methods=['GET', 'POST'])
    def rateArtists():
        return "<h1>Rate Artists</h1>"

    @app.route('/rateSongs', methods=['GET', 'POST'])
    def rateSongs():
        return "<h1>Rate Songs</h1>"


    if __name__ == "__main__":
        app.run(debug=True)
