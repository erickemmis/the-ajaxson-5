

$(document).ready(function() {
    // register our function as the "callback" to be triggered by the form's submission event
    $("#form-gif-request").submit(fetchAndDisplayGif); // in other words, when the form is submitted, fetchAndDisplayGif() will be executed
});


/**
 * sends an asynchronous request to Giphy.com aksing for a random GIF using the 
 * user's search term (along with "jackson 5")
 * 
 * upon receiving a response from Giphy, updates the DOM to display the new GIF
 */
function fetchAndDisplayGif(event) {
	
		
    
    // This prevents the form submission from doing what it normally does: send a request (which would cause our page to refresh).
    // Because we will be making our own AJAX request, we dont need to send a normal request and we definitely don't want the page to refresh.
    event.preventDefault();
    
		//validate using the captcha-ish
		var $captcha = $('#captcha input:text');
		var captcha_v = $captcha.val();
		
		if(captcha_v !== '5' && captcha_v.toLowerCase() !== 'five' ) {
			$('.invalid-feedback').show();
			$captcha.parent().addClass('c_error');
			$('#gif:visible').hide();
			return;
		}
		
		//reset error message
		$('.invalid-feedback').hide();
		$captcha.parent().removeClass('c_error');
		$('#gif:hidden').show();
		
    // get the user's input text from the DOM
    var searchQuery = $('#form-gif-request input:text').val(); // TODONE should be e.g. "dance"
    
    // configure a few parameters to attach to our request
    var params = { 
        api_key: "dc6zaTOxFJmzC", 
        tag : "jackson 5 " + searchQuery // TODONE should be e.g. "jackson 5 dance"
    };
    
    console.log(params);
    
    // make an ajax request for a random GIF
    $.ajax({
        url: "https://api.giphy.com/v1/gifs/random", // TODONE where should this request be sent?
        data: params, // attach those extra parameters onto the request
        success: function(response) {
            // if the response comes back successfully, the code in here will execute.
            
            // jQuery passes us the `response` variable, a regular javascript object created from the JSON the server gave us
            console.log("we received a response!");
            //console.log(response);
            //console.log(params.tag);
            
            // TODONE
            // 1. set the source attribute of our image to the image_url of the GIF
            $('#gif').attr('src', response.data.image_url);
            // 2. hide the feedback message and display the image
            setGifLoadedStatus(true);
        },
        error: function() {
            // if something went wrong, the code in here will execute instead of the success function
            
            // give the user an error message
            $("#feedback").text("Sorry, could not load GIF. Try again!");
            setGifLoadedStatus(false);
        }
    });
    
    // TODONE
    // give the user a "Loading..." message while they wait
    setGifLoadedStatus(false);
    $('#feedback').text('Loading...');
    
}


/**
 * toggles the visibility of UI elements based on whether a GIF is currently loaded.
 * if the GIF is loaded: displays the image and hides the feedback label
 * otherwise: hides the image and displays the feedback label
 */
function setGifLoadedStatus(isCurrentlyLoaded) {
    $("#gif").attr("hidden", !isCurrentlyLoaded);
    $("#feedback").attr("hidden", isCurrentlyLoaded);
}