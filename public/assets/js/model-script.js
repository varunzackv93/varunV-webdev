/**
 * Created by varun on 10-12-2016.
 */

$('.launch-modal').on('click', function(e){
    console.log("in script");
    e.preventDefault();
    $( '#' + $(this).data('modal-id') ).modal();
});
