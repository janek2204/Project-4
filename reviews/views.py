from rest_framework import permissions
from rest_framework.exceptions import PermissionDenied
from .models import Review
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import ReviewSerializer
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated


# Create your views here.


class ReviewListView(APIView):
  permission_classes = (IsAuthenticated,)

  def get(self,request):
    reviews = Review.objects.all()
    serialized_reviews = ReviewSerializer(reviews,many=True)
    return Response(serialized_reviews.data, status=status.HTTP_200_OK)

  def post(self,request):
    request.data['owner'] = request.user.id
    review = ReviewSerializer(data=request.data)
    if review.is_valid():
      review.save()
      return Response(review.data,status=status.HTTP_202_ACCEPTED)
    else:
      return Response(review.errors,status=status.HTTP_422_UNPROCESSABLE_ENTITY)
  

class ReviewDetailView(APIView):
  permission_classes = (IsAuthenticated,)

  def get(self,request,pk):
    review = Review.objects.get(id=pk)
    serialized_review = ReviewSerializer(review)
    return Response(serialized_review.data, status=status.HTTP_200_OK)

  def put(self,request,pk):
    review = Review.objects.get(id=pk)
    updated_review = ReviewSerializer(review,data= request.data)
    if review.owner != request.user:
      raise PermissionDenied()
    if updated_review.is_valid():
      updated_review.save()
      return Response(updated_review.data,status=status.HTTP_202_ACCEPTED)
    else:
      return Response(updated_review.errors,status=status.HTTP_422_UNPROCESSABLE_ENTITY)

  def delete(self,request,pk):
    try:
      review = Review.objects.get(id=pk)
    except:
      return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    if review.owner != request.user:
      raise PermissionDenied()
    review.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)