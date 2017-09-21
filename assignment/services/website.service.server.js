/**
 * Created by varun on 26-10-2016.
 */
module.exports = function(app, model){

    var websites=[

        { _id: "123", name: "Facebook",    developerId: "456", description: "Lorem" },
        { _id: "234", name: "Tweeter",     developerId: "456", description: "Lorem" },
        { _id: "456", name: "Gizmodo",     developerId: "456", description: "Lorem" },
        { _id: "567", name: "Tic Tac Toe", developerId: "123", description: "Lorem" },
        { _id: "678", name: "Checkers",    developerId: "123", description: "Lorem" },
        { _id: "789", name: "Chess",       developerId: "234", description: "Lorem" }

    ];


    app.get("/api/user/:userId/website",findAllWebsitesForUser);

    app.get("/api/website/:websiteId",findWebsiteById);
    app.post("/api/user/:userId/website",createWebsite);
    app.put("/api/website/:websiteId",updateWebsite);
    app.delete("/api/website/:websiteId",deleteWebsite);


function findAllWebsitesForUser(req,res){

    console.log("inside seerver website");

    model.WebsiteModel.findAllWebsitesForUser(req.params.userId)
        .then(
            function (websites) {
                console.log("correct path");
                console.log(websites[0].name);
                res.json(websites);
            }
        )
   /* var id=req.params.userId;

    var result = [];
    for(var w in websites){
        var website=websites[w];
        if(id === website.developerId){
            result.push(website);
            console.log(website);

        }

    }
    res.send(result);*/
}

function findWebsiteById(req,res){

    var wid=req.params.websiteId;
model.WebsiteModel.findWebsiteById(wid)
    .then(
        function (website) {
            res.json(website);
        }
    );


    /*for(var w in websites){
        var website=websites[w];
        if(website._id === wid){
            res.send (website);
            return;
        }
    }
res.send(null);*/
}


function createWebsite(req,res) {

    var website = req.body;
    console.log(website);
   /* websites.push(website);
    res.send(website);*/
    model.WebsiteModel.createWebsite(req.params.userId, website)
        .then(function (website) {
            console.log(website);
            res.json(website);
        })

}

function updateWebsite(req,res){
    console.log("in server");
    var website = req.body;
    var wid=req.params.websiteId;
    console.log(website);
    console.log(wid);
    model.WebsiteModel.updateWebsite(wid, website)
        .then(
            function (status) {
                console.log(status.data);
                res.send(200);
            },
            function (error) {
                res.statusCode(400).send(error);
            }
        );
        /*.then(function (website){
           res.json(website);
        });*/
    /*for(var w in websites){
        if(websites[w]._id === wid){
            websites[w].name=website.name;
            websites[w].description=website.description;
            console.log("ckeck name  "+websites[w].name);
            console.log("ckeck desc  "+websites[w].description);
             res.send(websites[w]);
             return;
        }
    }

    res.send(400);*/
}

function deleteWebsite(req,res){
    var wid = req.params.websiteId;

    model.WebsiteModel.deleteWebsite(wid)
        .then(function (status) {
            res.send(200);
        },
        function (error) {
            res.statusCode(404).send(error);
        });
    /*for(var w in websites){
        if(wid === websites[w]._id){
            websites.splice(w, 1);
            res.send(200);
            return;
        }
    }
    res.send(400);*/
}


};