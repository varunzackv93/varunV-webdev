/**
 * Created by varun on 04-11-2016.
 */
module.exports = function(app,model){

    var pages=[
        { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
        { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem"},
        { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem"}
    ];


    app.get("/api/website/:websiteId/page",findAllPagesForWebsite);
    app.get("/api/page/:pageId",findPageById);
    app.put("/api/page/:pageId",updatePage);
    app.post("/api/website/:websiteId/page",createPage);
    app.delete("/api/page/:pageId",deletePage);


    function findAllPagesForWebsite(req,res){

        var wid=req.params.websiteId;

        model.PageModel.findAllPagesForWebsite(wid)
            .then(
                function (page) {
                  //  console.log("correct path");
                    console.log(page[0].name);
                    res.json(page);
                }
            )
      /*  var resultset=[];
        for(var p in pages){
            if(pages[p].websiteId===wid){
                resultset.push(pages[p]);
            }
        }

        res.send( resultset);*/
    }


    function findPageById(req,res){
        var pid=req.params.pageId;

        model.PageModel.findPageById(pid)
            .then(
                function (page) {
                    res.json(page);
                }
            );
      /*  for(var p in pages){
            if(pages[p]._id===pid){
                res.send( pages[p]);
                return;
            }
        }
        res.send( null);*/
    }


    function updatePage(req,res){
        var new_page = req.body;
        var pid=req.params.pageId;

        model.PageModel.updatePage(pid, new_page)
            .then(
                function (status) {
                    console.log(status.data);
                    res.send(200);
                },
                function (error) {
                    res.statusCode(400).send(error);
                }
            );
       /* for(var p in pages){
            if(pages[p]._id===pid){
                pages[p].name=new_page.name;
                pages[p].description=new_page.description;
                pages[p].websiteId=new_page.websiteId;
                res.send(200);
                return;
            }
        }
        res.send(400);*/
    }

    function createPage(req,res){
        var wid=req.params.websiteId;
        var new_page = req.body;
        /*pages.push(new_page);
        res.send( new_page);
        return;*/

        model
            .PageModel
            .createPage(wid,new_page)
            .then(
                function (newpage) {
                    // console.log(newUser);
                    res.json(newpage);
                } ,
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    function deletePage(req,res){
        var pid=req.params.pageId;

        model.PageModel.deletePage(pid)
            .then(function (status) {
                    res.send(200);
                },
                function (error) {
                    res.statusCode(404).send(error);
                });
       /* for(var p in pages){
            if(pages[p]._id===pid){
                pages.splice(p,1);
                res.send(200);
                return;
            }
        }
        res.send(400);*/
    }
}