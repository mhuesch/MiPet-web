from timeline.models import Pet, Event, Media
from rest_framework import serializers

class PetSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Pet
        fields = ('name', 'joined_date')

class EventSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Event
        fields = ('moment', 'title', 'description')

class MediaSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Media
        fields = ('media_url', 'credit', 'caption')





