from django.contrib import admin
from timeline.models import UserProfile, Pet, Event, Media

admin.site.register(UserProfile)
admin.site.register(Pet)
admin.site.register(Event)
admin.site.register(Media)