from flask import Flask, render_template, jsonify, request
from python.arrays import generate_array_question, check_answer
from python.searching import generate_search_question, check_search_answer

app = Flask(__name__)
current_level = 1


@app.route("/")
def index():
    return render_template("menu.html")

@app.route("/levels")
def levels():
    return render_template("levels.html")

@app.route("/game/<int:level>")
def game(level):

    global current_level

    current_level = level

    return render_template("game.html", level=level)

@app.route("/api/puzzle")
def puzzle():
    return jsonify(generate_array_question())


@app.route("/api/check", methods=["POST"])
def check():

    global current_level

    data = request.get_json()

    selected = data["selected"]

    if current_level == 1:

        correct = check_answer(selected)

    elif current_level == 2:

        correct = check_search_answer(selected)

    else:

        correct = False

    return jsonify({
        "correct": correct
    })

@app.route("/loading")
def loading():
    return render_template("loading.html")

@app.route("/api/searching")
def searching():

    enemy = request.args.get("enemy", "slime")

    return jsonify(generate_search_question(enemy))


if __name__ == "__main__":
    app.run(debug=True, host="127.0.0.1", port=8000)