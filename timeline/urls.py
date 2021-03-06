from django.conf.urls import patterns, url
from rest_framework.urlpatterns import format_suffix_patterns
from timeline import views

urlpatterns = patterns('',
    url(r'^pet/$', views.PetList.as_view()),
    url(r'^pet/(?P<pk>[0-9]+)/?$', views.PetDetail.as_view()),
    url(r'^event/$', views.EventList.as_view()),
    url(r'^event/(?P<pk>[0-9]+)/?$', views.EventDetail.as_view()),
    url(r'^media/$', views.MediaList.as_view()),
    url(r'^media/(?P<pk>[0-9]+)/?$', views.MediaDetail.as_view()),
    url(r'^user/$', views.UserProfileList.as_view()),
    url(r'^user/(?P<pk>[0-9]+)/?$', views.UserProfileDetail.as_view()),
    url(r'^milestone/$', views.MilestoneList.as_view()),
    url(r'^milestone/(?P<pk>[0-9]+)/?$', views.MilestoneDetail.as_view()),


    # Filtered views.
    url(r'^pet/(?P<pk>[0-9]+)/events/$', views.pet_event_list),
    url(r'^event/(?P<pk>[0-9]+)/media/$', views.event_media_list),
    url(r'^user/(?P<pk>[0-9]+)/pets/$', views.user_pet_list)
)

urlpatterns = format_suffix_patterns(urlpatterns)