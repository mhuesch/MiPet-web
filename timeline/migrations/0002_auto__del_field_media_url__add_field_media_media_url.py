# -*- coding: utf-8 -*-
import datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models


class Migration(SchemaMigration):

    def forwards(self, orm):
        # Deleting field 'Media.url'
        db.delete_column('timeline_media', 'url')

        # Adding field 'Media.media_url'
        db.add_column('timeline_media', 'media_url',
                      self.gf('django.db.models.fields.CharField')(default=3, max_length=2000),
                      keep_default=False)


    def backwards(self, orm):
        # Adding field 'Media.url'
        db.add_column('timeline_media', 'url',
                      self.gf('django.db.models.fields.CharField')(default=1, max_length=2000),
                      keep_default=False)

        # Deleting field 'Media.media_url'
        db.delete_column('timeline_media', 'media_url')


    models = {
        'timeline.event': {
            'Meta': {'object_name': 'Event'},
            'description': ('django.db.models.fields.CharField', [], {'max_length': '700'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'moment': ('django.db.models.fields.DateTimeField', [], {'auto_now': 'True', 'blank': 'True'}),
            'pet': ('django.db.models.fields.related.ForeignKey', [], {'to': "orm['timeline.Pet']"}),
            'title': ('django.db.models.fields.CharField', [], {'max_length': '50'})
        },
        'timeline.media': {
            'Meta': {'object_name': 'Media'},
            'caption': ('django.db.models.fields.CharField', [], {'max_length': '280'}),
            'credit': ('django.db.models.fields.CharField', [], {'max_length': '100'}),
            'event': ('django.db.models.fields.related.ForeignKey', [], {'to': "orm['timeline.Event']"}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'media_url': ('django.db.models.fields.CharField', [], {'max_length': '2000'})
        },
        'timeline.pet': {
            'Meta': {'object_name': 'Pet'},
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'joined_date': ('django.db.models.fields.DateField', [], {}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '50'})
        },
        'timeline.tag': {
            'Meta': {'object_name': 'Tag'},
            'events': ('django.db.models.fields.related.ManyToManyField', [], {'related_name': "'tags'", 'symmetrical': 'False', 'to': "orm['timeline.Event']"}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '50'})
        }
    }

    complete_apps = ['timeline']