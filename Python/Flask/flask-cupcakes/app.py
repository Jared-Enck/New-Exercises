"""Flask app for Cupcakes"""
from crypt import methods
from urllib import response
from flask_cors import CORS
from flask import Flask, redirect, render_template, request, flash, jsonify
from flask_debugtoolbar import DebugToolbarExtension
from models import Cupcake, db, connect_db
from forms import CupcakeForm

app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///cupcakes'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True
app.config['SECRET_KEY'] = 'chickensrdumb4242'
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
toolbar = DebugToolbarExtension(app)

connect_db(app)

@app.route('/')
def show_hompage():
    """Shows homepage"""
    
    form = CupcakeForm()
    
    return render_template('index.html', form=form)

@app.route('/api/cupcakes')
def show_cupcakes():
    """Shows all cupcakes"""
    
    cupcakes = Cupcake.query.all()
    serialized = [c.serialize() for c in cupcakes]
    
    return jsonify(cupcakes=serialized)

@app.route('/api/cupcakes/<int:cupcake_id>')
def info_cupcake(cupcake_id):
    """Show info about specific cupcake"""

    cupcake = Cupcake.query.get_or_404(cupcake_id)
    
    serialized = cupcake.serialize()
    
    return jsonify(cupcake=serialized)

@app.route('/api/cupcakes', methods=['POST'])
def add_cupcake():
    """Create cupcake and add to db"""
    
    data = request.json
    
    cupcake = Cupcake(
        flavor=data['flavor'],
        rating=data['rating'],
        size=data['size'],
        image=data['image'] or None
    )
    
    db.session.add(cupcake)
    db.session.commit()
    
    flash(f'Added {cupcake.flavor} cupcake.', 'success')
    serialized = cupcake.serialize()
    
    return (jsonify(cupcake=serialized), 201)

@app.route('/api/cupcakes/<int:cupcake_id>', methods=['PATCH'])
def update_cupcake(cupcake_id):
    """Update cupcake info"""

    data = request.json
    
    cupcake = Cupcake.query.get_or_404(cupcake_id)
    
    cupcake.flavor = data['flavor']
    cupcake.rating = data['rating']
    cupcake.size = data['size']
    cupcake.image = data['image']

    db.session.commit()
    
    serialized = cupcake.serialize()    
    
    return jsonify(cupcake=serialized)

@app.route("/api/cupcakes/<int:cupcake_id>", methods=["DELETE"])
def delete_cupcake(cupcake_id):
    """Deletes cupcake and returns deleted cupcake message."""

    cupcake = Cupcake.query.get_or_404(cupcake_id)

    db.session.delete(cupcake)
    db.session.commit()

    return jsonify(message=f"Deleted cupcake {cupcake.flavor}.")