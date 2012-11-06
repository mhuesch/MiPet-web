# -*- coding: utf-8 -*-
import datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models


class Migration(SchemaMigration):

    def forwards(self, orm):
        # Adding model 'Pet'
        db.create_table('timeline_pet', (
            ('id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('name', self.gf('django.db.models.fields.CharField')(max_length=50)),
            ('joined_date', self.gf('django.db.models.fields.DateField')()),
        ))
        db.send_create_signal('timeline', ['Pet'])

        # Adding model 'Event'
        db.create_table('timeline_event', (
            ('id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('pet', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['timeline.Pet'])),
            ('moment', self.gf('django.db.models.fields.DateTimeField')(auto_now=True, blank=True)),
            ('title', self.gf('django.db.models.fields.CharField')(max_length=50)),
            ('description', self.gf('django.db.models.fields.CharField')(max_length=700)),
        ))
        db.send_create_signal('timeline', ['Event'])

        # Adding model 'Tag'
        db.create_table('timeline_tag', (
            ('id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('name', self.gf('django.db.models.fields.CharField')(max_length=50)),
        ))
        db.send_create_signal('timeline', ['Tag'])

        # Adding M2M table for field events on 'Tag'
        db.create_table('timeline_tag_events', (
            ('id', models.AutoField(verbose_name='ID', primary_key=True, auto_created=True)),
            ('tag', models.ForeignKey(orm['timeline.tag'], null=False)),
            ('event', models.ForeignKey(orm['timeline.event'], null=False))
        ))
        db.create_unique('timeline_tag_events', ['tag_id', 'event_id'])

        # Adding model 'Media'
        db.create_table('timeline_media', (
            ('id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('event', self.gf('django.db.models.fields.related.ForeignKey')(to=orm['timeline.Event'])),
            ('url', self.gf('django.db.models.fields.CharField')(max_length=2000)),
            ('credit', self.gf('django.db.models.fields.CharField')(max_length=100)),
            ('caption', self.gf('django.db.models.fields.CharField')(max_length=280)),
        ))
        db.send_create_signal('timeline', ['Media'])


    def backwards(self, orm):
        # Deleting model 'Pet'
        db.delete_table('timeline_pet')

        # Deleting model 'Event'
        db.delete_table('timeline_event')

        # Deleting model 'Tag'
        db.delete_table('timeline_tag')

        # Removing M2M table for field events on 'Tag'
        db.delete_table('timeline_tag_events')

        # Deleting model 'Media'
        db.delete_table('timeline_media')


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
            'url': ('django.db.models.fields.CharField', [], {'max_length': '2000'})
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