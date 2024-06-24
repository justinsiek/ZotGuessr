from flask import Flask, jsonify, request
from flask_cors import CORS
import psycopg2

app = Flask(__name__)
CORS(app)

DB_NAME = 'postgres'
DB_USER = 'write_user'
DB_PASSWORD = 'password'
DB_HOST = 'localhost'
DB_PORT = '5432'

@app.route('/api/double', methods=['GET'])
def double_number():
    number_str = request.args.get('number', default='0', type=str)

    number = int(number_str)
    doubled_number = number * 2

    conn = psycopg2.connect(dbname=DB_NAME, user=DB_USER, password=DB_PASSWORD, host=DB_HOST, port=DB_PORT)
    cursor = conn.cursor()
    cursor.execute(f'INSERT INTO project_starter.projectstarter (original, doubled) values ({number}, {doubled_number})')

    conn.commit()
    cursor.close()
    conn.close()


    return jsonify({'result': doubled_number})

if __name__ == '__main__':
    app.run(debug=True, port=8080)