
// ------------------------- User View ------------------------//
var UserView = Backbone.View.extend({

    initialize:function () {
        this.render();
        //this.model = this.options.model;
        //_.bindAll(this, 'render');
    },

    render:function () {
        //UserName = this.model.get('name');
        //UserBio = this.model.get('bio');
        //UserProfPicURL = this.model.get('prof_pic');

        // Get user's attributes
        var variables = this.model.attributes;

        // Compile the template using underscore
        var template = _.template( $("#user_template").html(), variables );

        // Load the compiled HTML into the Backbone "el"
        $(this.el).html( template );
    }
});


// 



// Global variables - naughty!
// But don't know how to have accessor functions...
var PetName = "";       // This pet's name
var PetBirthdate = "";  // Pet's joined date
var PetBio = "";
var PetProfPicURL = "";

// ------------------------- Pet View -------------------------//
var PetView = Backbone.View.extend({

    el:$('#pet-info'),

    initialize:function () {
        this.render();
        this.model = this.options.model;
    },

    //
    // Renders the top of the page (profile picture, bio)
    //
    render:function () {
        PetName = this.model.get('name');
        PetBirthdate = this.model.get('birthdate');// change from joined_date
        PetBio = this.model.get('bio');
        PetProfPicURL = this.model.get('prof_pic');
        petID = this.model.get('id');

        var outputHTML = "";
        outputHTML += "<a class='btn btn-mini btn-info profile-info-button' style='float: left; margin-right: 7px; margin-top: 7px; display: inline;'";
        outputHTML += " data-toggle='modal' href='#edit-profileInfo' onclick='openEditProfileInfo("+petID+")'>";
        outputHTML += "<i class='icon-info-sign icon-white'></i> </a>";
        
        /*
        if (PetProfPicURL == "") // mod by 3 + 1 to not let id # be anything other than v1 v2 v3 (only existing images)
            outputHTML += "<img class='profilePic' src='/static/img/miPetL1v"+ (this.model.get('id')%4+1) +".png' >";
        else
            outputHTML += "<img class='profilePic' id='petProfilePic' src='"+ PetProfPicURL +"' >";
        */
        outputHTML+="<h1 class='timelineTitle' id='petName'> "+PetName+" </h1>";

        //outputHTML+="<span class='petBio' id='petBio'> "+PetBio+" </span>";

        

        //outputHTML += "<span class='birthdate joinDate'> Approx Birthdate: " + PetBirthdate + " </span>"

        $(this.el).html(outputHTML);
        //var myEvents = this.model.get('events');
        /*
        this.model.myEvents.fetch({
            success:function (data) {
                if (data.length == 0)
                	$('#eventlist').html("<li>no events</li>");
                    //no data $('.no-reports').show();
                var eventListView = new EventListView({model: data});
            }
        });*/
        //var eventListView = new EventListView({events: myEvents});
        
    }
});

// -------------------- Event View --------------------//
var EventView = Backbone.View.extend({

    //tagName:'li',

    initialize:function () {
        _.bindAll(this, 'render');
        this.bind("reset", this.updateView);
        this.myID = this.model.get('id');
    },

    // Renders a single event's html
    render:function () {
        var eventID = this.model.get('pk');    
        var milestone = this.model.get('milestone');
        var milestone_name = this.model.get('milestone_name');
        var date_time = moment(this.model.get('moment'));

        var outputString = "";
        
        /* START OLD DISPLAY
        outputString += "<div class='event-listing'>";
        outputString += "<div class='event-listing-title'>";

        // 4 is the none milestone
        if(milestone != 2 && milestone != null && milestone != 'none')
        {
            outputString += "<img class='milestone-img' src='/static/img/icon-milestone.png'>";
            //outputString += "<i class='icon-star'></i>";
        }

        outputString += "<span class='eventTitle' id='eventTitle-"+eventID+"'>"+this.model.get('title')+"</span>";
       // var date_time = moment(this.model.get('moment'));
       // outputString += "<span class='timestamp'>"+date_time.format("MMM Do YYYY")+"</span>";   
        
        outputString += "<span class='editEvent' id='editEvent-"+eventID+"'>";
        outputString += "<a class='btn btn-mini edit-button' id='btn-edit-event'";
        outputString += " data-toggle='modal' href='#edit-event' onclick='openEditEvent("+eventID+")'>";
        outputString += "<i class='icon-pencil'></i> </a>";
        outputString += "</span>";
        outputString += "</div> <!-- end event-listing-title -->";
        

        outputString += "<div class='event-body'>";

       // if(milestone != 1 && milestone != null && milestone != 'none')
        if(milestone == 1)
        {
            outputString += "<span class='milestone'> Milestone: " + milestone_name + "</span> <br/>";
        } 
                            
        outputString += "<span class='eventDesc' id='eventDesc-"+eventID+"'>"+this.model.get('description')+"</span>"; 

        outputString += '<div id="media'+this.model.get('pk')+'"class="event-media"></div>';

    // Use Moment.js to display time nicely.
    // Docs about formatting here: http://momentjs.com/docs/#/displaying/format/
        var date_time = moment(this.model.get('moment'));
        //outputString += "<div class='timestamp' id='eventDateTime-"+eventID+"'>"+date_time.format("MMM D YYYY, h:mm a")+"</div>";
        outputString += "<div class='timestamp' id='eventDateTime-"+eventID+"'>"+date_time.format("MMM D YYYY")+"</div>";
        
        //outputString += "<p>"+this.model.get('pk')+"</p>"; <-- this is how you get the event ID now
        /*
        right now we need the ID for the event to get the media associated with the event.
        When the event is created from a collection, I don't think it has an ID associated with it.
        We need this ID to get the media.
        *
        //outputString += ""+this.model.media_url+"";
        outputString += "</div> <!-- end event-body --> </div> <!-- end event-listing -->";
        END OLD DISPLAY*/

        //outputString += "<div class='event-listing'>";
        var eventTitle = this.model.get('title');
        var eventDesc = this.model.get('description');

        outputString += "<hr class='eventDivider'/>";
        outputString += "<div class='event'>";
        outputString += "<div class='event-header'>";

        // really treated as a boolean field, 1 = true, it is a milestone
        if(milestone != 2 && milestone != null && milestone != 'none')
        {
            outputString += "<img class='milestone-img' src='/static/img/icon-milestone.png'>";
            //outputString += "<i class='icon-star'></i>";
        }
   
        outputString += "<span class='eventDate'>"+date_time.format("MMM Do YYYY")+"</span>";   
        
        outputString += "<span class='editEvent' id='editEvent-"+eventID+"'>";
        outputString += "<a class='btn btn-mini edit-button disabled' id='btn-edit-event'";
        outputString += " data-toggle='modal' href='#edit-event' onclick='openEditEvent("+eventID+")'>";
        outputString += "<i class='icon-pencil'></i> </a>";
        outputString += "</span>";

        outputString += "</div> <!-- end event-header-->";
        outputString += "<br/><br/>";
        outputString += "<div class='event-body'>";
        outputString += "<div class='eventText'>";
        //outputString += "<span class='eventTitle' id='eventTitle-"+eventID+"'> Title: "+eventTitle+"</span>";
        //outputString += "<br/>";
        outputString += "<span class='eventDesc' id='eventDesc-"+eventID+"'>"+eventDesc+"</span>"; 
        outputString += "</div> <!-- end eventText-->";

        outputString += '<div id="media'+eventID+'"class="event-media"></div>';
        
        outputString += "</div> <!-- end event-body --> </div> <!-- end event-listing -->";





        $(this.el).html(outputString);
        var eventID = this.model.get('pk')
        var myMedia = this.model.get('media');
        
        //note: this probably shouldn't happen if there is no media (i.e. myMedia is blank)
        //		will fix later if there's time
        if(myMedia.length!=0){
			this.model.myMedia.url = '/api/v1/event/' + this.model.get('pk') + '/media/';
			this.model.myMedia.fetch({
				success:function (data) {
					if (data.length == 0)
						;
						//no data $('.no-reports').show();
					var mediaListView = new MediaListView({model: data, model_id:eventID});
				}
			});
        }


        return this;
    }
});

// -------------------- Event List View --------------------//
var EventListView = Backbone.View.extend({

    el:$('#events'),

    initialize:function () {
        _.bindAll(this, 'render', 'appendEvent', 'remove');
        this.eventViews = new Array();
        this.render();
    },

    render:function () {
        var self = this;
        // we had these displaying for awhile, so if you're looking for them... yeah
        //$(this.el).append("<span class='birthdate joinDate'> Pet's Birthday: " + PetBirthdate + "</span> ");
        //$(this.el).append("<br/> Events in "+ PetName +"'s timeline:");

        $(this.el).append("<div id='eventlist'></div>");
        /*//for this, forget the collection for now, make a new event for each part of the list
        _.each(this.options.events, function(num){
        	console.error(num);
        	var ev = new Event({id:num});
            self.appendEvent(ev);
        }, this);
        */
        _.each(this.model.models, function(item){
        	self.appendEvent(item);
        }, this);
    },

    appendEvent: function(item){
    	/*//fetch the item (this should really be done as a collection so it doesn't go 
    	// sequentially, but oh well for now). Render the response with EventView.
        item.fetch({
            success: function (data) {
                var eventView = new EventView({
            		model: data
        		})
        		$('#eventlist').append(eventView.render().el);
            }
        });
        */
        var eventView = new EventView({model: item});
        this.eventViews.push({ "ID":item.get('pk'), "View":eventView});
        $('#eventlist').append(eventView.render().el);
    },
    /*
    remove:function()
    {
    	var view = $.grep(this.eventViews, function(e){ return e.ID == options.index; })[0].View;
    	view.reset();
    }*/
});

/* reference:
http://stackoverflow.com/questions/7168987/how-to-convert-a-youtube-video-url-to-the-iframe-embed-code-using-jquery-on-pag */
function youtubeToEmbed(mediaURL)
{
    return mediaURL.replace(/(?:http:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=)?(.+)/g,
                '<iframe width="420" height="345" src="http://www.youtube.com/embed/$1" frameborder="0" allowfullscreen></iframe>');
}


// -------------------- Media View --------------------//
//given a media object this should work fine. 
var MediaView = Backbone.View.extend({
	tagname: 'p',
    initialize:function () {
        _.bindAll(this, 'render');
        //console.log(this.model);
    },

    render:function () {
        var outputString = "";
        var mediaURL = this.model.get('media_url');

        // later reference....
        // http://stackoverflow.com/questions/169625/regex-to-check-if-valid-url-that-ends-in-jpg-png-or-gif
        
        // check if these extensions exist in the url string(index >= 0)
        if(mediaURL.indexOf('.png') >=0 || mediaURL.indexOf('.jpg') >= 0 || mediaURL.indexOf('.jpeg') >= 0 || mediaURL.indexOf('.gif') >= 0 )
        {
            outputString += "<img class='eventMedia' id='eventMedia-" + this.model.get('pk') +"' src='" + mediaURL + "' >";
        }
        else if(mediaURL.indexOf('youtube.com') >=0 || mediaURL.indexOf('youtu.be') >=0 )
        {
            
            outputString += "<div class='video-wrapper'>";
            outputString += "<div class='video-container'>";

            //outputString += "<iframe width='640' height='480' src='" + mediaURL + '" ';
            //outputString += "frameborder='0' allowfullscreen> </iframe>";

            outputString += youtubeToEmbed(mediaURL);
            
            outputString += "</div> <!-- end video-container -->";
            outputString += "</div> <!-- end video-wrapper -->";
        }
        else
        {
            // Just turn the media link into a link w/ URL as its text
            outputString += "<a target='_blank' href='" + mediaURL + "' >"+ mediaURL +" </a>";
        }

        $(this.el).html(outputString);  
        return this;
    }
});



// -------------------- Media List View --------------------//
var MediaListView = Backbone.View.extend({
	el:$('#media'),

    initialize:function () {
        _.bindAll(this, 'render', 'appendMedia');
        this.render();
        this.mydivname = $('#media'+this.options.model_id);
    },

    render:function () {
        var self = this;
        //need this div name to change depending on the event, so was going to use the event's
        //id to change it (as eventlist###)
        //$(this.mydivname).append("<p>List of media</p>");
        _.each(this.model.models, function(item){
        	self.appendMedia(item);
        }, this);
    },

    appendMedia: function(item){
        var mediaView = new MediaView({model: item});
        $('#media'+this.options.model_id).append(mediaView.render().el);
    }


});







