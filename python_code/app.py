from flask import Flask, render_template, request
from .stack import Stack, Node

app = Flask(__name__)
back_stack = Stack()
front_stack = Stack()

@app.route('/')
def main():
    return render_template("index.html")

@app.route('/insert', methods = ['POST'])
def insert_last():
    if request.method == 'POST':
        result = request.form
        print('insert', result)
        back_stack.push(result["value"])
        print(back_stack.print_stack())

    return render_template("index.html")

@app.route('/delete', methods = ['POST'])
def delete_first():
    if request.method == 'POST':
        print('delete-first!')
        front_stack.pop()
        print(front_stack.print_stack())

    return render_template("index.html")