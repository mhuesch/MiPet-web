from django.conf.urls import patterns, include, url
from django.contrib.staticfiles.urls import staticfiles_urlpatterns

# Uncomment the next two lines to enable the admin:
from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    
    url(r'^$', 'timeline.views.index', name='index'),

    url(r'^api/v1/pet/(?P<id>\d+)/$', 'timeline.views.api_pet'),
    url(r'^api/v1/event/(?P<id>\d+)/$', 'timeline.views.api_event'),
    url(r'^api/v1/media/(?P<id>\d+)/$', 'timeline.views.api_media'),


    # Uncomment the admin/doc line below to enable admin documentation:
    # url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
    url(r'^admin/', include(admin.site.urls)),
)

urlpatterns += staticfiles_urlpatterns()