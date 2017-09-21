/**
 * Created by varun on 04-12-2016.
 */

module.exports = function () {
    var mongoose = require("mongoose");

    var MovieSchema = mongoose.Schema({
        tmdbId: String,
        title: String,
        imageUrl: String,

        ratings: [
            {
                userId: String,
                username: String,
                value: Number
            }
        ],

        reviews: [
            {
                userId: String,
                username: String,
                text: String,
                visible: String,
                flagged: String
            }
        ]

    }, {collection: 'project.movie'});
    return MovieSchema;
};
