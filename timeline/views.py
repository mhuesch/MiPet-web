from timeline.models import Pet, Event, Media
from timeline.serializers import PetSerializer, EventSerializer, MediaSerializer
from django.template import Context, loader
from django.http import HttpResponse
from rest_framework import generics

import json

class PetList(generics.ListCreateAPIView):
    model = Pet
    serializer_class = PetSerializer

class PetDetail(generics.RetrieveUpdateDestroyAPIView):
    model = Pet
    serializer_class = PetSerializer

class EventList(generics.ListCreateAPIView):
    model = Event
    serializer_class = EventSerializer

class EventDetail(generics.RetrieveUpdateDestroyAPIView):
    model = Event
    serializer_class = EventSerializer

class MediaList(generics.ListCreateAPIView):
    model = Media
    serializer_class = MediaSerializer

class MediaDetail(generics.RetrieveUpdateDestroyAPIView):
    model = Media
    serializer_class = MediaSerializer


def index(request):
    t = loader.get_template('index.html')
    c = Context({
        #
    })
    return HttpResponse(t.render(c))

def timeline(request, id):
    t = loader.get_template('timeline.html')
    c = Context({
                #
                'user_id': id,
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


def api_timeline(request,id):
    response_data = {
        "timeline":
        {
            "headline":"miPet: Kermit's Timeline",
            "type":"default",
            "text":"<p>All about the spectacular life of the silver unicorn.</p>",
            "startDate":"2010,9,13",
            "asset": {
                "media":"http://25.media.tumblr.com/tumblr_m8kgzazi101rw7ytio1_500.jpg",
                "credit":"someone on tumblr",
                "caption":"yeahh buddy"
            },
            "date": [
                     {
                     "startDate":"2010,9,19",
                     "endDate":"2010,9,19",
                     "headline":"Getting My Italian Greyhound",
                     "text":"Me picking up my new baby puppy, a 3 month old male Italian Greyhound.",
                     "tag":"Media",
                     "asset": {
                     "media":"http://youtu.be/O-TsHz9rw6E",
                     "thumbnail":"",
                     "credit":"",
                     "caption":"Uploaded by JennaMarbles on Sep 19, 2010"
                     }
                     },
                     {
                     "startDate":"2010,9,13",
                     "endDate":"2010,9,13",
                     "headline":"BREAKING NEWS: Mr. Marbles Is Getting A Brother",
                     "text":"It's been a long time coming, Mr. Marbles can't just grow up to be a spoiled, crotchety old man",
                     "tag":"Achievements",
                     "asset": {
                     "media":"http://www.stoollala.com/random-thoughts/breaking-news-mr-marbles-is-getting-a-brother/",
                     "thumbnail":"http://3432-stoollala.voxcdn.com/wp-content/uploads/2010/09/sharon_blue_male_sitting_9-11-286x443.jpg",
                     "credit":"stoollala",
                     "caption":""
                     }
                     },
                     
                     {
                     "startDate":"2010,9,20",
                     "endDate":"2010,9,20",
                     "headline":"New Puppy At Work",
                     "text":"",
                     "tag":"Status Updates",
                     "asset": {
                     "media":"http://youtu.be/GHiSRYK5QYs",
                     "thumbnail":"",
                     "credit":"Uploaded by JennaMarbles on Sep 20, 2010",
                     "caption":"Still crying for about 24 hours straight except when he's asleep. I think he misses his doggy mommy"
                     }
                     },
                     {
                     "startDate":"2012,10,31",
                     "endDate":"2012,10,31",
                     "headline":"Hi yeah can you rub our bellies please? Thanks. We'll wait.",
                     "text":"<p>Body text goes here, some HTML is OK</p>",
                     "tag":"Status Updates",
                     "asset": {
                     "media":"https://instagr.am/p/Rdy8NWJ3tS/media/?size=l",
                     "thumbnail":"http://25.media.tumblr.com/tumblr_mcs79sTBR11qjf2fto1_500.jpg",
                     "credit":"Credit Name Goes Here",
                     "caption":"Caption text goes here"
                     }
                     }
                     
                     ],
            "era": [
            
            ]
            }
        }
    return HttpResponse(json.dumps(response_data), mimetype="application/json")
