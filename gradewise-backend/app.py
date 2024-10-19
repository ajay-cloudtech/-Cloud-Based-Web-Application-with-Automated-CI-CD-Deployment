from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_pymongo import PyMongo
from bson.objectid import ObjectId
import os
from dotenv import load_dotenv  # Import dotenv

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__)

# CORS setup: Allow requests from your frontend
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})

# Use the MongoDB URI from the .env file
app.config["MONGO_URI"] = os.getenv("MONGO_URI")
mongo = PyMongo(app)

@app.route('/')
def home():
    return "<h1>Welcome to the GradeWise API</h1><p>Use the /api/students endpoint to add a student.</p>"

@app.route('/api/students', methods=['POST'])
def add_student():
    data = request.json
    if not data:
        return jsonify({'error': 'No data provided'}), 400
    
    # Validate required fields (optional but recommended)
    required_fields = ['firstName', 'lastName', 'courseName', 'semesterName', 'yearNumber', 'grade']
    for field in required_fields:
        if field not in data:
            return jsonify({'error': f'Missing required field: {field}'}), 400
    
    mongo.db.grades.insert_one(data)
    return jsonify({'message': 'Student added successfully'}), 201

@app.route('/api/students', methods=['GET'])
def get_students():  # Changed function name to plural for consistency
    students = mongo.db.grades.find()
    student_list = []
    for student in students:
        student['_id'] = str(student['_id'])  # Convert ObjectId to string
        student_list.append(student)
    return jsonify(student_list), 200

@app.route('/api/students/<id>', methods=['DELETE'])
def delete_student(id):
    try:
        object_id = ObjectId(id)
    except Exception:
        return jsonify({"error": "Invalid student ID format."}), 400
    
    result = mongo.db.grades.delete_one({'_id': object_id})
    if result.deleted_count > 0:
        return jsonify({"message": "Student deleted successfully"}), 200
    
    return jsonify({"error": "Student not found"}), 404

@app.route('/api/students/<id>', methods=['PUT'])
def update_student(id):
    data = request.json
    if not data:
        return jsonify({'error': 'No data provided'}), 400
    
    # Validate required fields
    required_fields = ['firstName', 'lastName', 'courseName', 'semesterName', 'yearNumber', 'grade']
    for field in required_fields:
        if field not in data:
            return jsonify({'error': f'Missing required field: {field}'}), 400
    
    try:
        object_id = ObjectId(id)
    except Exception:
        return jsonify({"error": "Invalid student ID format."}), 400
    
    result = mongo.db.grades.update_one({'_id': object_id}, {'$set': data})
    if result.modified_count > 0:
        return jsonify({"message": "Student updated successfully"}), 200
    
    return jsonify({"error": "Student not found or no changes made"}), 404

# OPTIONS handling is usually not necessary with Flask-CORS, but it's kept if you want to customize it.
@app.route('/api/students/<id>', methods=['OPTIONS'])
def handle_options(id):
    response = jsonify()
    response.headers.add('Access-Control-Allow-Origin', 'http://localhost:3000')  # Match frontend URL
    response.headers.add('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
    return response, 204  # Respond with no content

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000,debug=True)
