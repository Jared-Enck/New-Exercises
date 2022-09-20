from flask import Flask, render_template, request
from stories import *

app = Flask(__name__)

@app.route('/')
def questions():
    """Create questions form"""

    prompts = story.prompts
    return render_template("questions.html", prompts=prompts)

@app.route('/story')
def show_story():
    """Show story text"""

    text = story.generate(request.args)

    return render_template("story.html", text=text)