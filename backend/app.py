from flask import Flask, request, jsonify
from flask_cors import CORS
from domain_checker import check_domain

app = Flask(__name__)
CORS(app, origins="*")

@app.after_request
def add_headers(response):
    response.headers['Access-Control-Allow-Private-Network'] = 'true'
    return response

from domain_checker import check_domain

@app.route('/analyze', methods=['POST'])
def analyze():
    data = request.get_json()
    url = data.get('url', '')

    if not url:
        return jsonify({'error': 'URL이 없습니다'}), 400

    result = check_domain(url)
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True, port=5001)