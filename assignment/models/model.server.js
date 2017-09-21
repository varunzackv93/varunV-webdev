module.exports = function () {

  /*  var mongoose = require('mongoose');
    mongoose.connect('mongodb://localhost/wam-fall-2016');*/

    var userModel = require("./user/user.model.server.js")();
    var WebsiteModel = require("./website/website.model.server.js")();
    var PageModel = require("./page/page.model.server.js")();
    var WidgetModel = require("./widget/widget.model.server")();

   var model={
       userModel: userModel,
       WebsiteModel:WebsiteModel,
       PageModel:PageModel,
       WidgetModel:WidgetModel
   };

    WebsiteModel.setModel(model);
    userModel.setModel(model);
    PageModel.setModel(model);
    WidgetModel.setModel(model);

   return model;


};
