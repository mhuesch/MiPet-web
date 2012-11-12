var PetView = Backbone.View.extend({

    el:$('#pet-info'),

    initialize:function () {
        this.render();
        this.model = this.options.model;
    },

    render:function () {
        $(this.el).html("<h2>This pet is named "+this.model.get('name')+"</h2>");
        var myEvents = this.model.get('events');
        var eventListView = new EventListView({events: myEvents});
    }
});


var EventView = Backbone.View.extend({

    tagName:'li',

    initialize:function () {
        _.bindAll(this, 'render');
    },

    render:function () {
        $(this.el).html("<span>Title: "+this.model.get('title')+"</span>");
        return this;
    }
});

var EventListView = Backbone.View.extend({

    el:$('#events'),

    initialize:function () {
        _.bindAll(this, 'render', 'appendEvent');
        this.render();
    },

    render:function () {
        var self = this;
        $(this.el).append("<p>This is a list of events</p>");
        $(this.el).append("<ul id='eventlist'></ul>");
        //for this, forget the collection for now, make a new event for each part of the list
        _.each(this.options.events, function(num){
        	console.error(num);
        	var ev = new Event({id:num});
            self.appendEvent(ev);
        }, this);
    },

    appendEvent: function(item){
    	//fetch the item (this should really be done as a collection so it doesn't go sequentially, but
    	// oh well for now. Render the response.
        item.fetch({
            success: function (data) {
                var eventView = new EventView({
            		model: data
        		})
        		$('#eventlist').append(eventView.render().el);
            }
        });
    }
});




