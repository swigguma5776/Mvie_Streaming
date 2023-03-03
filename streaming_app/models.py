from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from datetime import datetime 
import uuid 


db = SQLAlchemy()
ma = Marshmallow()


class Show(db.Model):
    watch_id = db.Column(db.String, primary_key = True)
    title = db.Column(db.String(150))
    type_ = db.Column(db.String(150))
    poster_image = db.Column(db.String(150))
    genre = db.Column(db.String(150))
    summary = db.Column(db.String)
    rating = db.Column(db.String(150))
    streaming = db.Column(db.String(150))
    have_watched = db.Column(db.Boolean, default=False)
    review_score = db.Column(db.Numeric(precision=10, scale=2), nullable=True)
    review = db.Column(db.String, nullable=True)
    date_added = db.Column(db.DateTime,default = datetime.utcnow)
    user_id = db.Column(db.String)
    show_cast = db.relationship('ShowCast', backref = 'show', lazy = True)



    def __init__(self, title, type_, poster_image, genre, summary, rating, streaming, review_score = None, review = '', have_watched = False, user_id = '', watch_id = ''):
        self.watch_id = self.set_id()
        self.title = title
        self.type_ = type_
        self.poster_image = poster_image
        self.genre = genre
        self.summary = summary
        self.rating = rating
        self.streaming = streaming
        self.have_watched = have_watched
        self.review_score = review_score
        self.review = review
        self.user_id = user_id

    def set_id(self):
        return str(uuid.uuid4())

    def __repr__(self):
        return f"Show {self.title} has been added to the database!"


class ShowCast(db.Model):
    moviecast_id = db.Column(db.String, primary_key = True)
    character_name = db.Column(db.String(150))
    watch_id = db.Column(db.String, db.ForeignKey('show.watch_id'), nullable = False)
    cast_id = db.Column(db.String, db.ForeignKey('cast.cast_id'), nullable = False)


    def __init__(self, character_name, watch_id, cast_id, moviecast_id = ''):
        self.moviecast_id = self.set_id()
        self.character_name = character_name
        self.watch_id = watch_id
        self.cast_id = cast_id

    def set_id(self):
        return str(uuid.uuid4())

    def __repr__(self):
        return f"Your movie relationship {self.moviecast_id} has been added to the database!"


class Cast(db.Model):
    cast_id = db.Column(db.String, primary_key = True)
    first_name = db.Column(db.String(150))
    last_name = db.Column(db.String(150))
    cast_image = db.Column(db.String(150))
    bio_link = db.Column(db.String(150))
    show_cast = db.relationship('ShowCast', backref = 'cast', lazy = True)

    def __init__(self, first_name, last_name, cast_image, bio_link, cast_id = ''):
        self.cast_id = self.set_id()
        self.first_name = first_name
        self.last_name = last_name
        self.cast_image = cast_image
        self.bio_link = bio_link 

    def set_id(self):
        return str(uuid.uuid4())

    def __repr__(self):
        return f"{self.first_name.title(), self.last_name.title()} has been added to the database!"


class Hub(db.Model):
    watch_id = db.Column(db.String, primary_key = True)
    title = db.Column(db.String(150))
    type = db.Column(db.String(150))
    poster_image = db.Column(db.String(150))
    genre = db.Column(db.String(150))
    summary = db.Column(db.String)
    rating = db.Column(db.String(150))
    streaming = db.Column(db.String(150))
    have_watched = db.Column(db.String, default=False)
    review_score = db.Column(db.String, nullable=True)
    review = db.Column(db.String, nullable=True)
    how_many_reviews = db.Column(db.Numeric(precision=1, scale=0), nullable=True)
    date_added = db.Column(db.DateTime,default = datetime.utcnow)
    user_id = db.Column(db.String)
    # show_cast = db.relationship('ShowCast', backref = 'hub', lazy = True)



    def __init__(self, watch_id, title, type, poster_image, genre, summary, rating, streaming, review_score = None, review = '', how_many_reviews = None, have_watched = False, user_id = ''):
        self.watch_id = self.set_id(watch_id)
        self.title = title
        self.type = type
        self.poster_image = poster_image
        self.genre = genre
        self.summary = summary
        self.rating = rating
        self.streaming = streaming
        self.have_watched = have_watched
        self.review_score = review_score
        self.review = review
        self.how_many_reviews = how_many_reviews
        self.user_id = user_id

    def set_id(self,id):
        return f"HUB{id}"

    def __repr__(self):
        return f"Show {self.title} has been added to the HUB database!"
    


# Create API Schemas via Marshmallow Object
class ShowSchema(ma.Schema):
    class Meta:
        fields = ['watch_id', 'title', 'type_', 'poster_image', 'genre', 'summary', 'rating', 
                  'streaming', 'have_watched', 'review_score', 'review', 'how_many_reviews', 'user_id']
        
class CastSchema(ma.Schema):
    class Meta:
        fields = ['cast_id', 'first_name', 'last_name', 'cast_image', 'bio_link']


show_schema = ShowSchema()
shows_schema = ShowSchema(many = True)


cast_schema = CastSchema()
casts_schema = CastSchema(many = True)


    
   
        