from flask import Flask, request, jsonify
from flask_cors import CORS
from ChordGenerator import GenerateChordPogression

#Builds Flask app and enables CORS to allow cross-origin requests
app = Flask(__name__)
CORS(app)

@app.route("/generate", methods=["POST"])
def generate():
    data = request.get_json()

    num = data.get("numChords", 4)
    key_note = data.get("key", "C")
    mode = data.get("mode", "major")
    spicy = data.get("spicy", False)

    #Spicy determins the number of notes. If it is true, it should be 4, otherwise 3.
    num_notes = 4 if spicy else 3

    _, chordList, romanDegrees = GenerateChordPogression(num, key_note, mode, num_notes)

    response = {
        "chordList": chordList,
        "romanDegrees": romanDegrees
    }

    return jsonify(response)

if __name__ == "__main__":
    app.run(debug=True)