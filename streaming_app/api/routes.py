from flask import Blueprint, request, jsonify
from streaming_app.helpers import token_required
from streaming_app.models import Show, ShowCast, Cast, Hub, db, show_schema, shows_schema, cast_schema, casts_schema


api = Blueprint('api', __name__, url_prefix="/api")

@api.route('/', methods = ['GET'])
def test():
    return 'Test Run'

# CREATE Routes for Show & Cast Objects
    # X Things to Do CREATE
    # X 1. Grab Show details from JSON object 
    # X 2. Instantiate Show Model 
    # X 3. Grab Cast details from JSON object 
    # X 4. Instantiate Cast Model (check to see if cast member already exists in Cast db) 
    # X 5. Grab watch_id from Show model 
    # X 6. Grab ALL cast_ids from Cast models (# of cast members) 
    # X 7. Loop through cast_ids and Instantiate ShowCast model for every cast_id, 
    #    Shows can have multiple cast_ids and vice versa 

@api.route('/show', methods = ['POST'])
@token_required
def create_show(token):
    title = request.json['title']
    type_ = request.json['type_']
    poster_image = request.json['posterImage']
    genre = request.json['genre']
    summary = request.json['summary']
    rating = request.json['rating']
    streaming = request.json['streaming']
    review_score = request.json['reviewScore']
    review = request.json['review']
    have_watched = request.json['haveWatched']
    user_id = token

    print(f" {title.title()} has been added to your database!")

    show = Show(title, type_, poster_image, genre, summary, rating, streaming, review_score=review_score, 
                review=review, have_watched=have_watched, user_id = user_id)

    db.session.add(show)
    db.session.commit() 

    response = show_schema.dump(show)
    return jsonify(response)


@api.route('/cast', methods = ['POST'])
@token_required
def create_cast(token): #multiple calls will be made on frontend for multiple cast members per show
    watch_id = request.json['watchId'] #get this on frontend side after creating Show model (will be used for ShowCast Model). Will allow app to wait until it has watchID if done on frontEnd
    character_name = request.json['characterName'] #used for ShowCast Model
    first_name = request.json['firstName'] #below all for Cast Model
    last_name = request.json['lastName']
    cast_image = request.json['castImage']
    bio_link = request.json['bioLink']


    #Query into Cast model to see if Cast member already exists (since can be in a ton of other movies that may be on watchlist already)
    cast_members = Cast.query.filter_by(last_name = last_name).all()
    if cast_members:
        for cast in cast_members:
            print(cast)
            if cast.first_name == first_name:
                show_cast = ShowCast(character_name, watch_id, cast.cast_id)
                db.session.add(show_cast)
                db.session.commit()

                return (f"""Cast Member {first_name.title(), last_name.title()} already exists in 
                        the database but added to ShowCast database""")
            
    # existing_shows = ShowCast.query.filter_by(watch_id = watch_id).all()

    
    cast = Cast(first_name, last_name, cast_image, bio_link)
    cast_id = cast.cast_id
    show_cast = ShowCast(character_name, watch_id, cast_id)

    db.session.add(cast)
    db.session.add(show_cast)
    db.session.commit()

    response = cast_schema.dump(cast)
    return jsonify(response)

# READ Routes for Show & Cast Objects
    # X Things to do READ
    # X 1. Create Read Routes for Show
    # X 2. Create Read Routes for Cast
    # X 3. For every cast member (based on watch_id from ShowCast model) return Cast object (will need to .push() all cast objects to a list on front end)



@api.route('/show', methods=['GET'])
@token_required
def get_shows(token):
    shows = Show.query.filter_by(user_id = token).all()
    response = shows_schema.dump(shows)
    return jsonify(response)

@api.route('/cast', methods=['GET'])
@token_required
def get_casts(token):
    watch_id = request.json['watchId'] #get this on frontend side after creating Show model (will be used for ShowCast Model). Will allow app to wait until it has watchID if done on frontEnd

    show_cast = ShowCast.query.filter_by(watch_id = watch_id).all()
    casts = []

    for sc in show_cast:
        casts.append(Cast.query.filter_by(cast_id = sc.cast_id).all()[0])

    response = casts_schema.dump(casts)
    return jsonify(response)

# UPDATE Routes for Show  Objects
    # X Things to Do UPDATE
    # X 1. Users can add/update Review. Update review & review score
    # X 2. Users can change if they've watched a movie/show or not. Update boolean
    # X 3. Check to see if it is a call for review or have_watched

@api.route('/show/<id>', methods = ['PUT', 'POST'])
@token_required
def update_show(token, id):
    show = Show.query.get(id) # grab carbon instance
    have_watched = request.json['haveWatched']
    if have_watched != None:
        show.have_watched = have_watched
    else:
        show.review = request.json['review']
        show.review_score = request.json['reviewScore']

    db.session.commit()
    response = show_schema.dump(show)
    return jsonify(response)


# DELETE Routes for Show Objects (Keep Cast). Should this be archived instead of deleted? 
    # X Things to do DELETE
    # X 1. Create Delete Route for Show model 
    # X 2. Delete Show from Show Model & ShowCast Model 


@api.route('/show/<id>', methods = ['DELETE'])
@token_required
def delete_show(token, id):
    show = Show.query.get(id)
    print(show)

    hub = Hub.query.filter_by(watch_id = f"HUB{show.watch_id}").all()
    if not hub:
        show_cast = ShowCast.query.filter_by(watch_id = show.watch_id).all()
        if show_cast:
            for sc in show_cast:
                db.session.delete(sc)


    db.session.delete(show)
    db.session.commit()

    response = show_schema.dump(show)
    return jsonify(response)

# THE HUB (CREATE, READ, UPDATE, DELETE)

# CREATE Routes for HUB
    # Things to do CREATE HUB
    # X 1. Grab watch_id from Show Model
    # X 2. Instantiate Hub Model based on Show Model attributes
    # 3. ShowCast & Cast will still be connected to HUB because id is the same with HUB prefix 
    # 4. On front end a unique token will be created by user for their hub. This will be Foreign Key (Do I want to create a database 
    #   specific to HUB users associated with who created that HUB & when?)

@api.route('/hub', methods = ['POST'])
@token_required
def create_hub(token):
    watch_id = request.json['watchId']
    title = request.json['title']
    type_ = request.json['type_']
    poster_image = request.json['posterImage']
    genre = request.json['genre']
    summary = request.json['summary']
    rating = request.json['rating']
    streaming = request.json['streaming']
    review_score = request.json['reviewScore']
    review = request.json['review']
    have_watched = request.json['haveWatched']
    user_id = token

    print(f" {title.title()} has been added to your HUB database!")

    hub = Hub(watch_id, title, type_, poster_image, genre, summary, rating, streaming, review_score=review_score, 
                review=review, have_watched=have_watched, user_id = user_id)

    db.session.add(hub)
    db.session.commit() 

    response = show_schema.dump(hub)
    return jsonify(response)



# READ Routes for HUB & Cast Objects
    # Things to do READ HUB
    # X 1. Create Read Routes for HUB
    # 2. Create Read Routes for Cast (don't need specific Read route for cast, just make a call on front end getting rid of HUB prefix for watchId)
    # 3. For every cast member (based on watch_id from ShowCast model) return Cast object (will need to .push() all cast objects to a list on front end)


@api.route('/hub', methods=['GET'])
@token_required
def get_hub(token):
    shows = Hub.query.filter_by(user_id = token).all()
    response = shows_schema.dump(shows)
    return jsonify(response)



# UPDATE Routes for HUB Objects
    # Things to Do UPDATE HUB
    # 1. Users can add Reviews. 
    # 2. Query current review "list" and concatenate added review seperated with a ','
    # 3. Calculate average review. Keep counter/tracker for how many ppl have reviewed, add added review score and divide by how many ppl
    # 4. Users can change if they've watched a movie/show or not. Update how many ppl have watched total
    # 5. Check to see if it is a call for review or have_watched

@api.route('/hub/<id>', methods = ['PUT', 'POST'])
@token_required
def update_hub(token, id):
    hub = Hub.query.get(id) # grab hub instance
    have_watched = request.json['haveWatched']
    if have_watched != None:
        hub.have_watched += ", " + have_watched
    else:
        if hub.review:
            hub.review += ", " + request.json['review']
            hub.review_score += ", " + request.json['reviewScore']
        else:
            hub.review = request.json['review']
            hub.review_score = request.json['reviewScore']

        if not hub.how_many_reviews:
            hub.how_many_reviews = 1
        else:
            hub.how_many_reviews += 1 

        # hub.how_many_reviews = hub.get(hub.how_many_reviews, 0) + 1

    print(round(sum([float(score) for score in hub.review_score.split(',')])/ float(hub.how_many_reviews), 2))
    

    db.session.commit()
    response = show_schema.dump(hub)
    return jsonify(response)
    

# DELETE Routes for HUB Objects (Keep Cast). Should this be archived instead of deleted? 
    # Things to do DELETE
    # 1. Create Delete Route for HUB model 
    # 2. Delete HUB from Show Model & ShowCast Model 

@api.route('/hub/<id>', methods = ['DELETE'])
@token_required
def delete_hub(token, id):
    hub = Hub.query.get(id)
    print(hub)

    show = Show.query.filter_by(watch_id = hub.watch_id[3:]).all()
    if not show:
        show_cast = ShowCast.query.filter_by(watch_id = show.watch_id).all()
        if show_cast:
            for sc in show_cast:
                db.session.delete(sc)

    db.session.delete(hub)
    db.session.commit()

    response = show_schema.dump(hub)
    return jsonify(response)


   
    


