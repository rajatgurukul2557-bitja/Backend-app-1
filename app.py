from flask import Flask, render_template, jsonify, request
import json
import os

app = Flask(__name__)

def load_questions():
    with open("questions.json") as f:
        return json.load(f)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/get-questions")
def get_questions():
    return jsonify(load_questions())

@app.route("/submit", methods=["POST"])
def submit():
    data = request.json
    questions = load_questions()

    score = 0
    for i, q in enumerate(questions):
        if i < len(data["answers"]) and q["answer"] == data["answers"][i]:
            score += 1

    return jsonify({
        "score": score,
        "total": len(questions)
    })

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(debug=True, host="0.0.0.0", port=port)