var PetView = Backbone.View.extend({

    tagName:'div',

    initialize:function () {
        this.render();
    },

    render:function () {
        $(this.el).append("<h2>This pet is named "+this.model.get('name')+"</h2>");
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
        this.collection = this.options.myPet.myEvents;
        this.render();
    },

    render:function () {
        var self = this;
        $(this.el).append("<p>This is a list of events</p>");
        $(this.el).append("<ul></ul>");
        _(this.collection.models).each(function(item){
            self.appendEvent(item);
        }, this);
    },

    appendEvent: function(item){
        var eventView = new EventView({
            model: item
        })
        $('ul',this.el).append(eventView.render().el);
    }
});




