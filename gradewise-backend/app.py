from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_pymongo import PyMongo
from bson.objectid import ObjectId
import os

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})

app.config["MONGO_URI"] = "mongodb://127.0.0.1:27017/gradewise?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.3.1"
mongo = PyMongo(app)

@app.route('/')
def home():
    return "<h1>Welcome to the GradeWise API</h1><p>Use the /api/students endpoint to add a student.</p>"

@app.route('/api/students', methods=['POST'])
def add_student():
    data = request.json  
    if not data:
        return jsonify({'error': 'No data provided'}), 400
    mongo.db.students.insert_one(data)
    return jsonify({'message': 'Student added successfully'}), 201

@app.route('/api/students', methods=['GET'])
def get_student():
    students = mongo.db.students.find()
    student_list = []
    for student in students:
        student['_id'] = str(student['_id']) 
        student_list.append(student)
    return jsonify(student_list), 200

@app.route('/api/students/<id>', methods=['DELETE'])
def delete_student(id):
    try:
        object_id = ObjectId(id)
    except Exception as e:
        return jsonify({"error": "Invalid student ID format."}), 400
    result = mongo.db.students.delete_one({'_id': ObjectId(id)})
    if result.deleted_count > 0:
        return jsonify({"message": "Student deleted successfully"}), 200
    return jsonify({"error": "Student not found"}), 404

@app.route('/api/students/<id>', methods=['PUT'])
def update_student(id):
    data = request.json
    if not data:
        return jsonify({'error': 'No data provided'}), 400
    required_fields = ['firstName', 'lastName', 'courseName', 'semesterName', 'yearNumber', 'grade']
    for field in required_fields:
        if field not in data:
            return jsonify({'error': f'Missing required field: {field}'}), 400
    try:
        object_id = ObjectId(id)
    except Exception as e:
        return jsonify({"error": "Invalid student ID format."}), 400
    result = mongo.db.students.update_one({'_id': object_id}, {'$set': data})
    if result.modified_count > 0:
        return jsonify({"message": "Student updated successfully"}), 200
    return jsonify({"error": "Student not found or no changes made"}), 404

@app.route('/api/students/<id>', methods=['OPTIONS'])
def handle_options(id):
    response = jsonify()
    response.headers.add('Access-Control-Allow-Origin', 'http://localhost:3001')
    response.headers.add('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
    return response, 204  # Respond with no content

if __name__ == '__main__':
    app.run(debug=True)


