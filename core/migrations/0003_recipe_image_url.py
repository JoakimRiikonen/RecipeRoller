# Generated by Django 2.2.7 on 2019-11-21 12:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0002_auto_20191119_1923'),
    ]

    operations = [
        migrations.AddField(
            model_name='recipe',
            name='image_url',
            field=models.URLField(blank=True),
        ),
    ]
