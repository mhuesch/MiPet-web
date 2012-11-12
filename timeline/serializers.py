from timeline.models import Pet, Event, Media
from rest_framework import serializers

class PetSerializer(serializers.HyperlinkedModelSerializer):
    events = serializers.ManyRelatedField()

    class Meta:
        model = Pet
        fields = ('name', 'joined_date', 'events')

class EventSerializer(serializers.HyperlinkedModelSerializer):
    pet = serializers.RelatedField(source='pet')

    class Meta:
        model = Event
        fields = ('pet', 'moment', 'title', 'description')

class MediaSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Media
        fields = ('media_url', 'credit', 'caption')





