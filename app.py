from flask import Flask, render_template, jsonify, request
from python.arrays import generate_array_question, check_answer
from python.searching import generate_search_question, check_search_answer
from python.sorting import generate_sorting_demo
from python.dungeon import generate_dungeon
from python.boss import boss_stats

app = Flask(__name__)


@app.route("/")
def index():
    return render_template("menu.html")


@app.route("/levels")
def levels():
    return render_template("levels.html")


@app.route("/game/<int:level>")
def game(level):
    level = max(1, min(4, level))
    return render_template("game.html", level=level)


@app.route("/loading")
def loading():
    return render_template("loading.html")


@app.route("/api/dungeon/<int:level>")
def dungeon_api(level):
    """Procedural dungeon built with DFS + BFS (DSA)."""
    level = max(1, min(4, level))
    data = generate_dungeon(level=level)
    return jsonify(data)


@app.route("/api/boss")
def boss_api():
    return jsonify(boss_stats())


# ---- Legacy quiz APIs kept for compat (game no longer requires them) ----
@app.route("/api/puzzle")
def puzzle():
    return jsonify(generate_array_question())


@app.route("/api/searching")
def searching():
    enemy = request.args.get("enemy", "slime")
    return jsonify(generate_search_question(enemy))


@app.route("/api/sorting")
def sorting():
    return jsonify(generate_sorting_demo())


@app.route("/api/check", methods=["POST"])
def check():
    data = request.get_json(force=True, silent=True) or {}
    selected = data.get("selected")
    level = int(data.get("level", 1) or 1)
    if level == 1:
        correct = check_answer(selected)
    elif level == 2:
        correct = check_search_answer(selected)
    else:
        # stateless fallback: no global current_level race
        correct = False
    return jsonify({"correct": bool(correct)})


if __name__ == "__main__":
    # 0.0.0.0 so Windows browser can reach WSL server
    app.run(debug=True, host="0.0.0.0", port=8000)
