from django.template import Context, loader
from django.http import HttpResponse

from timeline.models import Pet, Event, Media

import json


def index(request):
    t = loader.get_template('index.html')
    c = Context({
        #
    })
    return HttpResponse(t.render(c))

def api_pet(request,id):
    try:
        pet_model = Pet.objects.get(id=id)
    except DoesNotExist:
        return HttpResponse()

    # Store pet data
    response_data = dict()
    response_data['id'] = id
    response_data['name'] = pet_model.name
    
    # Convert date object to dict
    joined = pet_model.joined_date
    join = dict()
    join['year'] = joined.year
    join['month'] = joined.month
    join['day'] = joined.day
     response_data['joined_date'] = join

    # Get pet event ids
    pet_events = Event.objects.filter(pet__id=id)
    response_data['events'] = pet_events.values_list('id',flat=True)

    return HttpResponse(json.dumps(response_data), mimetype="application/json")

def api_event(request,id):
    response_data = dict()
    response_data['result'] = 'test'
    return HttpResponse(json.dumps(response_data), mimetype="application/json")

def api_media(request,id):
    response_data = dict()
    response_data['result'] = 'test'
    return HttpResponse(json.dumps(response_data), mimetype="application/json")