from flask import Flask, jsonify, request
from flask_cors import CORS
from math import sqrt
import random
import psycopg2

DB_NAME = 'postgres'
DB_USER = 'write_user'
DB_PASSWORD = 'password'
DB_HOST = 'localhost'
DB_PORT = '5432'

app = Flask(__name__)
CORS(app)

locations = [["/assets/two.jpg", (514, 545)], 
["/assets/three.jpg", (375, 497)], ["/assets/four.jpg", (305, 412)], ["/assets/five.jpg", (222, 364)], ["/assets/six.jpg", (153, 391)],
["/assets/seven.jpg", (169, 339)], ["/assets/eight.jpg", (533, 233)], ["/assets/nine.jpg", (505, 362)], ["/assets/ten.jpg", (319, 336)],
["/assets/eleven.jpg", (416, 560)], ["/assets/twelve.jpg", (459, 547)], ["/assets/thirteen.jpg", (558, 547)], ["/assets/fourteen.jpg", (269, 323)],
["/assets/fifteen.jpg", (385, 314)], ["/assets/sixteen.jpg", (500, 377)], ["/assets/eighteen.jpg", (542, 192)],
["/assets/nineteen.jpg", (585, 123)], ["/assets/twenty.jpg", (721, 192)], ["/assets/twentyone.jpg", (763, 218)], ["/assets/twentytwo.jpg", (863, 275)]]

# get the distance
# 1250-distance
locationFileName ="/assets/two.jpg"
locationPosition = (819, 251)

locationFileNames = []
locationPositions = []

@app.route('/api/play', methods =['GET'])
def play():
    locationFileName, locationPosition = random.choice(locations)
    return jsonify({"locationFileName": locationFileName, "locationPosition": locationPosition})


@app.route('/api/submit', methods=['GET'])
def submit():
    location = request.args.get('loc', default='0', type=str)
    locx, locy = location.split(',')
    locx = float(locx)
    locy = float(locy)
    distance = sqrt((locationPosition[0]-locx)**2 +(locationPosition[1]-locy)**2)
    score = int(max(0, (1236 - (distance ** 1.15))))
    return jsonify({"score": score})

@app.route('/api/sendscore', methods=['GET'])
def upload_score():
    playerscore = request.args.get('score', default='0', type=int)
    playername = request.args.get('name', default='', type=str)
    print("score received", playerscore)

    conn = psycopg2.connect(dbname=DB_NAME, user=DB_USER, password=DB_PASSWORD, host=DB_HOST, port=DB_PORT)
    cursor = conn.cursor()
    cursor.execute('INSERT INTO zotguessr.leaderboard (name, score) VALUES (%s, %s)', (playername, playerscore))
    conn.commit() 

    cursor.execute('SELECT name, score FROM zotguessr.leaderboard ORDER BY score DESC LIMIT 5')
    rows = cursor.fetchall()

    leaderboard = []
    for row in rows:
        leaderboard.append({
            'name': row[0],
            'score': row[1]
        })

    cursor.close()
    conn.close()
    print(leaderboard)

    return jsonify({"leaderboard": leaderboard})

if __name__ == '__main__':
    app.run(debug=True, port=8080)