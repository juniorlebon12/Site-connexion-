from flask import Flask, render_template, request, redirect, url_for, session
import os

app = Flask(__name__)
app.secret_key = "bnp_secret_key"

# Informations fictives pour la connexion
USER_DATA = {
    "numero_compte": "123456789",
    "mot_de_passe": "admin123",
    "nom": "Thomas Rousseau",
    "solde": "12 580 €"
}

@app.route('/')
def home():
    return redirect(url_for('login'))

@app.route('/login', methods=['GET', 'POST'])
def login():
    erreur = ""
    if request.method == 'POST':
        compte = request.form['compte']
        mot_de_passe = request.form['mot_de_passe']
        if compte == USER_DATA["numero_compte"] and mot_de_passe == USER_DATA["mot_de_passe"]:
            session['nom'] = USER_DATA["nom"]
            session['solde'] = USER_DATA["solde"]
            return redirect(url_for('dashboard'))
        else:
            erreur = "Identifiants incorrects. Veuillez réessayer."
    return render_template('login.html', erreur=erreur)

@app.route('/dashboard')
def dashboard():
    if 'nom' in session:
        return render_template('dashboard.html', nom=session['nom'], solde=session['solde'])
    return redirect(url_for('login'))

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 10000))
    app.run(host='0.0.0.0', port=port)
