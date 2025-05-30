from flask import Flask, render_template, request, redirect, url_for, session, flash

app = Flask(__name__)
app.secret_key = 'supersecretkey'  # Nécessaire pour utiliser `session` et `flash`

# Utilisateur fictif pour exemple
utilisateurs = {
    'admin': 'password123',
    'test': '1234'
}

@app.route('/')
def index():
    if 'username' in session:
        return f"Bienvenue {session['username']} ! <a href='/logout'>Se déconnecter</a>"
    return redirect(url_for('login'))

@app.route('/login', methods=['GET', 'POST'])
def login():
    erreur = None
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')

        # Vérifie si l'utilisateur existe et si le mot de passe est correct
        if username in utilisateurs and utilisateurs[username] == password:
            session['username'] = username
            flash('Connexion réussie !', 'success')
            return redirect(url_for('index'))
        else:
            erreur = "Nom d'utilisateur ou mot de passe incorrect."

    return render_template('login.html', erreur=erreur)

@app.route('/logout')
def logout():
    session.pop('username', None)
    flash('Déconnecté avec succès.', 'info')
    return redirect(url_for('login'))

if __name__ == '__main__':
    app.run(debug=True)
