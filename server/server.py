from flask import Flask, jsonify, request
from flask_cors import CORS
from math import sqrt
import random


app = Flask(__name__)
CORS(app)

locations = [["/assets/two.jpg", (612, 184)], 
["/assets/three.jpg", (612, 184)], ["/assets/four.jpg", (612, 184)], ["/assets/five.jpg", (612, 184)], ["/assets/six.jpg", (612, 184)],
["/assets/seven.jpg", (612, 184)], ["/assets/eight.jpg", (612, 184)], ["/assets/nine.jpg", (612, 184)], ["/assets/ten.jpg", (612, 184)],
["/assets/eleven.jpg", (612, 184)], ["/assets/twelve.jpg", (612, 184)], ["/assets/thirteen.jpg", (612, 184)], ["/assets/fourteen.jpg", (612, 184)],
["/assets/fifteen.jpg", (612, 184)], ["/assets/sixteen.jpg", (612, 184)], ["/assets/seventeen.jpg", (612, 184)], ["/assets/eighteen.jpg", (612, 184)],
["/assets/nineteen.jpg", (612, 184)], ["/assets/twenty.jpg", (612, 184)], ["/assets/twentyone.jpg", (612, 184)], ["/assets/twentytwo.jpg", (612, 184)]]

# get the distance
# 1250-distance
locationFileName ="/assets/ucibplaza.jpg"
locationPosition = (819, 251)

locationFileNames = []
locationPositions = []

@app.route('/api/play', methods =['GET'])
def play():
    locationFileName, locationPosition = random.choice(locations)

    print("random choice")
    print("locationFileName", locationFileName)
    print("locationPosition", locationPosition)
    return jsonify({"locationFileName": locationFileName, "locationPosition": locationPosition})


@app.route('/api/submit', methods=['GET'])
def submit():
    location = request.args.get('loc', default='0', type=str)
    locx, locy = location.split(',')
    print("locx", locx)
    print("locy", locy)
    locx = float(locx)
    locy = float(locy)
    distance = sqrt((locationPosition[0]-locx)**2 +(locationPosition[1]-locy)**2)
    score = max(0, (1236 - (distance ** 1.1)))
    print("score", score)
    return jsonify({"score": score})

    # max size is 633, 1035

if __name__ == '__main__':
    app.run(debug=True, port=8080)