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
