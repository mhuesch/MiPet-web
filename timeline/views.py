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
    except Pet.DoesNotExist:
        return HttpResponse()

    response_data = dict()

    # Pet data
    response_data['id'] = id
    response_data['name'] = pet_model.name
    
    # Convert date object to dict
    joined = pet_model.joined_date
    response_data['joined_date'] = joined.isoformat()

    # Get pet event ids
    pet_events = Event.objects.filter(pet__id=id)
    response_data['events'] = map(lambda x: str(x), pet_events.values_list('id',flat=True))

    return HttpResponse(json.dumps(response_data), mimetype="application/json")


def api_event(request,id):
    try:
        event_model = Event.objects.get(id=id)
    except Event.DoesNotExist:
        return HttpResponse()

    response_data = dict()

    # Event data
    response_data['id'] = id
    response_data['moment'] = event_model.moment.isoformat()
    response_data['title'] = event_model.title
    response_data['description'] = event_model.description

    # Media
    media_ids = Media.objects.filter(event__id=id)
    response_data['media'] = map(lambda x: str(x), media_ids.values_list('id',flat=True))

    return HttpResponse(json.dumps(response_data), mimetype="application/json")


def api_media(request,id):
    try:
        media_model = Media.objects.get(id=id)
    except Media.DoesNotExist:
        return HttpResponse()

    response_data = dict()
    
    # Media data
    response_data['event'] = media_model.event.id
    response_data['url'] = media_model.url
    response_data['credit'] = media_model.credit
    response_data['caption'] = media_model.caption
    
    return HttpResponse(json.dumps(response_data), mimetype="application/json")




