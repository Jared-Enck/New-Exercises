from flask import Flask, request, render_template, redirect, session, flash
# from flask_debugtoolbar import DebugToolbarExtension
from surveys import *

RESPONSES_KEY = "responses"
app = Flask(__name__)

# app.debug = True
app.config['SECRET_KEY'] = 'supersecretkeyhere4242'

# toolbar = DebugToolbarExtension(app)

@app.route('/')
def survey_page():
    """Creates and shows survey"""
    title = satisfaction_survey.title
    instructions = satisfaction_survey.instructions
    return render_template('survey.html', title=title, instructions=instructions)

@app.route('/begin', methods=['POST'])
def question_handler():
    """"""
    session[RESPONSES_KEY] = []

    return redirect('/questions/0')

@app.route("/answer", methods=["POST"])
def handle_question():
    """Save response and redirect to next question."""

    # get the response choice
    choice = request.form['answer']

    # add this response to the session
    responses = session[RESPONSES_KEY]
    responses.append(choice)
    session[RESPONSES_KEY] = responses

    if (len(responses) == len(satisfaction_survey.questions)):
        # They've answered all the questions! Thank them.
        return redirect("/complete")

    else:
        return redirect(f"/questions/{len(responses)}")

@app.route('/questions/<int:qid>')
def question_page(qid):
    """Shows question"""
    responses = session.get(RESPONSES_KEY)

    if (responses is None):
        # trying to access question page too soon
        return redirect("/")

    if (len(responses) == len(satisfaction_survey.questions)):
        # They've answered all the questions! Thank them.
        return redirect("/complete")

    if (len(responses) != qid):
        # Trying to access questions out of order.
        flash(f"Invalid question id: {qid}.")
        return redirect(f"/questions/{len(responses)}")
    question = satisfaction_survey.questions[qid]
    return render_template('questions.html', question_num=qid, question=question)

@app.route("/complete")
def complete():
    """Survey complete. Show completion page."""

    return render_template("completion.html")

