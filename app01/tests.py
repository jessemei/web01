from django.test import TestCase
from django.db import models

# Create your tests here.
class dept(models.Model):
    dept_name = models.CharField(max_length=60)

class Asset_type(models.Model):
    Asset_name = models.CharField(max_length=60)

