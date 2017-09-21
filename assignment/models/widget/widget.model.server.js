module.exports=function () {
    var mongoose=require("mongoose");
    var WidgetSchema=require("./widget.schema.server")();
    var WidgetModel=mongoose.model("WidgetModel",WidgetSchema);

    var api={
        createWidget:createWidget,
        findAllWidgetsForPage:findAllWidgetsForPage,
        findWidgetById:findWidgetById,
        updateWidget:updateWidget,
        deleteWidget:deleteWidget,
        reorderWidget: reorderWidget,
        setModel: setModel
    };
    return api;

    function setModel(_model) {
        model=_model;
    }

    function reorderWidget(start, end, pageId) {
        return WidgetModel
            .find({_page: pageId},
                function (err, widgets) {
                widgets.forEach(function (widget) {
                    start=parseInt(start);
                    end=parseInt(end);
                    console.log("right place");
                    console.log(start);
                    console.log(end);
                    if(start< end){
                        if(widget.order === start){
                            console.log(widget.order);
                            widget.order = end;
                            widget.save();
                        }
                        else if(widget.order > start && widget.order <= end){
                            console.log("widget order check else");
                            console.log(widget);
                            widget.order--;
console.log(widget);
                            widget.save();
                            console.log(widget);
                        }
                    } else{
                        console.log("in else");
                        if(widget.order === start){

                            widget.order = end;
                            widget.save();

                        }

                        else if(widget.order < start && widget.order >= end){

                            widget.order++;

                            widget.save();

                        }
                    }

                    console.log(widgets);
                });

            });
    }

    function createWidget(widget) {

        return WidgetModel
            .find({_page: widget._page})
            .then(
                function (widgets) {
                    widget.order = widgets.length;
                    return WidgetModel.create(widget);
                },
                function (error) {
                    return null;
                });
       /* return model.WidgetModel
            .find({_page: widget._page})
            .then(
                function (widgets) {
                    widget.order = widgets.length;
                    return Widget.create(widget);
                },
                function (error) {
                    return null;
                });*/
    }

    function findAllWidgetsForPage(pageId){
        return WidgetModel.find({_page:pageId});
    }

    function findWidgetById(id){
        return WidgetModel.findById(id);
    }

    function updateWidget(type,widget){

        if(widget.type==="HEADER") {
            return WidgetModel
                .update(
                    {
                        _id:widget._id
                    },
                    {
                        text:widget.text,
                        size:widget.size,
                        name:widget.name
                    }
                )
        }
        else if(widget.type==="HTML") {
            return WidgetModel
                .update(
                    {
                        _id:widget._id
                    },
                    {
                        text:widget.text
                })
        }

        else if(widget.type==="IMAGE") {
            console.log("4");
            return WidgetModel
                .update(
                    {
                        _id:widget._id
                    },
                    {

                        text :widget.text,
                        width :widget.width,
                        url :widget.url

                })
        }

        else if(widget.type==="YOUTUBE") {
            return WidgetModel
                .update(
                    {
                        _id:widget._id
                    },
                    {
                        text :widget.text,
                        width :widget.width,
                        url :widget.url
                })
        }

        else if(widget.type==="TEXT") {
            return WidgetModel
                .update(
                    {_id:widget._id},
                    {
                        text :widget.text,
                        rows :widget.rows,
                        placeholder :widget.placeholder,
                        formatted:widget.formatted
                })
        }



    }

    function deleteWidget(id){
        return WidgetModel.remove({_id:id})
    }

};