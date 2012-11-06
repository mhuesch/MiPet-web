from django.db import models


class Pet(models.Model):
    name = models.CharField(max_length=50)
    joined_date = models.DateField()

class Event(models.Model):
    pet = models.ForeignKey(Pet)
    moment = models.DateTimeField(auto_now=True)
    title = models.CharField(max_length=50)
    description = models.CharField(max_length=700)

class Tag(models.Model):
    name = models.CharField(max_length=50)
    events = models.ManyToManyField(Event, related_name='tags')

class Media(models.Model):
    event = models.ForeignKey(Event)
    url = models.CharField(max_length=2000)
    credit = models.CharField(max_length=100)
    caption = models.CharField(max_length=280)


