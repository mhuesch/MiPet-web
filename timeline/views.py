from django.template import Context, loader
from django.http import HttpResponse
import json


def index(request):
    t = loader.get_template('index.html')
    c = Context({
        #
    })
    return HttpResponse(t.render(c))

def api_pet(request,id):
    response_data = dict()
    response_data['result'] = 'test'
    return HttpResponse(json.dumps(response_data), mimetype="application/json")

def api_event(request,id):
    response_data = dict()
    response_data['result'] = 'test'
    return HttpResponse(json.dumps(response_data), mimetype="application/json")

def api_media(request,id):
    response_data = dict()
    response_data['result'] = 'test'
    return HttpResponse(json.dumps(response_data), mimetype="application/json")