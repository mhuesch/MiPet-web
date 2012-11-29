from timeline.models import UserProfile, Pet, Event, Media
from timeline.serializers import UserProfileSerializer, PetSerializer, EventSerializer, MediaSerializer
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

class UserProfileList(generics.ListAPIView):
    model = UserProfile
    serializer_class = UserProfileSerializer

class UserProfileDetail(generics.RetrieveAPIView):
    model = UserProfile
    serializer_class = UserProfileSerializer

# API view for the pets of a user.
@api_view(['GET'])
def user_pet_list(request, pk):
    if request.method == 'GET':
        pets = Pet.objects.filter(owner=pk).order_by('id')
        serializer = PetSerializer(pets)
        return Response(serializer.data)

# API view for the events of a pet.
@api_view(['GET'])
def pet_event_list(request, pk):
    if request.method == 'GET':
        events = Event.objects.filter(pets__in=[pk]).order_by('-moment')
        serializer = EventSerializer(events)
        return Response(serializer.data)

# API view for the media of an event.
@api_view(['GET'])
def event_media_list(request, pk):
    if request.method == 'GET':
        media = Media.objects.filter(event__in=[pk])
        serializer = MediaSerializer(media)
        return Response(serializer.data)



def index(request):
    user_profiles = UserProfile.objects.all()
    
    t = loader.get_template('index.html')
    c = Context({
            'users': user_profiles,
        })
    return HttpResponse(t.render(c))

def user(request,id):
    user_pets = Pet.objects.filter(owner=id).order_by('id')

    t = loader.get_template('user.html')
    c = Context({
            'user_id': id,
            'pets': user_pets,
        })
    return HttpResponse(t.render(c))

def profile(request, id):
    t = loader.get_template('profile.html')
    c = Context({
            'pet_id': id,
        })
    return HttpResponse(t.render(c))
