
    function addEvent()
    {
        //if(!document.getElementById("input-isInterval").checked){
       //     document.getElementById("input-end").value = document.getElementById("input-start").value;
       // }
        
        var inputs = "";
        
        inputs += "input-title: " + document.getElementById("input-title").value + "\n";
        inputs += "input-text: " + document.getElementById("input-text").value + "\n";
        //inputs += "input-media: " + document.getElementById("input-media").value + "\n";
        
        //alert(inputs);
		var url = document.URL;
		var urlpart = url.match(/e\/[0-9]+/gi)[0];
		var petID = urlpart.match(/[0-9]+/gi)[0];
        //var now = new Date();
        //var hourNow = now.getHours();
        //var minNow = now.getMinutes();

        var eventObject = {
            "pets": "",
            "title": "",
            "description": "",
            "media": []
        };

        eventObject.pets = [parseInt(petID)];
        eventObject.title = document.getElementById("input-title").value; 
        eventObject.description = document.getElementById("input-text").value;
        eventObject.media = [];
        
        var mediaURL = document.getElementById("input-media").value;
		
        var event = new Event();
        var eventID;
        event.save(eventObject, {
        	success: function (event, response){
        		//alert(JSON.stringify(response));
        		eventID = response.pk;
        		addMedia(mediaURL, eventID);
        	},
        	error: function (event){
        		alert('adding event failed');
        	}
        });
        
        
    }
    
    function addMedia(url, eventID)
    {
    	var media = new Media();
        var mediaObject = {
            "event": "",
            "media_url": "",
            "media_type": "PIC"
        };
        mediaObject.event = [eventID];
        mediaObject.media_url = url;
        media.save(mediaObject, {
			success: function (media){
				//alert('media created');
			},
			error: function (media){
				alert('media creation failed');
			}
		});
    }
	/*
    // from which URL ...... ,,,,,,,,,,,,,,,??????????? //
    
    $('#modal-form-submit').on('click', function(e){
       // We don't want this to act as a link so cancel the link action
       e.preventDefault();
    
       // Find form and submit it
       $('#modal-form').submit();
       });

    // Since we want both pressing 'Enter' and clicking the button to work
    // We'll subscribe to the submit event, which is triggered by both

    $('#modal-form').on('submit', function(){
                        
        //Serialize the form and post it to the server
        $.post("/yourReceivingPage", $(this).serialize(), function(){
               
               // When this executes, we know the form was submitted
               
               // To give some time for the animation,
               // let's add a delay of 200 ms before the redirect
               var delay = 200;
               setTimeout(function(){
                          window.location.href = 'successUrl.html';
                          }, delay);
               
               // Hide the modal
               $("#my-modal").modal('hide');
               
               });
        
        // Stop the normal form submission
        return false;
        });
*/


/* 
 * Name:    ...
 * Purpose: ...
 * Params:  ...
 * Returns: ...
 */


/* Name:    displayDayName
 * Purpose: display friendly name of a day, rather than a number
 * Params:  the current day, an int 0-6 (from database)
 * Returns: the day name in string form
 */
function displayDayName(day) {
    switch (day) 
    {
        case 0: return "Monday";
        case 1: return "Tuesday"; 
        case 2: return "Wednesday"; 
        case 3: return "Thursday"; 
        case 4: return "Friday"; 
        case 5: return "Saturday"; 
        case 6: return "Sunday"; 
        default: return "Unknown weekday"; 
    }
    return "Unknown weekday";
}


/* Name:    displayTime
 * Purpose: display a time in 12hr format
 * Params:  an int hour and min
 * Returns: the time in string format
 */
function displayTime(hour, min) {
    
    // Javascript allows you to change variable type, int to string here
    // properly display single-digit minutes with leading 0
    if (min < 10) min = "0"+min;

    // Modulo operator in case hour is 24 or above.
    // (i.e. late-night retail stores hours)
    hour = hour % 24;

    // Subtract 12 for 12 hour display, instead of 24hr
    // could also do mod, but whatever
    if (hour > 12) {
        return (hour-12) + ":" + min + "pm";
    }
    
    // Display noon correctly (12pm)
    if (hour == 12) { 
        return hour + ":" + min + "pm"; 
    }
    
    // Display midnight correctly
    if (hour == 0) { 
        hour = 12;
        //return (hour+12) + ":" + min + "am";
    }

    return hour + ":" + min + "am";
}

    // Hide end date field
    //$("#endDateInput").hide();


    /*function selectChange(value) {
        if(value == 'plaintext')
        {
            $('#mediaInputs').hide();
            //$('#assetInput').hide();
            //$('#captionInput').hide();
            //$('#creditInput').hide();
        }
        else
        {
            $('#mediaInputs').show();
        }
    }*/
    
    
    /*function timeRange(checked) {
        if (checked) {
            $('#endDateInput').show();
        }
        else {
            $('#endDateInput').hide();
        }
    }*/


  /*     // can we import this here or anything…?

    <!-- Javascript
    ================================================== -->
    <!-- Placed at the end of the document so the pages load faster -->
    <script src="/static/bootstrap/js/jquery.js"></script>
    <script src="/static/bootstrap/js/bootstrap-transition.js"></script>
    <script src="/static/bootstrap/js/bootstrap-alert.js"></script>
    <script src="/static/bootstrap/js/bootstrap-modal.js"></script>
    <script src="/static/bootstrap/js/bootstrap-dropdown.js"></script>
    <script src="/static/bootstrap/js/bootstrap-scrollspy.js"></script>
    <script src="/static/bootstrap/js/bootstrap-tab.js"></script>
    <script src="/static/bootstrap/js/bootstrap-tooltip.js"></script>
    <script src="/static/bootstrap/js/bootstrap-popover.js"></script>
    <script src="/static/bootstrap/js/bootstrap-button.js"></script>
    <script src="/static/bootstrap/js/bootstrap-collapse.js"></script>
    <script src="/static/bootstrap/js/bootstrap-carousel.js"></script>
    <script src="/static/bootstrap/js/bootstrap-typeahead.js"></script>

*/