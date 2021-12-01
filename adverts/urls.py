from django.urls import path
from .views import AdvertListView, AdvertDetailView

urlpatterns = [
    path('<int:pk>/',AdvertDetailView.as_view()),
    path('',AdvertListView.as_view())
]
