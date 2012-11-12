window.Pet = Backbone.Model.extend({

    urlRoot:"/api/v1/pet",

    defaults:{
        myEvents: new EventCollection();
    }

    // Called when generating a new instance of a model
    initialize:function () {
        _.each(this.events, )

    },

    getEvent:function(id) {
        var ev = new Event({id: id});
        this.myEvents.add(ev);
    }
});


window.Event = Backbone.Model.extend({

    urlRoot:"/api/v1/event",

    initialize:function () {

    }
});


window.EventCollection = Backbone.Collection.extend({
    model: Event
});