from flask import Flask, jsonify
from flask_cors import CORS
import requests
import json

app = Flask(__name__)
CORS(app)  # Agregar la extensión CORS a la aplicación

url = "https://www.dolarsi.com/api/api.php?type=valoresprincipales"
response = requests.get(url)
data = json.loads(response.content)

@app.route('/precio_blue')
def enviar_precio():
    dolar_blue = None
    for moneda in data:
        if moneda['casa']['nombre'] == "Dolar Blue":
            dolar_blue = moneda['casa']['venta']
    return jsonify(dolar_blue)

if __name__ == '__main__':
    app.run()
