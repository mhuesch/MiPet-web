# -*- coding: utf-8 -*-
import datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models


class Migration(SchemaMigration):

    def forwards(self, orm):
        # Deleting field 'Media.event'
        db.delete_column('timeline_media', 'event_id')

        # Adding M2M table for field event on 'Media'
        db.create_table('timeline_media_event', (
            ('id', models.AutoField(verbose_name='ID', primary_key=True, auto_created=True)),
            ('media', models.ForeignKey(orm['timeline.media'], null=False)),
            ('event', models.ForeignKey(orm['timeline.event'], null=False))
        ))
        db.create_unique('timeline_media_event', ['media_id', 'event_id'])


    def backwards(self, orm):
        # Adding field 'Media.event'
        db.add_column('timeline_media', 'event',
                      self.gf('django.db.models.fields.related.ForeignKey')(default=1, related_name='media', to=orm['timeline.Event']),
                      keep_default=False)

        # Removing M2M table for field event on 'Media'
        db.delete_table('timeline_media_event')


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
            'caption': ('django.db.models.fields.CharField', [], {'max_length': '280'}),
            'credit': ('django.db.models.fields.CharField', [], {'max_length': '100'}),
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