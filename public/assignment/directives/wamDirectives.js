(function () {
    angular
        .module("wamDirectives", [])
        .directive("wamSortable", wamSortable);

    function wamSortable() {
        console.log("in directives");
        var start = -1;
        var end = -1;
        function linker(scope, element, attributes) {
            $(".container")
                .sortable({
                    axis: 'y',
                    start: function (event, ui) {
                        start = ui.item.index();
                    },
                    stop: function(event, ui){
                        end = ui.item.index();
                        scope.wamCallback({
                            start: start,
                            end: end
                        });
                    }
                });
        }
        return{
            scope: {
                wamCallback: '&'
            },
            link: linker
        }

    }

})();/**
 * Created by varun on 06-11-2016.
 */
