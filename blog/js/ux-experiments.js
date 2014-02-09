$(document).ready(function() {
  $('img').on('dragstart', function(event) { event.preventDefault(); });
  var mousedown = false;
  $(".tab").bind({
    "mousedown": function(e) {
      mousedown = true;
      console.log("mousedown")
    },
    "mousemove": function(e) {
      if (mousedown)
        console.log(e);
    },
    "mouseup": function(e) {
      mousedown = false;
    }
  });
  $(".tab_container_small .tab").click(function() {
    $(".tab_container_small .tab").removeClass("active");
    $(this).addClass("active");
  });
});
