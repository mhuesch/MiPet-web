
// Global variables - naughty!
// But don't know how to have accessor functions...
var PetName = ""; // This pet's name
var PetJoinDate = ""; // Pet's joined date

// ---------- Pet View ----------//
var PetView = Backbone.View.extend({

    el:$('#pet-info'),

    initialize:function () {
        this.render();
        this.model = this.options.model;
    },

    render:function () {
        PetName = this.model.get('name');
        PetJoinDate = this.model.get('joined_date');
        PetBio = this.model.get('bio');
        PetProfPicURL = this.model.get('prof_pic');
        var outputHTML = "";
        outputHTML += "<img class='profilePic' src='"+ PetProfPicURL +"' >";
        outputHTML += "<h1 class='timelineTitle'>"+ PetName +"</h1>";
        
        outputHTML += "<span class='petBio'>" + PetBio + "... bio text here... </span>";
        outputHTML += "<span class='joinDate'> Joined miPet: " + PetJoinDate;
        $(this.el).html(outputHTML);
        var myEvents = this.model.get('events');
        this.model.myEvents.fetch({
            success:function (data) {
                if (data.length == 0)
                	$('#eventlist').html("<li>no events</li>");
                    //no data $('.no-reports').show();
                var eventListView = new EventListView({model: data});
            }
        });
        //var eventListView = new EventListView({events: myEvents});
        
    }
});

// ---------- Event View ----------//
var EventView = Backbone.View.extend({

    //tagName:'li',

    initialize:function () {
        _.bindAll(this, 'render');
    },

    render:function () {
                                     
        var outputString = "";
        /*outputString += "<a class='btn event-btn'";
        outputString += "<span class='eventTitle'>Title: "+this.model.get('title')+"</span>"
        outputString += "<br/>"
        outputString += "<span class='eventDesc'>Description: "+this.model.get('description')+"</span>"
        outputString += "</a>";*/

        outputString += "<div class='event-listing'>";
        outputString += "<div class='event-listing-title'>";
        outputString += "<span class='eventTitle'>"+this.model.get('title')+"</span>";
        outputString += "<span class='timestamp' style='float: right; font-weight: normal;'>"+this.model.get('moment')+"</span>";        
        outputString += "</div>";
        outputString += "<span class='eventDesc'>"+this.model.get('description')+"</span>";
        //outputString += ""+this.model.media_url+"";
        outputString += "</div>";
        $(this.el).html(outputString);

        return this;
    }
});

// ---------- Event List View ----------//
var EventListView = Backbone.View.extend({

    el:$('#events'),

    initialize:function () {
        _.bindAll(this, 'render', 'appendEvent');
        this.render();
    },

    render:function () {
        var self = this;
        $(this.el).append("<p>List of events in "+ PetName +"'s timeline.</p>");
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
        $('#eventlist').append(eventView.render().el);
    }
});



// ---------- Media View ----------//
var MediaView = Backbone.View.extend({

    initialize:function () {
        _.bindAll(this, 'render');
    },

    render:function () {
        var outputString = "<img src=\"" + this.media_url + "\">";

        $(this.el).html(outputString);
        return this;
    }
});



// ---------- Media List View ----------//
var MediaListView = Backbone.View.extend({

    


});







