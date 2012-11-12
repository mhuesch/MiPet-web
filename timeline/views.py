from timeline.models import Pet, Event, Media
from timeline.serializers import PetSerializer, EventSerializer, MediaSerializer
from django.template import Context, loader
from django.http import HttpResponse
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.decorators import api_view

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


@api_view(['GET'])
def pet_event_list(request, pk):
    if request.method == 'GET':
        events = Event.objects.filter(pets__in=[pk]).order_by('-moment')
        serializer = EventSerializer(events)
        return Response(serializer.data)



def index(request):
    t = loader.get_template('index.html')
    c = Context({
        #
    })
    return HttpResponse(t.render(c))

def profile(request, id):
    t = loader.get_template('profile.html')
    c = Context({
                #
                'pet_id': id,
                })
    return HttpResponse(t.render(c))
