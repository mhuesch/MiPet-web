from timeline.models import UserProfile, Pet, Event, Media
from rest_framework import serializers


class UserProfileSerializer(serializers.HyperlinkedModelSerializer):
    pk = serializers.IntegerField(source='pk', read_only=True)
    pets = serializers.ManyPrimaryKeyRelatedField(source='pets')
    user = serializers.RelatedField(source='user')

    class Meta:
        model = UserProfile
        fields = ('pk', 'user', 'pets', 'bio', 'prof_pic')


class PetSerializer(serializers.HyperlinkedModelSerializer):
    pk = serializers.IntegerField(source='pk', read_only=True)
    events = serializers.ManyPrimaryKeyRelatedField(source='events')
    owner = serializers.PrimaryKeyRelatedField(source='owner')
    
    class Meta:
        model = Pet
        fields = ('pk', 'owner', 'name', 'birthdate', 'bio', 'prof_pic', 'events')

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





