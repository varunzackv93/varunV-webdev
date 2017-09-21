module.exports = function () {

    var userModel = require("./user/user.model.server.js")();
    var movieModel = require("./movie/movie.model.server")();


   var model={
       userModel: userModel,
       movieModel:movieModel
   };

   return model;

};
