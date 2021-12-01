# Generated by Django 3.2.9 on 2021-12-01 15:43

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Review',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('review_text', models.TextField(max_length=300)),
                ('rating', models.IntegerField(default=0, max_length=1)),
            ],
        ),
    ]
