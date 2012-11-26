
/* 
 * Name:    addEvent
 * Purpose: ...
 * Params:  none
 * Returns: ...
 */
    function addEvent()
    {
        //if(!document.getElementById("input-isInterval").checked){
       //     document.getElementById("input-end").value = document.getElementById("input-start").value;
       // }
        
        var inputs = "";
        
        inputs += "input-title: " + document.getElementById("input-title").value + "\n";
        inputs += "input-text: " + document.getElementById("input-text").value + "\n";
        inputs += "input-date: " + document.getElementById("input-date").value + "\n";
        //inputs += "input-media: " + document.getElementById("input-media").value + "\n";
        
        //alert(inputs);

        //var now = new Date();
        //var hourNow = now.getHours();
        //var minNow = now.getMinutes();

        // Getting the Pet ID from the url
		var url = document.URL;
		var urlpart = url.match(/e\/[0-9]+/gi)[0];
		var petID = urlpart.match(/[0-9]+/gi)[0];
        

        var eventObject = {
            "pets": "",
            "title": "",
            "description": "",
            "media": [],
            "moment": ""
        };

        eventObject.pets = [parseInt(petID)]; //parseInt is a built-in javascript function
        eventObject.title = document.getElementById("input-title").value; 
        eventObject.description = document.getElementById("input-text").value;
        // Media is an array because there can be multiple media with an event
        eventObject.media = [];
        eventObject.moment = document.getElementById("input-date").value;
        
        var mediaURL = document.getElementById("input-media").value;
		
        // Create a new model for backbone
        var event = new Event();
        var eventID;

        // Sends a POST request to the server to create it on the server
        event.save(eventObject, {
        	success: function (event, response){
        		eventID = response.pk;
        		if(mediaURL)
                {
	        		addMedia(mediaURL, eventID);
	        	}
                // Force page to reload (to show added event)
                // if there is no media
                else
                {
	        		window.location.reload();
	        	}
        	},
        	error: function (event){
        		alert('Adding event failed :( Sorry about that.');
        	}
        });
        
        
    }


/* 
 * Name:    addPetProfile
 * Purpose: ...
 * Params:  none
 * Returns: ...
 */
function addPetProfile()
{
    var inputs = "";
    inputs += "input-petName: " + document.getElementById("input-petName").value + "\n";
    inputs += "input-petBio: " + document.getElementById("input-petBio").value + "\n";
    inputs += "input-petProfPic: " + document.getElementById("input-petProfPic").value + "\n";
    inputs += "input-petBirthdate: " + document.getElementById("input-petBirthdate").value + "\n";

    //alert(inputs);

    //var url = document.URL;
    //var urlpart = url.match(/e\/[0-9]+/gi)[0];
    //var petID = urlpart.match(/[0-9]+/gi)[0];
    
    //var now = new Date();
    //var hourNow = now.getHours();
    //var minNow = now.getMinutes();

	var url = document.getElementById("input-petProfPic").value;
	//console.log(url);
	url = url.replace("https://","http://");
    var petProfileObject = {
            "name": "",
            "birthdate": "",
            "bio": "",
            "prof_pic": "",
            "events": []
        };

	/*if(url != "" ||url !=null){
		petProfileObject.prof_pic = url;
    }*/

    petProfileObject.name = document.getElementById("input-petName").value; 
    petProfileObject.birthdate = document.getElementById("input-petBirthdate").value;
    petProfileObject.bio = document.getElementById("input-petBio").value;
    //url = document.getElementById("input-petProfPic").value;
    petProfileObject.prof_pic = url;
	
    
    // ----------------------------------
    var pet = new Pet();
    pet.save(petProfileObject, {
        success: function (pet){
        	//alert('creation of profile worked');
            
            // Refresh the page to show the newly created profile
            window.location.reload();
        },
        error: function (pet){
            alert('Creating pet profile failed');
        }
    });
    // ----------------------------------

}


/* 
 * Name:    addMedia
 * Purpose: ...
 * Params:  url
            eventID
 * Returns: ...
 */
function addMedia(url, eventID)
{
	var media = new Media();
    var mediaObject = {
        "event": "",
        "media_url": "",
        "media_type": "PIC"
    };
    url = url.replace("https://","http://");
    mediaObject.event = [eventID];
    mediaObject.media_url = url;
    media.save(mediaObject, {
		success: function (media){
			//alert('media created');
			window.location.reload();
		},
		error: function (media){
			alert('Media creation failed');
		}
	});
}

	

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