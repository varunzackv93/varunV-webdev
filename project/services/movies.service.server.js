/**
 * Created by varun on 10-12-2016.
 */

module.exports = function (app, model) {

    var movieModel = model.movieModel;


    app.get('/api/project/moviecheck/:tmdbId',findMovieById);
    app.get('/api/project/findallmovies', findallmovies);
    app.put('/api/project/:tmdbId/ratingsandreviews',updateRatingAndReview);
    app.post('/api/project/movie',createMovie);
    app.put('/api/project/reportreview' ,reportReview);
    app.put('/api/project/removereview' ,removeReview);
    app.put('/api/project/donotremovereview' ,donotremovereview);
    app.put('/api/project/:tmdbId/updatemovie',updateMovie);

    app.delete("/api/project/movie/:tmdbId/remove/:userId", deleteMovie);


    function deleteMovie(req,res) {
        var tmdbId = req.params.tmdbId;
        var userId = req.params.userId;

        movieModel
            .findMovieById(tmdbId)
            .then(function (movie) {
                    var foundMovie = movie[0];

                    for(var i in foundMovie.reviews){
                        if(foundMovie.reviews[i].userId == userId){

                            console.log(foundMovie.reviews[i].userId + ","+ userId);
                            foundMovie.reviews.splice(i, 1);
                            movie[0].save();
                            res.sendStatus(200);
                            return;


                        }
                    }



                },
                function (error) {
                    res.statusCode(404).send(error);
                });

    }

    function updateMovie(req, res) {
        var tmdbId = req.params.tmdbId;
        var reviews = req.body;

        var userId = reviews.userId ;
        var text = reviews.text;
        var visible = reviews.visible;
        var flagged = reviews.flagged;
        movieModel
            .findMovieById(tmdbId)
            .then(function (movie) {
                    var foundMovie = movie[0];
                    var reviews = foundMovie.reviews;


                    for(var i in reviews){
                        if(reviews[i].userId == userId){
                            reviews[i].visible= visible;
                            reviews[i].text = text;
                            reviews[i].flagged = flagged;

                        }
                    }

                    movie[0].save();
                    res.sendStatus(200);


                },
                function (error) {
                    res.statusCode(404).send(error);
                });
    }




    function findallmovies(req, res) {

        movieModel
            .findAllMovies()
            .then(
                function (movies) {
                    res.json(movies);
                },
                function (error) {
                    res.sendStatus(404);
                }
            );
    }

    function donotremovereview(req, res) {
        var tmdbId = req.body.tmdbId;
        var reviewId = req.body.reviewId;

        movieModel
            .findMovieById(tmdbId)
            .then(function (movie) {
                    var foundMovie = movie[0];
                    var reviews = foundMovie.reviews;

                    for(var i in reviews){
                        if(reviews[i]._id == reviewId){
                            reviews[i].flagged = "false";
                        }
                    }

                    movie[0].save();
                    res.sendStatus(200);


                },
                function (error) {
                    res.statusCode(404).send(error);
                });
    }

    function removeReview(req,res) {

        var tmdbId = req.body.tmdbId;
        var reviewId = req.body.reviewId;

        movieModel
            .findMovieById(tmdbId)
            .then(function (movie) {
                var foundMovie = movie[0];
                var reviews = foundMovie.reviews;

                for(var i in reviews){
                    if(reviews[i]._id == reviewId){
                        reviews[i].visible = "false";
                    }
                }

                movie[0].save();
                res.sendStatus(200);
            });
    }


    function reportReview(req,res) {

        var tmdbId = req.body.tmdbId;
        var reviewId = req.body.reviewId;

        movieModel
            .findMovieById(tmdbId)
            .then(function (movie) {
                    var foundMovie = movie[0];
                    var reviews = foundMovie.reviews;

                    for(var i in reviews){
                        if(reviews[i]._id == reviewId){
                            reviews[i].flagged = "true";
                        }
                    }

                    //return movie[0].save();
                    movie[0].save();
                    res.send(200);


                },
                function (error) {
                    res.statusCode(404).send(error);
                });
    }

    function findMovieById(req, res){
        var id = req.params.tmdbId;

        movieModel
            .findMovieById(id)
            .then(function (movie) {
                    var foundMovie = movie[0];
                    res.send(foundMovie);
                },
                function (error) {
                    res.statusCode(404).send(error);
                });
    }


    function updateRatingAndReview(req, res) {

        var id = req.params.tmdbId;
        var ratingsandreviews = req.body;

        movieModel
            .updateRatingAndReview(id, ratingsandreviews)
            .then(
                function (stats) {
                    res.sendStatus(200);
                },
                function (error) {
                    res.sendStatus(404);
                }
            );
    }

    function createMovie(req,res) {
        var movie = req.body;
        movieModel
            .createMovie(movie)
            .then(
                function(movie){
                    res.json(movie);
                },
                function(error){
                    res.statusCode(404).send(error);
                }
            )
    }



};
