# Generated by Django 3.2.9 on 2021-12-07 19:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('adverts', '0002_advert_owner'),
    ]

    operations = [
        migrations.AlterField(
            model_name='advert',
            name='images',
            field=models.ImageField(blank=True, upload_to='post_images'),
        ),
    ]