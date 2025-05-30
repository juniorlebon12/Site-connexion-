from flask import Flask, render_template, request, redirect, url_for, session

app = Flask(__name__)
app.secret_key = 'votre_cle_secrete'

# Compte fictif pour test
USER = {'username': 'Thomas Rousseau', 'password': '12345'}

@app.route('/')
def home():
    if 'username' in session:
        return redirect(url_for('dashboard'))
    return redirect(url_for('login'))

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['email']
        password = request.form['password']
        if username == USER['username'] and password == USER['password']:
            session['username'] = username
            return redirect(url_for('dashboard'))
        else:
            return 'Identifiants incorrects, essayez encore !'
    return render_template('index.html')

@app.route('/dashboard')
def dashboard():
    if 'username' in session:
        return render_template('dashboard.html', username=session['username'])
    return redirect(url_for('login'))

@app.route('/virement', methods=['POST'])
def virement():
    receiver = request.form['receiver']
    amount = request.form['amount']
    # Logique de virement ici
    return f"Virement de {amount}€ effectué vers {receiver}."

@app.route('/logout')
def logout():
    session.pop('username', None)
    return redirect(url_for('login'))

if __name__ == '__main__':
    app.run(debug=True)
