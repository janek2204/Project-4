from django.db import models

# Create your models here.

class Review(models.Model):
  review_text = models.TextField(max_length=300)
  rating = models.IntegerField(default=0)
  adverts = models.ForeignKey('adverts.Advert',related_name='reviews',on_delete= models.CASCADE)
  created_at = models.DateTimeField(auto_now_add=True)
  owner = models.ForeignKey('jwt_auth.User',related_name='reviews',on_delete=models.CASCADE)

  def __str__(self):
      return f'{self.rating}/5'
  