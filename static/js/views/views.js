window.PetView = Backbone.View.extend({

    tagName:"div",

    initialize:function () {
        this.render();
    },

    render:function () {
        $(this.el).html('<h2>This pet is named '+this.model.get('name')+'</h2>');
    }
});


window.EventView = Backbone.View.extend({

    tagName:"li",

    initialize:function () {
        _.bindAll(this, 'render');
    },

    render:function () {
        $(this.el).html('<span>Title: '+this.model.get('title')+'</span>');
        return this;
    }
});

window.EventListView = Backbone.View.extend({

    el: $('events'),

    initialize:function () {
        _.bindAll(this, 'render', 'appendEvent');
        this.render();
    },

    render:function () {
        var self = this;
        $(this.el).append("<p>This is a list of events</p>");
        $(this.el).append("<ul></ul>");
        _(this.collection.)
    }
});




