from flask import Flask, render_template, request, redirect, url_for, session, flash
from werkzeug.security import generate_password_hash, check_password_hash
from pymongo import MongoClient
from bson.objectid import ObjectId
import os

app = Flask(__name__)
app.secret_key = os.urandom(24)

# MongoDB Connection
client = MongoClient('mongodb://localhost:27017/')
db = client['institution_tracker']
users_collection = db['users']
institutions_collection = db['institutions']

REQUIRED_DOCS = ['affiliation_letter', 'accreditation', 'staff_list', 'infrastructure_report']

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        name = request.form.get('name')
        email = request.form.get('email')
        password = request.form.get('password')
        
        if users_collection.find_one({'email': email}):
            flash('Email already registered!', 'danger')
            return redirect(url_for('register'))
        
        hashed = generate_password_hash(password)
        users_collection.insert_one({'name': name, 'email': email, 'password': hashed})
        flash('Registration successful! Please login.', 'success')
        return redirect(url_for('login'))
    
    return render_template('register.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form.get('email')
        password = request.form.get('password')
        
        user = users_collection.find_one({'email': email})
        if user and check_password_hash(user['password'], password):
            session['user_id'] = str(user['_id'])
            session['user_name'] = user['name']
            flash('Login successful!', 'success')
            return redirect(url_for('dashboard'))
        
        flash('Invalid credentials!', 'danger')
    
    return render_template('login.html')

@app.route('/logout')
def logout():
    session.clear()
    flash('Logged out successfully!', 'success')
    return redirect(url_for('index'))

@app.route('/dashboard')
def dashboard():
    if 'user_id' not in session:
        flash('Please login first!', 'warning')
        return redirect(url_for('login'))
    
    institutions = list(institutions_collection.find({'user_id': session['user_id']}))
    return render_template('dashboard.html', institutions=institutions)

@app.route('/institution/new', methods=['GET', 'POST'])
def new_institution():
    if 'user_id' not in session:
        flash('Please login first!', 'warning')
        return redirect(url_for('login'))
    
    if request.method == 'POST':
        name = request.form.get('name')
        address = request.form.get('address')
        provided_docs = request.form.getlist('required_docs')
        metrics_raw = request.form.get('metrics', '')
        
        metrics = {}
        if metrics_raw:
            for pair in metrics_raw.split(','):
                if ':' in pair:
                    k, v = pair.split(':', 1)
                    try:
                        metrics[k.strip()] = float(v.strip())
                    except:
                        metrics[k.strip()] = v.strip()
        
        institution = {
            'user_id': session['user_id'],
            'name': name,
            'address': address,
            'provided_docs': provided_docs,
            'metrics': metrics
        }
        
        institutions_collection.insert_one(institution)
        flash('Institution added successfully!', 'success')
        return redirect(url_for('dashboard'))
    
    return render_template('new_institution.html')

@app.route('/institution/<id>/report')
def institution_report(id):
    if 'user_id' not in session:
        flash('Please login first!', 'warning')
        return redirect(url_for('login'))
    
    institution = institutions_collection.find_one({'_id': ObjectId(id), 'user_id': session['user_id']})
    if not institution:
        flash('Institution not found!', 'danger')
        return redirect(url_for('dashboard'))
    
    provided = institution.get('provided_docs', [])
    missing = [d for d in REQUIRED_DOCS if d not in provided]
    percentage = round((len(provided) / len(REQUIRED_DOCS)) * 100, 2)
    
    sufficiency = {
        'present': len(provided),
        'missing': len(missing),
        'percentage': percentage
    }
    
    metrics = institution.get('metrics', {})
    score = 0
    if 'placement_rate' in metrics:
        score += metrics['placement_rate'] * 0.4
    if 'graduation_rate' in metrics:
        score += metrics['graduation_rate'] * 0.3
    if 'research_publications' in metrics:
        score += min(metrics['research_publications'] * 3, 30)
    
    perf_score = round(score, 2)
    
    return render_template('institution_report.html', 
                         institution=institution, 
                         sufficiency=sufficiency, 
                         perf_score=perf_score)

if __name__ == '__main__':
    app.run(debug=True)