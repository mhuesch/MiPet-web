# -*- coding: utf-8 -*-
import datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models


class Migration(SchemaMigration):

    def forwards(self, orm):
        # Deleting field 'Event.pet'
        db.delete_column('timeline_event', 'pet_id')

        # Adding M2M table for field pets on 'Event'
        db.create_table('timeline_event_pets', (
            ('id', models.AutoField(verbose_name='ID', primary_key=True, auto_created=True)),
            ('event', models.ForeignKey(orm['timeline.event'], null=False)),
            ('pet', models.ForeignKey(orm['timeline.pet'], null=False))
        ))
        db.create_unique('timeline_event_pets', ['event_id', 'pet_id'])


        # Changing field 'Media.media_url'
        db.alter_column('timeline_media', 'media_url', self.gf('django.db.models.fields.URLField')(max_length=200))

    def backwards(self, orm):
        # Adding field 'Event.pet'
        db.add_column('timeline_event', 'pet',
                      self.gf('django.db.models.fields.related.ForeignKey')(default='Butkus', to=orm['timeline.Pet']),
                      keep_default=False)

        # Removing M2M table for field pets on 'Event'
        db.delete_table('timeline_event_pets')


        # Changing field 'Media.media_url'
        db.alter_column('timeline_media', 'media_url', self.gf('django.db.models.fields.CharField')(max_length=2000))

    models = {
        'timeline.event': {
            'Meta': {'object_name': 'Event'},
            'description': ('django.db.models.fields.CharField', [], {'max_length': '700'}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'moment': ('django.db.models.fields.DateTimeField', [], {'auto_now': 'True', 'blank': 'True'}),
            'pets': ('django.db.models.fields.related.ManyToManyField', [], {'related_name': "'events'", 'symmetrical': 'False', 'to': "orm['timeline.Pet']"}),
            'title': ('django.db.models.fields.CharField', [], {'max_length': '50'})
        },
        'timeline.media': {
            'Meta': {'object_name': 'Media'},
            'caption': ('django.db.models.fields.CharField', [], {'max_length': '280'}),
            'credit': ('django.db.models.fields.CharField', [], {'max_length': '100'}),
            'event': ('django.db.models.fields.related.ForeignKey', [], {'to': "orm['timeline.Event']"}),
            'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'media_url': ('django.db.models.fields.URLField', [], {'max_length': '200'})
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