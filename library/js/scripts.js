/*
 * Bones Scripts File
 * Author: Eddie Machado
 *
 * This file should contain any js scripts you want to add to the site.
 * Instead of calling it in the header or throwing it inside wp_head()
 * this file will be called automatically in the footer so as not to
 * slow the page load.
 *
 * There are a lot of example functions and tools in here. If you don't
 * need any of it, just remove it. They are meant to be helpers and are
 * not required. It's your world baby, you can do whatever you want.
*/


/*
 * Get Viewport Dimensions
 * returns object with viewport dimensions to match css in width and height properties
 * ( source: http://andylangton.co.uk/blog/development/get-viewport-size-width-and-height-javascript )
*/
function updateViewportDimensions() {
	var w=window,d=document,e=d.documentElement,g=d.getElementsByTagName('body')[0],x=w.innerWidth||e.clientWidth||g.clientWidth,y=w.innerHeight||e.clientHeight||g.clientHeight;
	return { width:x,height:y }
}
// setting the viewport width
var viewport = updateViewportDimensions();


/*
 * Throttle Resize-triggered Events
 * Wrap your actions in this function to throttle the frequency of firing them off, for better performance, esp. on mobile.
 * ( source: http://stackoverflow.com/questions/2854407/javascript-jquery-window-resize-how-to-fire-after-the-resize-is-completed )
*/
var waitForFinalEvent = (function () {
	var timers = {};
	return function (callback, ms, uniqueId) {
		if (!uniqueId) { uniqueId = "Don't call this twice without a uniqueId"; }
		if (timers[uniqueId]) { clearTimeout (timers[uniqueId]); }
		timers[uniqueId] = setTimeout(callback, ms);
	};
})();

// how long to wait before deciding the resize has stopped, in ms. Around 50-100 should work ok.
var timeToWaitForLast = 100;


/*
 * Here's an example so you can see how we're using the above function
 *
 * This is commented out so it won't work, but you can copy it and
 * remove the comments.
 *
 *
 *
 * If we want to only do it on a certain page, we can setup checks so we do it
 * as efficient as possible.
 *
 * if( typeof is_home === "undefined" ) var is_home = $('body').hasClass('home');
 *
 * This once checks to see if you're on the home page based on the body class
 * We can then use that check to perform actions on the home page only
 *
 * When the window is resized, we perform this function
 * $(window).resize(function () {
 *
 *    // if we're on the home page, we wait the set amount (in function above) then fire the function
 *    if( is_home ) { waitForFinalEvent( function() {
 *
 *      // if we're above or equal to 768 fire this off
 *      if( viewport.width >= 768 ) {
 *        console.log('On home page and window sized to 768 width or more.');
 *      } else {
 *        // otherwise, let's do this instead
 *        console.log('Not on home page, or window sized to less than 768.');
 *      }
 *
 *    }, timeToWaitForLast, "your-function-identifier-string"); }
 * });
 *
 * Pretty cool huh? You can create functions like this to conditionally load
 * content and other stuff dependent on the viewport.
 * Remember that mobile devices and javascript aren't the best of friends.
 * Keep it light and always make sure the larger viewports are doing the heavy lifting.
 *
*/

/*
 * We're going to swap out the gravatars.
 * In the functions.php file, you can see we're not loading the gravatar
 * images on mobile to save bandwidth. Once we hit an acceptable viewport
 * then we can swap out those images since they are located in a data attribute.
*/
function loadGravatars() {
  // set the viewport using the function above
  viewport = updateViewportDimensions();
  // if the viewport is tablet or larger, we load in the gravatars
  if (viewport.width >= 768) {
  jQuery('.comment img[data-gravatar]').each(function(){
    jQuery(this).attr('src',jQuery(this).attr('data-gravatar'));
  });
	}
} // end function


/*
 * Put all your regular jQuery in here.
*/
jQuery(document).ready(function($) {

  /*
   * Let's fire off the gravatar function
   * You can remove this if you don't need it
  */
  loadGravatars();

  /* start Stellar for parallax effects */
  var mobileDevice = /(Android|iPad|iPhone|iPod|Windows Phone)/g.test(navigator.userAgent);

    if (!mobileDevice) {
      // initialise Stellar.js
      $(window).stellar({
        horizontalScrolling: false
      });
    }

  

  // Let's do some fancy homepage stuff!
  if ($('body').hasClass('home')) {

    // Cache some variables
    var links = $('.home nav li a');
    var slide = $('.page-panel');
    var mywindow = $(window);
    var htmlbody = $('html,body');
    
    // Create a function that will be passed a slide number and then will scroll to that slide using jQuery's animate. The Jquery
    // easing plugin is also used, so we passed in the easing method of 'easeInOutQuint' which is available throught the plugin.
    function goToByScroll(dataslide) {
        htmlbody.animate({
            scrollTop: $('.page-panel[data-slide="' + dataslide + '"]').offset().top
        }, 2000, 'easeInOutQuint');
    }
    
    // When the user clicks on the navigation links, get the data-slide attribute value of the link and pass that variable to the goToByScroll function
    links.click(function (e) {
      e.preventDefault();
      dataslide = $(this).attr('data-slide');
      goToByScroll(dataslide);
      $(this).blur();
    });

    /* Change Jetpack's title */
    $('#subscribe-field').removeAttr("style");
    $("label[for='subscribe-field']").text("Subscribe via email");

  var NUMBER_OF_FLAKES = 250;
  var UPDATE_TIME = 11; // in ms

  //canvas init
  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");

  var W;
  var H;
  
  //set canvas dimensions on viewport re-size
  function setCanvasSize() {
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;
  }
  setCanvasSize();

  var isResizing = false;
  $(window).on('resize', function() {
    if (isResizing) {
      return;
    }

    isResizing = true;
    setTimeout(function() {
      setCanvasSize();
      isResizing = false;
    }, 300);
  });
  
  //snowflake particles
  var mp = NUMBER_OF_FLAKES; //max particles
  var particles = [];
  for(var i = 0; i < mp; i++)
  {
    particles.push({
      x: Math.random()*W, //x-coordinate
      y: Math.random()*H, //y-coordinate
      r: Math.random()*4+.75, //radius
      d: Math.random()*mp //density
    })
  }
  
  //Lets draw the flakes
  function draw()
  {
    ctx.clearRect(0, 0, W, H);
    
    ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
    ctx.beginPath();
    for(var i = 0; i < mp; i++)
    {
      var p = particles[i];
      ctx.moveTo(p.x, p.y);
      ctx.arc(p.x, p.y, p.r, 0, Math.PI*2, true);
    }
    ctx.fill();
    update();
  }
  
  //Function to move the snowflakes
  //angle will be an ongoing incremental flag. Sin and Cos functions will be applied to it to create vertical and horizontal movements of the flakes
  var angle = 0;
  function update()
  {
    angle += 0.01;
    for(var i = 0; i < mp; i++)
    {
      var p = particles[i];
      //Updating X and Y coordinates
      //We will add 1 to the cos function to prevent negative values which will lead flakes to move upwards
      //Every particle has its own density which can be used to make the downward movement different for each flake
      //Lets make it more random by adding in the radius
      p.y += Math.cos(angle+p.d) + 1 + p.r/2;
      p.x += Math.sin(angle) * 2;
      
      //Sending flakes back from the top when it exits
      //Lets make it a bit more organic and let flakes enter from the left and right also.
      if(p.x > W+5 || p.x < -5 || p.y > H)
      {
        if(i%3 > 0) //66.67% of the flakes
        {
          particles[i] = {x: Math.random()*W, y: -10, r: p.r, d: p.d};
        }
        else
        {
          //If the flake is exitting from the right
          if(Math.sin(angle) > 0)
          {
            //Enter from the left
            particles[i] = {x: -5, y: Math.random()*H, r: p.r, d: p.d};
          }
          else
          {
            //Enter from the right
            particles[i] = {x: W+5, y: Math.random()*H, r: p.r, d: p.d};
          }
        }
      }
    }
  }
  
  //animation loop
  setInterval(draw, UPDATE_TIME);

  } // End of home-specific code


  // Okay, now let's make that sword glint as you scroll
  //$('#small-glint, #large-glint').addClass('fade-out');
  
  $('#home').waypoint(function() {
      $('#large-glint').fadeTo(50, 1, 'easeInOutElastic').fadeTo(200, 0, 'easeInOutElastic');
      $('#small-glint').fadeTo(150, 1, 'easeInOutElastic').fadeTo(250, 0, 'easeInOutElastic');
      $('#large-glint').fadeTo(300, 1, 'easeInOutElastic').fadeTo(400, 0, 'easeInOutElastic');
  }, { offset: '-15%' });

  $('#books').waypoint(function() {
      $('#large-glint').fadeTo(100, 1, 'easeInOutElastic').fadeTo(200, 0, 'easeInOutElastic');
  });

  $('#about-the-author').waypoint(function() {
      $('#small-glint').fadeTo(100, 1, 'easeInOutElastic').fadeTo(200, 0, 'easeInOutElastic');
      $('#large-glint').fadeTo(250, 1, 'easeInOutElastic').fadeTo(350, 0, 'easeInOutElastic');
  }, { offset: '15%' });

  $('#news').waypoint(function() {
      $('#large-glint').fadeTo(100, 1, 'easeInOutElastic').fadeTo(200, 0, 'easeInOutElastic');
  }, { offset: '15%' });

}); /* end of as page load scripts */
