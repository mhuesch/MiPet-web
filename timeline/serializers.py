from timeline.models import Pet, Event, Media
from rest_framework import serializers


class PetSerializer(serializers.HyperlinkedModelSerializer):
    events = serializers.ManyPrimaryKeyRelatedField(source='events')

    class Meta:
        model = Pet
        fields = ('name', 'joined_date', 'bio', 'prof_pic', 'events')

class EventSerializer(serializers.HyperlinkedModelSerializer):
    pk = serializers.IntegerField(source='pk', read_only=True)
    pets = serializers.ManyPrimaryKeyRelatedField(source='pets')
    media = serializers.ManyPrimaryKeyRelatedField(source='media')
    
    class Meta:
        model = Event
        fields = ('pk', 'pets', 'moment', 'title', 'description', 'media')

class PetEventSerializer(serializers.HyperlinkedModelSerializer):
    pk = serializers.IntegerField(source='pk', read_only=True)
    pets = serializers.ManyPrimaryKeyRelatedField(source='pets')
    media = serializers.ManyPrimaryKeyRelatedField(source='media')

    class Meta:
        model = Event
        fields = ('pk', 'pets', 'moment', 'title', 'description', 'media')

class MediaSerializer(serializers.HyperlinkedModelSerializer):
    pk = serializers.IntegerField(source='pk', read_only=True)
    event = serializers.ManyPrimaryKeyRelatedField(source='event')

    class Meta:
        model = Media
        fields = ('pk', 'event', 'media_url')





