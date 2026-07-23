import random

current_puzzle = {}

def generate_array_question():

    global current_puzzle

    arr = random.sample(range(1,30),5)

    index = random.randint(0,4)

    current_puzzle = {
        "answer": arr[index]
    }

    return {
        "topic":"Arrays",
        "question":f"Click the value at index {index}",
        "array":arr
    }

def check_answer(selected):

    return selected == current_puzzle["answer"]