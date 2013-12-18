$(document).ready(function() {
  var $alert = $('.alert');
  $alert.hide();
  $alert.on('error', function(event, data){
    $alert.html(data)
    $alert.addClass('alert-danger');
    $alert.show();
  });
  $alert.on('success', function(event, data) {
    $alert.html(data);
    $alert.addClass('alert-info');
    $alert.show();
  })
  function prettyDate(dateString){
    var d = date.getDate();
    var monthNames = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun",
     "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];
    var m = monthNames[date.getMonth()];
    var y = date.getFullYear();
    return d+' '+m+' '+y;
  }

  $('.task-delete').click(function(event) {
    $target = $(event.target)
    $.ajax({
      type: 'DELETE',
      url: '/tasks/' + $target.attr('data-task-id'),
      data: {
        _csrf: $target.attr('data-csrf')
      },
      success: function(response) {
        $target.parent().parent().remove();
        $alert.trigger('success', 'Task was removed.');
      },
      error: function(error) {
        $alert.trigger('error', error);
      }
    })
  });
})
