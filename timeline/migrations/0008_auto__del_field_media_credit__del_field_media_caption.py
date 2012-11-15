# -*- coding: utf-8 -*-
import datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models


class Migration(SchemaMigration):

    def forwards(self, orm):
        # Deleting field 'Media.credit'
        db.delete_column('timeline_media', 'credit')

        # Deleting field 'Media.caption'
        db.delete_column('timeline_media', 'caption')


    def backwards(self, orm):
        # Adding field 'Media.credit'
        db.add_column('timeline_media', 'credit',
                      self.gf('django.db.models.fields.CharField')(default='', max_length=100),
                      keep_default=False)

        # Adding field 'Media.caption'
        db.add_column('timeline_media', 'caption',
                      self.gf('django.db.models.fields.CharField')(default='', max_length=280),
                      keep_default=False)


    models = {
        'timeline.event': {
            'Meta': {'object_name': 'Event'},
            'description': ('django.db.models.fields.CharField', [], {'max_length': '700'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'moment': ('django.db.models.fields.DateTimeField', [], {'default': 'datetime.datetime.now', 'blank': 'True'}),
            'pets': ('django.db.models.fields.related.ManyToManyField', [], {'related_name': "'events'", 'symmetrical': 'False', 'to': "orm['timeline.Pet']"}),
            'title': ('django.db.models.fields.CharField', [], {'max_length': '50'})
        },
        'timeline.media': {
            'Meta': {'object_name': 'Media'},
            'event': ('django.db.models.fields.related.ManyToManyField', [], {'related_name': "'media'", 'symmetrical': 'False', 'to': "orm['timeline.Event']"}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'media_type': ('django.db.models.fields.CharField', [], {'max_length': '5'}),
            'media_url': ('django.db.models.fields.URLField', [], {'max_length': '200'})
        },
        'timeline.pet': {
            'Meta': {'object_name': 'Pet'},
            'bio': ('django.db.models.fields.CharField', [], {'max_length': '140'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'joined_date': ('django.db.models.fields.DateField', [], {}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '50'}),
            'prof_pic': ('django.db.models.fields.URLField', [], {'max_length': '200'})
        },
        'timeline.tag': {
            'Meta': {'object_name': 'Tag'},
            'events': ('django.db.models.fields.related.ManyToManyField', [], {'related_name': "'tags'", 'symmetrical': 'False', 'to': "orm['timeline.Event']"}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '50'})
        }
    }

    complete_apps = ['timeline']