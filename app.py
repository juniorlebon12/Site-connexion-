import os
from flask import Flask, render_template, request, redirect, url_for, session

app = Flask(__name__)
app.secret_key = 'votre_cle_secrete'

# Compte fictif pour test
USER = {
    'username': 'demo_user',
    'password': '12345'
}

@app.route('/')
def home():
    if 'username' in session:
        return redirect(url_for('dashboard'))
    return redirect(url_for('login'))

@app.route('/login', methods=['GET', 'POST'])
def login():
    error = None
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        if username == USER['username'] and password == USER['password']:
            session['username'] = username
            return redirect(url_for('dashboard'))
        else:
            error = 'Identifiants incorrects'
    return render_template('login.html', error=error)

@app.route('/dashboard')
def dashboard():
    if 'username' in session:
        return render_template('dashboard.html', username=session['username'])
    return redirect(url_for('login'))

@app.route('/logout')
def logout():
    session.pop('username', None)
    return redirect(url_for('login'))

if __name__ == '__main__':
    # Assurez-vous que l'application écoute sur le bon port
    port = os.environ.get('PORT', 5000)  # Récupérer le port de l'environnement ou utiliser 5000
    app.run(host='0.0.0.0', port=port)
