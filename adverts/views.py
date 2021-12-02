from .models import Advert
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import PopulatedAdvertSerializer
from .main_serializer import AdvertSerializer
from rest_framework.permissions import IsAuthenticatedOrReadOnly
# Create your views here.


class AdvertListView(APIView):
  permission_classes = (IsAuthenticatedOrReadOnly,)

  def get(self,request):
    adverts = Advert.objects.all()
    serialized_adverts = PopulatedAdvertSerializer(adverts,many=True)
    return Response(serialized_adverts.data, status=status.HTTP_200_OK)

  def post(self,request):
    request.data['owner'] = request.user.id
    advert = AdvertSerializer(data= request.data)
    if advert.is_valid():
      advert.save()
      return Response(advert.data, status=status.HTTP_201_CREATED)
    else:
      return Response(advert.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)

class AdvertDetailView(APIView):
  permission_classes = (IsAuthenticatedOrReadOnly,)

  def get(self,request,pk):
    advert = Advert.objects.get(id=pk)
    serialized_advert = PopulatedAdvertSerializer(advert)
    return Response(serialized_advert.data, status=status.HTTP_200_OK)
  
  def put(self,request,pk):
    request.data['owner'] = request.user.id
    advert = Advert.objects.get(id=pk)
    updated_advert = AdvertSerializer(advert,data= request.data)
    if updated_advert.is_valid():
      updated_advert.save()
      return Response(updated_advert.data,status=status.HTTP_202_ACCEPTED)
    else:
      return Response(updated_advert.errors,status=status.HTTP_422_UNPROCESSABLE_ENTITY)

  def delete(self,request,pk):
    try:
      advert = Advert.objects.get(id=pk)
      advert.delete()
    except:
      return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    return Response(status=status.HTTP_204_NO_CONTENT)