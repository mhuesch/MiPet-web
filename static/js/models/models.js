window.Pet = Backbone.Model.extend({

    urlRoot:"/api/v1/pet",

    // Called when generating a new instance of a model
    initialize:function(){
        
    }
});


window.Event = Backbone.Model.extend({

    urlRoot:"/api/v1/event",

    initialize:function(){

    }
});