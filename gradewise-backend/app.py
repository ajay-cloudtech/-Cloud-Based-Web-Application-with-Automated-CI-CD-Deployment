from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from flask_pymongo import PyMongo
from bson.objectid import ObjectId
import os
from dotenv import load_dotenv
from flask_wtf.csrf import CSRFProtect, generate_csrf

# load varibles from .env file
load_dotenv()

# initialize flask app 
# setup static folder for react
app = Flask(__name__, static_folder='build', static_url_path='/build')

# secret key setup for CSRF
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')
csrf = CSRFProtect(app) # add CSRF protection 

# CORS setup to allow requests from frontend, origins in .env file
allowed_origins = os.getenv("ALLOWED_ORIGINS", "").split(",")
CORS(app, resources={r"/api/*": {"origins": allowed_origins}})

# Mongo configuration, URI in .env file 
app.config["MONGO_URI"] = os.getenv("MONGO_URI")
mongo = PyMongo(app)

# route to add student to the "grades" collection 
@app.route('/api/students', methods=['POST'])
def add_student():
    data = request.json
    if not data:
        return jsonify({'error': 'No data provided'}), 400
    # data validation
    required_fields = ['firstName', 'lastName', 'courseName', 'semesterName', 'yearNumber', 'grade']
    for field in required_fields:
        if field not in data:
            return jsonify({'error': f'Missing required field: {field}'}), 400 
    mongo.db.grades.insert_one(data)
    return jsonify({'message': 'Student added successfully'}), 201
csrf.exempt(add_student) # csrf expemted on this route

# route to retrieve students from the "grades" collection to display on frontend
@app.route('/api/students', methods=['GET'])
def get_students():  
    students = mongo.db.grades.find()
    student_list = []
    for student in students:
        student['_id'] = str(student['_id'])  
        student_list.append(student)
    return jsonify(student_list), 200

# route to delete student in the "grades" collection
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
csrf.exempt(delete_student) # csrf expemted on this route

# route to update student in the "grades" collection
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
csrf.exempt(update_student) # csrf expemted on this route

# route to count students based on the defined conditions for pass and fail
@app.route('/api/students/counts', methods=['GET'])
def get_student_counts():
    # pass and fail conditions based on student grade
    passed_count = mongo.db.grades.count_documents({'grade': {'$in': ['A', 'B', 'C']}})
    failed_count = mongo.db.grades.count_documents({'grade': {'$in': ['D', 'E']}})
    return jsonify({
        'students_doing_great': passed_count,
        'students_can_do_better': failed_count
    }), 200

# serve static files for react frontend
@app.route('/build/<path:path>')
def serve_static_files(path):
    return send_from_directory('build', path)
# serve for non-API paths
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve_react_app(path):
    # if the path starts with 'api/', don't serve the React app
    if path.startswith('api'):
        return jsonify({'error': 'API route not found'}), 404
    # return the React app's index.html for all other paths
    if path and os.path.exists(os.path.join(app.static_folder, path)):
        return send_from_directory(app.static_folder, path)
    return send_from_directory(app.static_folder, 'index.html')

# run app on all interfaces at port 5000
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000,debug=True)
