// Custom JavaScript
// Custom JavaScript
// Call up the carousel using the id, and use the .carousel() method create the options object
$('.carousel').carousel({
    interval: 2000,
    pause: false,
    keyboard: true
  })
  
  // Change the interval to 5 seconds (set in milliseconds)
  // Try an event handler to zoom up the .carousel-caption after the slide completes sliding - by adding a class when the slide has finished animating, and removing it when it begins
  
  // Listen for carousel to begin sliding...
  $('#carousel-cars').on('slide.bs.carousel', function() {
    console.log("Begun sliding");
    // Remove the zoomit class from the caption!
    $('.carousel-caption').removeClass('zoomit');
  })
  // Listen for carousel to end sliding...
  $('#carousel-cars').on('slid.bs.carousel', function() {
    console.log("All done sliding!");
    // Add the zoomit class to add action to the caption!
    $('.carousel-caption').addClass('zoomit');
  })
  
  