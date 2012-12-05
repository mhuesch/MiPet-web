from django.db import models
from datetime import datetime, date
from django.contrib.auth.models import User


class UserProfile(models.Model):
    user = models.ForeignKey(User, unique=True)
    bio = models.CharField(max_length=140)
    prof_pic = models.URLField(blank=True, null=True, default="")

    def __unicode__(self):
        return u'%s' % self.user.username

User.profile = property(lambda u: UserProfile.objects.get_or_create(user=u)[0])

class Pet(models.Model):
    owner = models.ForeignKey(UserProfile, related_name='pets')
    name = models.CharField(max_length=50)
    birthdate = models.DateField(default=date.today, blank=True)
    bio = models.CharField(max_length=140, blank=True)
    prof_pic = models.URLField(blank=True, default="")

    def __unicode__(self):
        return u'%s' % self.name

class Event(models.Model):
    pets = models.ManyToManyField(Pet, related_name='events')
    moment = models.DateTimeField(default=datetime.now, blank=True)
    title = models.CharField(max_length=50, blank=True)         # required
    description = models.CharField(max_length=700)
    milestone = models.ForeignKey('Milestone', blank=True, null=True)

    def __unicode__(self):
        return self.title

class Milestone(models.Model):
    name = models.CharField(max_length=50)

    def __unicode__(self):
        return self.name

class Tag(models.Model):
    name = models.CharField(max_length=50)
    events = models.ManyToManyField(Event, related_name='tags')

class Media(models.Model):
    MEDIA_TYPE_CHOICES = (
        ('PIC', 'Picture'),
        ('VID', 'Video'),
    )
    # should be event or events??
    # can we name media --> medias for clarity that it is plural?
    event = models.ManyToManyField(Event, related_name='media')
    media_url = models.URLField()
    media_type = models.CharField(max_length=5,choices=MEDIA_TYPE_CHOICES)

    def __unicode__(self):
        return u'%s' % self.media_url

