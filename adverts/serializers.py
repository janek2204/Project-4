from django.db.models import fields
from rest_framework import serializers
from .models import Advert
from jwt_auth.serializers import UserSerializer
from reviews.serializers  import PopulatedReviewSerializer
from .main_serializer import AdvertSerializer

class PopulatedAdvertSerializer(AdvertSerializer):
  owner = UserSerializer()
  class Meta:
    model = Advert
    fields = '__all__'
  reviews = PopulatedReviewSerializer(read_only=True,many=True) 