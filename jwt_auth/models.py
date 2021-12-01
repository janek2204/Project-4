from django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.

class User(AbstractUser):
  profile_image = models.CharField(max_length=500, default = 'https://www.pngfind.com/pngs/m/676-6764065_default-profile-picture-transparent-hd-png-download.p')
  email = models.CharField(max_length=50, unique=True)
  first_name = models.CharField(max_length=50)
  last_name = models.CharField(max_length=50)

