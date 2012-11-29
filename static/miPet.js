/*function deleteEvent(petid)
{
	// can we add an "are you sure?" box...?
	// does it delete the media as well, hold a link to it, what?
	alert('delete event called with petid: '+petid);
}*/

function editEvent()
{
	var eventID = document.getElementById("edit-event-id").value;
	//alert('edit event called for event with ID: '+eventID/*+ '  and eventid: '+eventid*/);
	
	
	
	
	var event = new Event({'pk':eventID}); /*({'title':newTitle, 'description':newDesc});*/
	event = event.fetch({
		success: function(model, response) {
			var temp = new Event(response);
			editEventSecond(temp);
		}
	});
	
}
function editEventSecond(event){
	var newTitle = document.getElementById("edit-input-title").value;
	var newDesc = document.getElementById("edit-input-text").value;
	
	event.set({'title':newTitle, 'description':newDesc});
	
	
	event.save(event,{
		success: function(model) {
			document.location.reload();
		}
	});
}

function editProfileInformation(petid)
{
	alert('edit event called with petid: '+petid);
}


//------------- methods for creating a new event (with and without media ---------------//

/* 
 * Name:    addEvent
 * Purpose: add an event object to the database, and start media creation if there is an 
 			associated media
 * Params:  id - the ID of the pet that this event will belong to. 
 * Returns: continues to create media if necessary.
 */
function addEvent(id)
{
	//if(!document.getElementById("input-isInterval").checked){
   //     document.getElementById("input-end").value = document.getElementById("input-start").value;
   // }
	
	/*
	var inputs = "";
	inputs += "input-title: " + document.getElementById("input-title").value + "\n";
	inputs += "input-text: " + document.getElementById("input-text").value + "\n";
	inputs += "input-date: " + document.getElementById("input-date").value + "\n";
	//inputs += "input-media: " + document.getElementById("input-media").value + "\n";
	alert(inputs);
	*/

	// Getting the Pet ID from the url
	var petID = id;
	

	var eventObject = new Object();

	eventObject.pets = [petID]; //parseInt is a built-in javascript function
	eventObject.title = document.getElementById("input-title").value; 
	eventObject.description = document.getElementById("input-text").value;
	// Media is an array because there can be multiple media objects with an event
	eventObject.media = [];
	eventObject.milestone = 4;
	var moment = document.getElementById("input-date").value;
	if(moment != null && moment != ""){
		eventObject.moment = moment;
	}
	
	// Get the values of both,
	// even though there should only be one input visible/chosen
	// ...hopefully this doesn't break it if null...??....
	var mediaURL = document.getElementById("input-media-url").value;
	//console.log(mediaURL);
	//for uploading: sets media to the first file that's been uploaded
	// (i.e. if multiple entered, will only use first)
	var mediaUpload = document.getElementById("input-media-upload").files[0];
	
	var media;

	// pretty sure this is redundant/bad code
	// and could be done in a better way
	
	//if using existing image at given url...
	if (document.getElementById('imageURL').checked)
	{
		
		media = mediaURL;
		
	}
	else // if uploading...
	{
		media = mediaUpload;
	}
			
	// Create a new model for backbone
	var event = new Event();
	var eventID;

	// Sends a POST request to the server to create it on the server
	event.save(eventObject, {
		success: function (event, response){
			eventID = response.pk;


			//change this to if there is media, somehow......
			
			// checking for equal because both could have values
			// even if only one is meant to be used,
			// as indicated by radio button

			if(media && media == mediaUpload)
			{
				//if it's an uploaded file, call upload with the file
				uploadEventMedia(media, eventID);
				
			}
			else if (media && media == mediaURL)
			{
				//else call addMedia with the url that they're using and the eventID
				addMedia(media, eventID);
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
 * Name:    uploadEventMedia
 * Purpose: upload the file to imgur and return the url
 * Params:  file - the file to upload to imgur
            eventID
 * Returns: continues the media creation path
*/


function uploadEventMedia(file, eventID) {
   // file is from a <input> tag or from Drag'n Drop
   // Is the file an image?
   if (!file) return;
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
      // The URL of the image is:
      var url = JSON.parse(xhr.responseText).upload.links.original;
      addMedia(url, eventID);
   }
}

/* 
 * Name:    addMedia
 * Purpose: create a media object and push it to the server
 * Params:  url - the url that the media is displayed at: either returned from imgur or 
 					added by the user
            eventID
 * Returns: nothing
 */
function addMedia(url, eventID)
{
	var media = new Media();
    var mediaObject = {
        "event": "",
        "media_url": "",
        "media_type": "PIC" // necessary....??
    };
    
    url = url.replace("https://","http://"); // we're still not sure if this matters
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

//---------------------- methods for creating a new pet ----------------------------//


/* 
 * Name:    addPetProfile
 * Purpose: ...
 * Params:  none
 * Returns: ...
 */
function addPetProfile(owner_id)
{
	/*
    var inputs = "";
    inputs += "input-petName: " + document.getElementById("input-petName").value + "\n";
    inputs += "input-petBio: " + document.getElementById("input-petBio").value + "\n";
    inputs += "input-petProfPic: " + document.getElementById("input-petProfPic").value + "\n";
    inputs += "input-petBirthdate: " + document.getElementById("input-petBirthdate").value + "\n";
	
    alert(inputs);
    */
    
	//changed creating object with default fields to just creating an object. 
	//makes validation easier
	var petProfileObject = new Object(owner_id);
	
	//adds fields to the object, with validation for null values
    petProfileObject.name = document.getElementById("input-petName").value; 
    var bday = document.getElementById("input-petBirthdate").value;
    if(bday != null && bday != ""){
    	petProfileObject.birthdate = bday;
    }
    petProfileObject.bio = document.getElementById("input-petBio").value;
    petProfileObject.events = [];
    //set owner to default for now
    petProfileObject.owner = owner_id;
    
	var profPicURL = document.getElementById("input-media-url").value;
	var profPicUpload = document.getElementById("input-media-upload").files[0];
	var profPic;
	
	//if using existing image at given url...
	if (document.getElementById('imageURL').checked)
	{
		if(profPicURL){
			createPet(profPicURL, petProfileObject);
		}else{//if it's blank
			createPet("",petProfileObject);
		}
		
	}
	else // if uploading...
	{
		if(profPicUpload){
			uploadProfilePic(profPicUpload, petProfileObject);
		}
		else{//if it's blank
			createPet("",petProfileObject);
		}
	}
}

	

/*
 * Name:    uploadProfilePic
 * Purpose: upload a user's photo to imgur
 * Params:  file - the file to upload
            obj - the object with the rest of the parameters for the pet (to be passed to the next function)
 * Returns: doesn't return, but continues to createPet()
 */
function uploadProfilePic(file, obj) {
   // file is from a <input> tag 
   if (!file) return;
   
   //Build a FormData object
   var fd = new FormData();
   fd.append("image", file); // Append the file
   fd.append("key", "628a7999f0bef3448b20e9a665a69ed8"); // Get your own key: http://api.imgur.com/
	
   // Create the XHR (Cross-Domain XHR FTW!!!)
   var xhr = new XMLHttpRequest();
   xhr.open("POST", "http://api.imgur.com/2/upload.json"); // Boooom!
   xhr.send(fd);
   xhr.onload = function() {
      // Big win!
      //console.log("loaded");
      
      // The URL of the image is:
      var url = JSON.parse(xhr.responseText).upload.links.original;
      //create a pet object with this URL
      createPet(url, obj);
   }
   
}	

function createPet(url, petProfileObject)
{
	//set profile pic as the url that was just created
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
            alert('Creating pet profile failed :( Sorry about that.');
        }
    });
}
