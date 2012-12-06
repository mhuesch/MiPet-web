function imgURLTooltip()
{
	var outputString = "";
	outputString += "Valid image URLs end with .png, .jpg, .jpeg or .gif.\n\n";
	outputString += "You can also use a YouTube link in the form of:\n";
	outputString += "http://www.youtube.com/watch?v=-zVCYdrw-1o\n";
    outputString += "OR http://youtu.be/-zVCYdrw-1o";
    alert(outputString);
}

function openEditEvent(eventID)
{   
	var tempEvent = petEvents.get(eventID);
	var title = "eventTitle-"+eventID;
	var desc = "eventDesc-"+eventID;
	var date = "eventDateTime-"+eventID;
	var isMilestone;

   /* var outputString = ""; 
//    outputString += "edit-input-title: " + document.getElementById("edit-input-title").value + "\n";
//    outputString += "edit-input-text: " + document.getElementById("edit-input-text").value+ "\n";
//    outputString += "edit-input-date: " + document.getElementById("edit-input-date").value + "\n";

	outputString += "title: " + title + "\n";
	outputString += "desc: " + desc + "\n";
	outputString += "date: " + date + "\n";

	//outputString += "eventTitle: " + document.getElementById(title).value + "\n";
	//outputString += "eventDesc: " + document.getElementById(desc).value + "\n";
	//outputString += "eventDateTime: " + document.getElementById(moment).value + "\n";

   // alert(outputString);
	*/
	//document.getElementById("edit-input-title").value = document.getElementById(title).innerHTML; 
	document.getElementById("edit-input-text").value = tempEvent.get('description');

	//var date_field = document.getElementById(date).innerHTML;
    var date_field = tempEvent.get('moment');
	document.getElementById("edit-input-date").value = moment(date_field).format("YYYY-MM-DD");
	
	if(tempEvent.get('milestone')==3)
	{
		isMilestone=true;
	}else{
		isMilestone=false;
	}
	
	document.getElementById("edit-input-milestone").checked = isMilestone;
	document.getElementById("edit-event-id").value =  eventID;
  //  edit-input-media-url
  //  edit-input-media-upload*/

    var medias = tempEvent.get('media');
    if (medias.length != 0) {
        var mediaPK = medias[0];
        var media = "eventMedia-" + mediaPK;
        var tempURL = document.getElementById(media).src;
        if(tempURL){
        	document.getElementById("edit-input-media-url").value = tempURL;
        }else{
        	document.getElementById("edit-input-media-url").value = document.getElementById(media).href;
        }
    } else {
        document.getElementById("edit-input-media-url").value = "";
    }

}


function openEditProfileInfo(petID)
{
	//alert('open edit prof info with petid: ' + petID);
	//the model for the pet is stored as a global variable, so just use that instead of 
	//using getElementById for this funtion
	document.getElementById("prof-input-petName").value = pet.get('name');
	document.getElementById("prof-input-petBio").value = pet.get('bio');
	document.getElementById("prof-input-media-url").value = pet.get('prof_pic'); 
	document.getElementById("prof-input-petBirthdate").value = pet.get('birthdate');
}



function deleteEvent(eventID){
	var eventID = document.getElementById("edit-event-id").value;
	/*
	console.log(eventID);
	var tempEvent = petEvents.get(eventID);
	petEvents.remove(tempEvent);
	*/
	var tempEvent = new Event({pk:eventID});
	console.log(tempEvent);
	tempEvent.destroy({
		success: function(model, response) {
			window.location.reload();
		},
		error: function(model){
			
		}
	});
	//console.log(tempEvent);
	//tempEvent.destroy();
	//petEvents.remove(tempEvent);
	
}

//simple event validation
function validateEditEvent(id)
{
	var x=document.getElementById("edit-input-text").value;
	if (x==null || x=="")
	{
		alert("Description must be filled out");
	}
	else{
		editEvent(id);
	}
}

function editEvent()
{
	var eventID = document.getElementById("edit-event-id").value;
	//alert('edit event called for event with ID: '+eventID/*+ '  and eventid: '+eventid*/);
	
	//collection of events is stored in the window, so get this event from there
	var event = window.petEvents.get(eventID);
	
	var params = new Object();
	params.title = "";
	params.description = document.getElementById("edit-input-text").value;
    var userDate = document.getElementById("edit-input-date").value;
    params.moment = moment(userDate).format("YYYY-MM-DDTHH:mm:ssZ");
    var isMilestone = document.getElementById("edit-input-milestone").checked;
    if(isMilestone)
    {
    	params.milestone = 3;
    }else{
    	params.milestone = 2;
    }
    
	
	/*if new media is present/checked 
	 *	if it's URL
		 *	(include current as hidden field + check for equivalence)
		 *	set current media to empty array and delete that media.
		 *	call addMedia with current event id (should refresh page when done)
	 *	if it's upload: set media to empty array
	 *		call uploadEventMedia with file + eventID (will refresh page when done)
	 */
	 
	 var addmedia;
	if(document.getElementById('edit-event-imageURL').checked)
	{	
		var mediaURL = document.getElementById('edit-input-media-url').value;
		if(mediaURL)
		{
			var addmedia = 1;
			params.media = [];
		}
	}
	else
	{
		//uploading image
		
		var mediaUpload = document.getElementById("edit-input-media-upload").files[0];
		if(mediaUpload)
		{
			var addmedia = 2;
			params.media = [];
		}
		else
		{
			//do nothing
		}
	}
	 
	event.set(params);
	
	
	event.save(event,{
		success: function(model) {
			if(addmedia){
				if(addmedia==1)
				{
					addMedia(mediaURL, eventID);
				}else{
					uploadEventMedia(mediaUpload, eventID);	
				}
			}
			else{
				document.location.reload();
			}
		}
	});
}

function editProfile(petid)
{
	//pet is a global variable in this window, so we don't need to get it again.
	pet = window.pet;
	//get the new name/bio/etc 
	var params = new Object();
	params.name = document.getElementById("prof-input-petName").value; 
	params.bio = document.getElementById("prof-input-petBio").value;
	params.birthdate = document.getElementById("prof-input-petBirthdate").value;
    
    if (document.getElementById('profile-imageURL').checked)//if URL button is checked, otherwise need to upload. 
	{
		params.prof_pic = document.getElementById("prof-input-media-url").value;
		saveProfile(params);
	}else{
		var uploadPic = document.getElementById("prof-input-media-upload").files[0];
		uploadNewProfilePicture(uploadPic, params);
	}
}

function uploadNewProfilePicture(file, params) {
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
      params.prof_pic = url;
      saveProfile(params);
   }
   
}

//one function to save the parameters of a pet's profile, given the new parameters.
function saveProfile(params)
{
	pet = window.pet;
	
	pet.set(params);
	
	pet.save(pet,{
		success: function(model) {
			document.location.reload();
		}
	});
}

//------------- methods for creating a new event (with and without media ---------------//
//simple event validation
function validateAddEvent(id)
{
	var x=document.getElementById("input-text").value;
	if (x==null || x=="")
	{
		alert("Description must be filled out");
	}
	else{
		addEvent(id);
	}
}

/* 
 * Name:    addEvent
 * Purpose: add an event object to the database, and start media creation if there is an 
 			associated media
 * Params:  id - the ID of the pet that this event will belong to. 
 * Returns: continues to create media if necessary.
 */
function addEvent(id)
{
	// Getting the Pet ID from the url
	var petID = id;
	
	var eventObject = new Object();

	eventObject.pets = [petID]; //parseInt is a built-in javascript function
	eventObject.description = document.getElementById("input-text").value; 
	eventObject.title = "";
	// Media is an array because there can be multiple media objects with an event
	eventObject.media = [];

	//eventObject.milestone = 4;
	if(document.getElementById("input-milestone").checked)
	{
		eventObject.milestone = 3;
	}else{
		eventObject.milestone = 2;
	};
	var moment = document.getElementById("input-date").value;
	if(moment != null && moment != ""){
		eventObject.moment = moment;
	}
	
	// Get the values of both,
	// even though there should only be one input visible/chosen
	// ...hopefully this doesn't break it if null...??....
	var mediaURL = document.getElementById("input-media-url").value;
	//for uploading: sets media to the first file that's been uploaded
	// (i.e. if multiple entered, will only use first)
	var mediaUpload = document.getElementById("input-media-upload").files[0];
	
	var media;

	// pretty sure this is redundant/bad code
	// and could be done in a better way
	
	//if using existing image at given url...
	if (document.getElementById('event-imageURL').checked)
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

//validation for adding a pet profile
function validateAddPet(owner_id)
{
	var x=document.getElementById("input-petName").value;
	if (x==null || x=="")
	{
		alert("Pet name must be filled out");
	}
	else{
		addPetProfile(owner_id);
	}
}


/* 
 * Name:    addPetProfile
 * Purpose: ...
 * Params:  none
 * Returns: ...
 */
function addPetProfile(owner_id)
{
	//changed creating object with default fields to just creating an object. 
	//makes validation easier
	var petProfileObject = new Object(owner_id);
	
	//adds fields to the object, with validation for null values
    petProfileObject.name = document.getElementById("input-petName").value; 
    var bday = document.getElementById("input-petBirthdate").value;
    if(bday != null && bday != ""){
    	petProfileObject.birthdate = bday;
    }
    var bio = document.getElementById("input-petBio").value;
    if(bio)
    {
    	petProfileObject.bio = bio;
    }else{
    	petProfileObject.bio = "";
    }
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
