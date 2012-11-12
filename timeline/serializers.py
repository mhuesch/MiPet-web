from timeline.models import Pet, Event, Media
from rest_framework import serializers

class PetSerializer(serializers.HyperlinkedModelSerializer):
    events = serializers.ManyPrimaryKeyRelatedField(source='events')

    class Meta:
        model = Pet
        fields = ('name', 'joined_date', 'events')

class EventSerializer(serializers.HyperlinkedModelSerializer):
    pets = serializers.ManyPrimaryKeyRelatedField(source='pets')

    class Meta:
        model = Event
        fields = ('pets', 'moment', 'title', 'description', 'media')

class MediaSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Media
        fields = ('media_url', 'credit', 'caption')





