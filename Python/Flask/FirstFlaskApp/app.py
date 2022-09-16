from flask import Flask, request

app = Flask(__name__)

@app.route('/')
def welcome_home():
    """Root home page"""
    html = """
    <html>
        <body>
            <h1>Welcome Home!</h1>
            <p>This is the home page.</p>
            <a href="/about">About page</a>
        </body>
    </html>
    """
    return html

@app.route('/about')
def it_me():
    """About page"""
    html = """
    <html>
        <body>
            <h1>It me ya boy!</h1>
            <p>Your awesome! Thanks for stoping by!</p>
            <a href="/">Go home</a>
        </body>
    </html>
    """
    return html

@app.route('/search')
def search():
    """Search page, get args"""
    term = request.args['term']
    sort = request.args['sort']
    return f"<h1>Search results for: {term}</h1><p>Sorting by: {sort}</p>"

@app.route('/add-comment')
def add_comment_form():
    """GET request for comment form"""
    return """
        <h1>Add Comment</h1>
        <form method="POST">
            <input type="text" placeholder="Comment" name="comment"/>
            <input type="text" placeholder="Username" name="username"/>
            <button>Submit</button>
        </form>
    """

@app.route('/add-comment', methods=["POST"])
def save_comment():
    """POST req for saved comment and add html"""
    comment = request.form["comment"]
    username = request.form["username"]
    return f"""
    <h1>Saved your comment</h1>
    <ul>
        <li>Username: {username}</li>
        <li>Comment: {comment}</li>
    </ul>
    """