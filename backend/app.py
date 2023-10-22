from flask import Flask, request, jsonify
import os
import psycopg2

app = Flask(__name__)

def create_connection():
    try:
        connection = psycopg2.connect(os.environ.get('POSTGRES_URL'))
        return connection
    except psycopg2.Error as error:
        return error

@app.route('/', methods=['GET'])
def get_stats():
    connection = create_connection()
    if isinstance(connection, psycopg2.Error):
        return "Database connection error"

    with connection.cursor() as cursor:
        cursor.execute('SELECT * FROM data')
        data = cursor.fetchall()

    if data:
        return jsonify(data)
    return "No data found"

@app.route('/update', methods=['PUT'])
def update_stats():
    if not request.is_json:
        return jsonify({"message": "Invalid data format"})

    recycling = request.json.get('recycling', None)
    if recycling is None:
        return jsonify({"message": "Recycling type is required"})

    connection = create_connection()
    if isinstance(connection, psycopg2.Error):
        return "Database connection error"

    with connection.cursor() as cursor:
        cursor.execute("UPDATE data SET count = count + 1 WHERE recycling = %s", (recycling,))
        connection.commit()

    return "Count updated successfully"

if __name__ == '__main__':
    app.run()
