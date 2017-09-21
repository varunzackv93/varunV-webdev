/**
 * Created by varun on 05-11-2016.
 */
module.exports = function(app,model){

    var multer = require('multer'); // npm install multer --save
    var upload = multer({ dest: __dirname+'/../../public/uploads'});

    var widgets = [
        {"_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO"},
        {"_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        {
            "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
            "url": "http://lorempixel.com/400/200/"
        },
        {"_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
        {"_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        {
            "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
            "url": "https://youtu.be/AM2Ivdi9c4E"
        },
        {"_id": "789", "wid getType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
    ];

    app.get("/api/page/:pageId/widget",findAllWidgetsForPage);
    app.get("/api/widget/:widgetId",findWidgetById);
    app.put("/api/widget/:widgetId",updateWidget);
    app.put("/page/:pid/widget",reorderWidget);
    app.post("/api/page/:pageId/widget",createWidget);
    app.delete("/api/widget/:widgetId",deleteWidget);
    app.post ("/api/uploads", upload.single('myFile'), uploadImage);

    function reorderWidget(req, res) {
        var pageId = req.params.pageId;
        var start = parseInt(req.query.start);
        var end =  parseInt(req.query.end);
       /* widgets.splice(end, 0, widgets.splice(start, 1)[0]);
        res.sendStatus(200)*/;

        model.WidgetModel
            .reorderWidget( start, end, pageId)
            .then(
                function (stats) {
                    res.sendStatus(200);
                },
                function (error) {
                    res.sendStatus(400);
                });
    }

    function uploadImage(req, res) {
//console.log("i am here");
        // console.log(req.body);
        //console.log(req.file);
        var userId = req.body.userId;
        var websiteId = req.body.websiteId;
        var pageId = req.body.pageId;
        var widgetId      = req.body.widgetId;
        var width         = req.body.width;
        var myFile        = req.file;
        console.log(myFile);

        var originalname  = myFile.originalname; // file name on user's computer
        var filename      = myFile.filename;     // new file name in upload folder
        var path          = myFile.path;         // full path of uploaded file
        var destination   = myFile.destination;  // folder where file is saved to
        var size          = myFile.size;
        var mimetype      = myFile.mimetype;


       /* for (var w in widgets) {
            var widget = widgets[w];
            if (widget._id === widgetId) {
                widget.url="/uploads/"+filename;
            }
        }
        res.redirect("/assignment/#/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/" + widgetId);
 */
        var newWidget = {
            url: "/uploads/"+filename,
            type:"IMAGE",
            _id:widgetId,
            width:width
        };

        model.WidgetModel
            .updateWidget(newWidget.type, newWidget)
            .then(
                function (status) {
                    res.redirect("/assignment/#/user/"+ userId+"/website/"+websiteId +"/page/"+pageId+"/widget/"+widgetId);
                },
                function (error) {
                    res.statusCode(404).send(error);

                }
            );


    }


    // function reorderWidget(req, res) {
    //     console.log("in reorder");
    //     var pageId = req.params.pageId;
    //     var start = parseInt(req.query.start);
    //     var end =  parseInt(req.query.end);
    //     modifiedStart = getIndexOf(pageId,start);
    //     modifiedEnd = getIndexOf(pageId,end);
    //     widgets.splice(modifiedEnd,0,widgets.splice(modifiedStart,1)[0]);
    //     // console.log(widgets)
    //     res.send(widgets);
    // }

   /* function getIndexOf(pid,i){
        resultset = [];
        for(var w in widgets){
            if(widgets[w].pageId == pid){
                resultset.push(w);
            }
        }
        return resultset[i];
    }*/



    function findAllWidgetsForPage(req,res)
    {

        var pid=req.params.pageId;
        //console.log("i am here "+pid);
       /* var result = [];
        for (var i in widgets) {
            var widget = widgets[i];
            if (widget.pageId === pid) {
                result.push(widget);
            }

        }
        console.log("in server widgets list "+result);
        res.send (result);*/

        model.WidgetModel
            .findAllWidgetsForPage(pid)
            .then(function (widgets) {
                console.log("model response to find widgets for page");
                console.log(widgets);
                res.json(widgets);
            },function (error) {
                res.statusCode(404).send(error);
            })



    }


    function findWidgetById(req,res){

        var wgid=req.params.widgetId;

        model.WidgetModel
            .findWidgetById(wgid)
            .then(function (widget) {
                console.log("widget in server");
                console.log(widget);
                res.send(widget);
            },function (error) {
                res.statusCode(404).send(error);
            })

      /*  for (var w in widgets) {
            var widget = widgets[w];
            if (widget._id === wgid) {
                res.send( widget);
                return;
            }
        }
        res.send( null);*/
    }


    function updateWidget(req,res){

        var widget = req.body;
        var widgetId=req.params.widgetId;
        var widgetType=widget.type;
       /* for (var i in widgets) {
            if (widgets[i]._id === widgetId) {

                widgets[i].text=widget.text;
                widgets[i].name=widget.name;

                if(widget.widgetType=="HEADER"){
                    widgets[i].size=widget.size;
                }

                else if (widget.widgetType==="YOUTUBE" || widget.widgetType==="IMAGE"){
                    widgets[i].width=widget.width;
                    widgets[i].url=widget.url;
                }
                res.send(200);
                return;
            }
        }
        res.send(400);*/

        model.WidgetModel
            .updateWidget(widgetType,widget)
            .then(function (status) {
                res.send(200);
            },function (error) {
                res.statusCode(404).send(error);
            })
    }

    function createWidget(req,res){
        console.log("reached here");
        var newWidget = req.body;
        /*console.log("added widget "+newWidget);
        widgets.push(newWidget);
        console.log("all widgets after "+widgets);
        res.send(newWidget);*/

       model.WidgetModel
            .createWidget(newWidget)
            .then(function (widget) {
                res.json(widget);
            },function (error) {
                res.statusCode(404).send(error);
            })
    }



    function deleteWidget(req,res){
        var widgetId=req.params.widgetId;

       /* for(var i in widgets){
            if(widgets[i]._id===widgetId){
                widgets.splice(i,1);
                res.send(200);
                return;
            }
        }
        res.send(400);
*/

        model.WidgetModel
            .deleteWidget(widgetId)
            .then(function (status) {
                res.send(200);
            },function (error) {
                res.statusCode(404).send(error);
            })
    }
}