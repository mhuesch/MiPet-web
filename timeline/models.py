from django.db import models


class Pet(models.Model):
    name = models.CharField(max_length=50)
    joined_date = models.DateField()
    def __unicode__(self):
        return u'%s' % self.name

class Event(models.Model):
    pets = models.ManyToManyField(Pet, related_name='events')
    moment = models.DateTimeField(auto_now=True)
    title = models.CharField(max_length=50)
    description = models.CharField(max_length=700)
    def __unicode__(self):
        return u'%s - %s' % (self.pets.all(), self.title)

class Tag(models.Model):
    name = models.CharField(max_length=50)
    events = models.ManyToManyField(Event, related_name='tags')

class Media(models.Model):
    event = models.ForeignKey(Event)
    media_url = models.URLField()
    credit = models.CharField(max_length=100)
    caption = models.CharField(max_length=280)
    def __unicode__(self):
        return u'%s' % self.media_url

