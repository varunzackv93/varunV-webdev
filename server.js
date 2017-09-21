var express = require('express');
var app = express();

/*app.get('/',handleRootRequest);

function handleRootRequest(req,res){
    res.send('hello world!!!!!!!!!!!!');
}

app.listen(3000);*/
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


//var connectionString ='mongodb://manognya:manu594@ds035796.mlab.com:35796/manognya_test';


if(process.env.MLAB_USERNAME_WEBDEV) { // check if running remotely
    var username = process.env.MLAB_USERNAME_WEBDEV; // get from environment
    var password = process.env.MLAB_PASSWORD_WEBDEV;
    connectionString = 'mongodb://' + username + ':' + password;
    connectionString += '@ds035796.mlab.com:35796/manognya_test'; // user yours
}

var mongoose = require("mongoose");
mongoose.connect(connectionString);

// configure a public directory to host static content
app.use(express.static(__dirname + '/public'));

//require ("./test/app.js")(app);

var ipaddress = process.env.OPENSHIFT_NODEJS_IP;
var port      = process.env.OPENSHIFT_NODEJS_PORT || 3000;


/*var assignment = require("./assignment/app.js");
assignment(app);*/


var project = require("./project/app.js");
project(app);


app.listen(port, ipaddress);
