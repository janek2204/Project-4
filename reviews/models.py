from django.db import models

# Create your models here.

class Review(models.Model):
  review_text = models.TextField(max_length=300)
  rating = models.IntegerField(default=0)
  created_at = models.DateTimeField(auto_now_add=True)

  def __str__(self):
      return f'{self.rating}/5'
  