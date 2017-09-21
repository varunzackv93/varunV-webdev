
module.exports = function() {

    var mongoose = require ("mongoose");
    var MovieSchema = require("./movie.schema.server.js")();
    var Movie  = mongoose.model("Movie", MovieSchema);

    var api = {

        findMovieById : findMovieById,
        updateRatingAndReview : updateRatingAndReview,
        createMovie: createMovie,
        findAllMovies: findAllMovies

    };
    return api;


    function findMovieById(id) {
        return Movie.find({tmdbId: id});
    }

    function findAllMovies() {
        return Movie.find();
    }



    function updateRatingAndReview(id, rrobj) {
        var ratings = rrobj.ratings;
        var reviews = rrobj.reviews;

        return Movie
            .update({tmdbId: id},
                {$push: {ratings: ratings,
                    reviews: reviews}}
            );
    }

    function createMovie(movie) {
        return Movie.create(movie);
    }






};