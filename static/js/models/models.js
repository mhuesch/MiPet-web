var Pet = Backbone.Model.extend({

    urlRoot:"/api/v1/pet",


    // Called when generating a new instance of a model
    initialize:function () {
        this.myEvents = new EventCollection();
        _.each(this.events, function(pet_id){
            var ev = new Event({id: pet_id});
            ev.fetch();
            this.myEvents.add(ev);
        });

    }
});


var Event = Backbone.Model.extend({

    urlRoot:"/api/v1/event",

    initialize:function () {

    }
});


var EventCollection = Backbone.Collection.extend({
    model: Event
});