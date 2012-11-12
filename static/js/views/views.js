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

    tagName:'ul',

    initialize:function () {
        _.bindAll(this, 'render');
    },

    render:function () {
        $(this.el).html("<li><span>Title: "+this.model.get('title')+"</span></li>");
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
        _.each(this.options.events, function(num){
        	console.error(num);
        	var ev = new Event({id:num});
            self.appendEvent(ev);
        }, this);
    },

    appendEvent: function(item){
        item.fetch({
            success: function (data) {
                var eventView = new EventView({
            		model: data
        		})
        		$('#eventlist',this.el).append(eventView.render().el);
            }
        });
    }
});




