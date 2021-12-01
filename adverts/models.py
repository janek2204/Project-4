from django.db import models

# Create your models here.

CATEGORY_CHOICES = (("ELECTRONICS",'Electronics'),("CARS","Cars"),("HOME","Home"),("GARDEN","Garden"),("OTHER","Other")) 


class Advert(models.Model):
  title = models.CharField(max_length=60)
  description = models.TextField(max_length= 600)
  quantity = models.IntegerField(default=1,)
  images = models.CharField(max_length=500)
  price = models.DecimalField(decimal_places=2,max_digits=10)
  category = models.CharField(choices=CATEGORY_CHOICES,default="OTHER",max_length=11)
  created_at = models.DateTimeField(auto_now_add=True)

  def __str__(self):
    return self.title