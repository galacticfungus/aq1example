from django.db import models

# Create your models here.
class DataSample(models.Model):
    recorded = models.DateTimeField()
    moving_average = models.FloatField()
    server_name = models.CharField(max_length=200)
