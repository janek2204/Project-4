from django.db import models
from django.db.models import fields
from rest_framework import serializers
from django.contrib.auth import get_user_model, password_validation
from django.contrib.auth.hashers import make_password
from django.core.exceptions import ValidationError
from adverts.main_serializer import AdvertSerializer
User = get_user_model()

class UserSerializer(serializers.ModelSerializer):

  password = serializers.CharField(write_only=True)
  password_confirmation = serializers.CharField(write_only=True)

  def validate(self, data):

    password = data.pop('password')
    password_confirmation = data.pop('password_confirmation')

    if password != password_confirmation:
      raise ValidationError({'password_confirmation':'Passwords do not match'})

    try:
      password_validation.validate_password(password = password)
    except ValidationError as err:
      raise ValidationError({'password': err.messages})

    data['password'] = make_password(password)
    return data

  class Meta:
    model = User
    fields = ('id','username','password','password_confirmation','profile_image','first_name','last_name')

class PopulatedUserSerializer(UserSerializer):
  class Meta:
    model = User
    fields='__all__'
  owner = AdvertSerializer(read_only=True,many=True)
