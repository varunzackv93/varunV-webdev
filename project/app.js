/**
 * Created by varun on 03-12-2016.
 */

module.exports = function(app) {
    var model = require("./models/model.server.js")();
    require("./services/user.service.server.js")(app, model);
    require("./services/movies.service.server.js")(app, model);
};
