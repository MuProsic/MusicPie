import cv2
import base64
import numpy as np
import sqlite3
from sqlite3 import Error
import tensorflow as tf
import json
from tensorflow.keras.models import load_model
from flask import render_template, redirect, Flask, request, url_for
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
CATEGORIES = ['Angry', 'Disgust', 'Fear', 'Happy', 'Neutral', 'Sad', 'Surprise']

with app.app_context():
    @app.route('/', methods=['GET', 'POST'])
    def home():
        return render_template("home.html")

    @app.route('/getRecommendations', methods=['GET', 'POST'])
    def getRecs():
        if request.method == 'POST' and not request.is_json:
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
            cv2.imwrite('face.jpg', faces_arr[0])

            # encoded_face = base64.b64encode(np.ascontiguousarray(faces_arr[0])).decode('utf-8')
            encoded_face = base64.b64encode(open('./face.jpg', 'rb').read()).decode('utf-8')
            response_data = {}
            response_data['prediction'] = CATEGORIES[np.argmax(pred)]
            response_data['image'] = encoded_face
            
            # np.save('image', img_np)
            
            # with open('image.png', 'wb') as f:
                # f.write(img_str)

            # print(response_data)
            return json.dumps(response_data)
            

        #FIX ME: Figure out how to request a query           
        elif request.method == 'POST' and request.is_json:
            data = request.get_json()
            conn = None
            c = None
            db = r'../tpch.sqlite'
            try:
                conn = sqlite3.connect(db)
                c = conn.cursor()
            except Error as e:
                print(e)
            
            if not data['with_artist_name'] and not data['with_energy']:
                # execute query with only facial expression recognition
                print("execute query with only facial expression recognition")
                sql = """SELECT s_artist, s_name, g_mood, s_energy
                        FROM Songs, Genre
                        WHERE s_genre = g_name AND
                        g_mood = ?;"""
                c.execute(sql, [data['mood']])
                rows = c.fetchall()
                # result = {}

                return rows
                
                
            elif not data['with_artist_name'] and data['with_energy']:
                # execute query with mood and energy
                print("execute query with mood and energy")
                sql = """SELECT s_artist, s_name, g_mood, s_energy
                        FROM Songs, Genre
                        WHERE s_genre = g_name 
                            AND g_mood = ?
                            AND s_energy >= ? ;"""
                c.execute(sql, [data['mood'], data['energy']])
                rows = c.fetchall()
                return rows
                
            elif  data['with_artist_name'] and not data['with_energy']:
                # execute query with mood and artist
                print("execute query with mood and artist")
                sql = """SELECT s_artist, s_name, g_mood, s_energy
                        FROM Songs, Genre
                        WHERE s_genre = g_name 
                            AND g_mood = ?
                            AND s_artist like "%?%" ;"""
                c.execute(sql, [data['mood'], data['artist']])
                rows = c.fetchall()
                return rows

            else:
                # execute query with mood, energy and artist name
                print("execute query with mood, energy and artist name")
                sql = """SELECT s_artist, s_name, g_mood, s_energy
                        FROM Songs, Genre
                        WHERE s_genre = g_name 
                            AND g_mood = ?
                            AND s_energy >= ?
                            AND s_artist like "%?%" ;"""
                c.execute(sql, [data['mood'], data['energy'], data['artist']])
                rows = c.fetchall()
                return rows
            # print(data)

            return json.dumps({})



        return render_template('MusicPie.html')

    @app.route('/rateArtists', methods=['GET', 'POST'])
    def rateArtists():
        return "<h1>Rate Artists</h1>"

    @app.route('/rateSongs', methods=['GET', 'POST'])
    def rateSongs():
        return "<h1>Rate Songs</h1>"


    if __name__ == "__main__":
        app.run(debug=True)
