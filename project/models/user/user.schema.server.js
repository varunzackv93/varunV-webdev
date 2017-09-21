module.exports = function(){
    var mongoose = require("mongoose");

    var UserSchema = mongoose.Schema({
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        // imdb ids of movies this user likes
      //  likes: [String],
        // movies this user likes

        follows: [
            {
                userId: String,
                username: String
            }
        ],
        rates: [
            {
                movie_name: String,
                movie_Id: String,
                movie_rating: Number,
                movie_url: String
            }
        ],

        reviews: [
            {
                movie_name: String,
                movie_Id: String,
                movie_review: String,
                movie_url: String,
                movie_flagged: String
            }
        ],
        google:{
            id: String,
            token:String,
            email: String
        },
        role: {type: String, default: "STUDENT", enum: ['ADMIN','STUDENT','FACULTY']},

    },{collection: "project.user"});
    return UserSchema;
};
