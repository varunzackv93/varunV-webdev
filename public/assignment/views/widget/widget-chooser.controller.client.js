(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetChooserController",WidgetChooserController);

    function WidgetChooserController($location,$routeParams,WidgetService) {
        var vm=this;
        vm.uid=$routeParams.uid;
        vm.wid=$routeParams.wid;
        vm.pid=$routeParams.pid;
        vm.createWidget=createWidget;

        function init(){
            WidgetService.findWidgetsForPage(vm.pid)
                .then(
                    function (response) {
                        vm.widgets = response.data;

                    });
        }
        init();

        function createWidget(type) {
            var order = vm.widgets.length;
//console.log("widget type");
  //         console.log(type);
    //        console.log(vm.pid);
            if(type==="HEADER"){
                var  newWidget={
                   // _id:(new Date()).getTime()+"",
                    type:"HEADER",
                    _page:vm.pid,
                    size:2,
                    text:"Default",
                    order:order
                }
            }
            else if(type==="IMAGE"){
                var  newWidget={
                    //_id:(new Date()).getTime()+"",
                    type:"IMAGE",
                    _page:vm.pid,
                    width:"100%",
                    url:"http://lorempixel.com/400/200/",
                    order:order
                }
            }
            else if(type==="YOUTUBE"){
                var  newWidget={
                   // _id:(new Date()).getTime()+"",
                    type:"YOUTUBE",
                    _page:vm.pid,
                    width:"100%",
                    url:"https://youtu.be/C3DbrYx-SN4",
                    order:order
                }
            }
            else if(type==="HTML"){
                var  newWidget={
                    //_id:(new Date()).getTime()+"",
                    type:"HTML",
                    _page:vm.pid,
                    text:"<p>Lorem ipsum</p>",
                    order:order
                }
            }

            else if(type==="TEXT"){
                var  newWidget={
                    // _id:(new Date()).getTime()+"",
                    type:"TEXT",
                    _page:vm.pid,
                    text:"<p>Lorem ipsum</p>",
                    rows:3,
                    placeholder:"widget of type text",
                    formatted:true
                }
            }

            console.log("widget::: "+newWidget.type);
            WidgetService.createWidget(vm.pid,newWidget)
                .then(
                    function (response) {
                        var widgetCreated = response.data;
console.log("new widget "+widgetCreated);
                        if(widgetCreated){
                            console.log("widget id");
                            console.log(newWidget);
                            $location.url("/user/"+vm.uid+"/website/"+vm.wid+"/page/"+vm.pid+"/widget/"+widgetCreated._id);
                        }
                        else{
                            vm.error="unable to update widget";
                        }

                    });
        }
    }
})();