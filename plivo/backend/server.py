# Import flask and datetime module for showing date and time
from flask import Flask, request, jsonify
import plivo
import datetime
from flask_cors import CORS  # Import the CORS extension

app = Flask(__name__)
CORS(app)
# Your Plivo API credentials
PLIVO_AUTH_ID = 'MAOTHIODFMOWUTZMFLZS'
PLIVO_AUTH_TOKEN = 'MTEzMjI5Y2EtNTkxOS00ZDBjLWE2YjItNTM3MGYy'
client = plivo.RestClient(PLIVO_AUTH_ID, PLIVO_AUTH_TOKEN)

@app.route('/send_message', methods=['POST'])
def send_message():
    try:
        # Get the text message, from_number, and destination_number from the request
        data = request.get_json()
        TextMessage = data.get('message')
        from_number = data.get('from_number')
        destination_number = data.get('destination_number')

        # Send the SMS
        response = client.messages.create(
            src=from_number,
            dst=destination_number,
            text=TextMessage,
        )
        print(response)

        return "Message sent successfully"
    except Exception as e:
        return jsonify({"error": str(e)})

# Fixed values for answer_url and answer_method
FIXED_ANSWER_URL = 'https://s3.amazonaws.com/static.plivo.com/answer.xml'
FIXED_ANSWER_METHOD = 'GET'

@app.route('/send_call', methods=['POST'])
def send_call():
    try:
        # Get the from_number and to_number from the request
        data = request.get_json()
        from_number = data.get('from_number')
        to_number = data.get('to_number')

        # Send the call with fixed answer_url and answer_method
        response = client.calls.create(
            from_=from_number,
            to_=to_number,
            answer_url=FIXED_ANSWER_URL,
            answer_method=FIXED_ANSWER_METHOD
        )
        print(response)

        return "Call initiated successfully"
    except Exception as e:
        return jsonify({"error": str(e)})


if __name__ == '__main__':
    app.run(debug=True)
