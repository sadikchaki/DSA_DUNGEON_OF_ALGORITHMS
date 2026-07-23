import random

current_answer = None

ghost_lines = [
    "👻 Ghost whispers...\nFind the lost soul",
    "👻 The spirit cries...\nSearch for",
    "👻 The haunted number is"
]

skeleton_lines = [
    "💀 Skeleton laughs...\nFind my hidden key",
    "💀 Bones rattle...\nChoose",
    "💀 Find the cursed number"
]

golem_lines = [
    "🪨 Ancient Golem\nOnly the worthy may pass.\nLocate",
    "🪨 Stone Guardian\nFind the sacred rune",
    "🪨 The earth trembles...\nSearch for"
]

slime_lines = [
    "🟢 Hungry Slime\nFeed me",
    "🟢 Tiny Slime\nFind",
    "🟢 Slime jumps around...\nChoose"
]


def generate_search_question(enemy="slime"):

    global current_answer

    numbers = random.sample(range(1, 51), 4)
    numbers.sort()

    target = random.choice(numbers)

    current_answer = str(target)

    if enemy == "ghost":
        title = random.choice(ghost_lines)

    elif enemy == "skeleton":
        title = random.choice(skeleton_lines)

    elif enemy == "golem":
        title = random.choice(golem_lines)

    else:
        title = random.choice(slime_lines)

    return {

        "topic": title,

        "question": str(target),

        "array": [str(x) for x in numbers]

    }


def check_search_answer(user):

    global current_answer

    return str(user) == current_answer