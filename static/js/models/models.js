var Pet = Backbone.Model.extend({

    urlRoot:"/api/v1/pet",


    // Called when generating a new instance of a model
    initialize:function () {
        this.myEvents = new EventCollection();
        this.myEvents.url = '/api/v1/pet/' + this.id + '/events/';
    }
});


var Event = Backbone.Model.extend({

    urlRoot:"/api/v1/event",

    initialize:function () {
		
    }
});


var EventCollection = Backbone.Collection.extend({
    model: Event,
    
    url:"/api/v1/event/"
});