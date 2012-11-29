
// User model
var User = Backbone.Model.extend({
    urlRoot:"/api/v1/user",

    initialize:function () {
        //this.myPets = new PetCollection();
        //this.myPets.url = '/api/v1/user/' + this.id + '/pets/';
    }
});


// Pet model & collection
var Pet = Backbone.Model.extend({
    urlRoot:"/api/v1/pet/",

    // Called when generating a new instance of a model
    // get the events at this url -> returns a list of json objects that correspond to events
    // grabbing events associated with pet
    initialize:function () {
        this.myEvents = new EventCollection(); 
        this.myEvents.url = '/api/v1/pet/' + this.id + '/events/';
    }
});

var PetCollection = Backbone.Collection.extend({
    model: Pet,
    urlRoot:"/api/v1/pet"
})


// Event model & collection
var Event = Backbone.Model.extend({
    urlRoot:"/api/v1/event/",
    idAttribute:'pk',

    // grabbing media associated with event
    initialize:function () {
        this.myMedia = new MediaCollection();
        this.myMedia.url = '/api/v1/event/' + this.model_id + '/media';
    }
});

var EventCollection = Backbone.Collection.extend({
    model: Event,
    url:"/api/v1/event/"
	
});


// Media model & collection
var Media = Backbone.Model.extend({
    urlRoot:"/api/v1/media/"
});

var MediaCollection = Backbone.Collection.extend({
    model: Media,

    url:"/api/v1/media/"
})

