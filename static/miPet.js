
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
        /*
        inputs += "input-title: " + document.getElementById("input-title").value + "\n";
        inputs += "input-text: " + document.getElementById("input-text").value + "\n";
        inputs += "input-date: " + document.getElementById("input-date").value + "\n";
        //inputs += "input-media: " + document.getElementById("input-media").value + "\n";
        */
        //alert(inputs);

        //var now = new Date();
        //var hourNow = now.getHours();
        //var minNow = now.getMinutes();

        // Getting the Pet ID from the url
		var url = document.URL;
		var urlpart = url.match(/e\/[0-9]+/gi)[0];
		var petID = urlpart.match(/[0-9]+/gi)[0];
        

        var eventObject = new Object();

        eventObject.pets = [parseInt(petID)]; //parseInt is a built-in javascript function
        eventObject.title = document.getElementById("input-title").value; 
        eventObject.description = document.getElementById("input-text").value;
        // Media is an array because there can be multiple media objects with an event
        eventObject.media = [];
        var moment = document.getElementById("input-date").value;
        if(moment != null && moment != ""){
        	eventObject.moment = moment;
        }
        var media = document.getElementById("input-media").files[0];
		
        // Create a new model for backbone
        var event = new Event();
        var eventID;

        // Sends a POST request to the server to create it on the server
        event.save(eventObject, {
        	success: function (event, response){
        		eventID = response.pk;
        		if(media)
                {
	        		upload(media, eventID);
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
	/*
    var inputs = "";
    inputs += "input-petName: " + document.getElementById("input-petName").value + "\n";
    inputs += "input-petBio: " + document.getElementById("input-petBio").value + "\n";
    inputs += "input-petProfPic: " + document.getElementById("input-petProfPic").value + "\n";
    inputs += "input-petBirthdate: " + document.getElementById("input-petBirthdate").value + "\n";
	*/
    //alert(inputs);

    //var url = document.URL;
    //var urlpart = url.match(/e\/[0-9]+/gi)[0];
    //var petID = urlpart.match(/[0-9]+/gi)[0];
    
    //var now = new Date();
    //var hourNow = now.getHours();
    //var minNow = now.getMinutes();

	var url = document.getElementById("input-petProfPic").value;
	//gets rid of https
	url = url.replace("https://","http://");
	
	//changed creating object with default fields to just creating an object. 
	//makes validation easier
	var petProfileObject = new Object();
	
	//adds fields to the object, with validation for null values
    petProfileObject.name = document.getElementById("input-petName").value; 
    var bday = document.getElementById("input-petBirthdate").value;
    if(bday != null && bday != ""){
    	petProfileObject.birthdate = bday;
    }
    petProfileObject.bio = document.getElementById("input-petBio").value;
    if(url != null && url != ""){
    	petProfileObject.prof_pic = url;
    }else{
    	petProfileObject.prof_pic = " ";
    }
    petProfileObject.events = [];
	
    
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

function upload(file, eventID) {
   // file is from a <input> tag or from Drag'n Drop
   // Is the file an image?
   if (!file) return;
	//console.log("in the function");
   // It is!
   // Let's build a FormData object
   var fd = new FormData();
   fd.append("image", file); // Append the file
   fd.append("key", "628a7999f0bef3448b20e9a665a69ed8"); // Get your own key: http://api.imgur.com/
	
   // Create the XHR (Cross-Domain XHR FTW!!!)
   var xhr = new XMLHttpRequest();
   xhr.open("POST", "http://api.imgur.com/2/upload.json"); // Boooom!
   xhr.send(fd);
   xhr.onload = function() {
      // Big win!
      console.log("loaded");
      
      // The URL of the image is:
      var url = JSON.parse(xhr.responseText).upload.links.original;
      //console.log(url);
      addMedia(url, eventID);
   }
   
	
   // Ok, I don't handle the errors. An exercice for the reader.
   // And now, we send the formdata
   
   
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