
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
    // join date defaults to current date/time

    //alert(inputs);

    //var url = document.URL;
    //var urlpart = url.match(/e\/[0-9]+/gi)[0];
    //var petID = urlpart.match(/[0-9]+/gi)[0];
    
    //var now = new Date();
    //var hourNow = now.getHours();
    //var minNow = now.getMinutes();

	var url = document.getElementById("input-petProfPic").value;
	console.log(url);
	if(url== "" ||url==null){
		var petProfileObject = {
			"name": "",
			"bio": "",
			"prof_pic": "",
			"events": []
		};
    }else{
    	var petProfileObject = {
			"name": "",
			"bio": "",
			"prof_pic": "",
			"events": []
		};
		petProfileObject.prof_pic = url;
    }

    petProfileObject.name = document.getElementById("input-petName").value; 
    petProfileObject.bio = document.getElementById("input-petBio").value;
    var url = document.getElementById("input-petProfPic").value;
	
    
    // ----------------------------------
    var pet = new Pet();
    pet.save(petProfileObject, {
        success: function (pet){
        	alert('creation worked');
        },
        error: function (pet){
            alert('creating pet profile failed');
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