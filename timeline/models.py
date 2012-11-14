from django.db import models
from datetime import datetime


class Pet(models.Model):
    name = models.CharField(max_length=50)
    joined_date = models.DateField()
    bio = models.CharField(max_length=140)
    prof_pic = models.URLField()
    
    def __unicode__(self):
        return u'%s' % self.name

class Event(models.Model):
    pets = models.ManyToManyField(Pet, related_name='events')
    moment = models.DateTimeField(default=datetime.now, blank=True)
    title = models.CharField(max_length=50)
    description = models.CharField(max_length=700)

    def __unicode__(self):
        return self.title

class Tag(models.Model):
    name = models.CharField(max_length=50)
    events = models.ManyToManyField(Event, related_name='tags')

class Media(models.Model):
    MEDIA_TYPE_CHOICES = (
        'Picture',
        'Video'.
    )

    event = models.ForeignKey(Event, related_name='media')
    media_url = models.URLField()
    credit = models.CharField(max_length=100)
    caption = models.CharField(max_length=280)
    media_type = models.CharField(max_length=10,choices=MEDIA_TYPE_CHOICES)

    def __unicode__(self):
        return u'%s' % self.media_url

