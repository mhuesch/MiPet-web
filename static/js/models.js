var Pet = Backbone.Model.extend({

    urlRoot:"/api/v1/pet",


    // Called when generating a new instance of a model
    // get the events at this url -> returns a list of json objects that correspond to events
    // grabbing events associated with pet
    initialize:function () {
        this.myEvents = new EventCollection(); 
        this.myEvents.url = '/api/v1/pet/' + this.id + '/events/';
    }
});


var Event = Backbone.Model.extend({

    urlRoot:"/api/v1/event",

    // grabbing media associated with event
    initialize:function () {
        this.myMedia = new MediaCollection();
        this.myMedia.url = '/api/v1/event/' + this.id + '/media';
    }
});


var EventCollection = Backbone.Collection.extend({
    model: Event,
    
    url:"/api/v1/event/"
});


var Media = Backbone.Model.extend({

    urlRoot:"/api/v1/media",
});


var MediaCollection = Backbone.Collection.extend({
    model: Media,

    url:"/api/v1/media",
})

