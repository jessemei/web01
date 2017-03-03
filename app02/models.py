#!coding:utf-8
from django.db import models

# Create your models here.
class userinfo(models.Model):
    name = models.CharField(max_length=30)
    email = models.EmailField()
    memo = models.TextField()



class Asset(models.Model):
    dept_choice = (
        (u'1', '销售部'),
        (u'2', '采购部'),
        (u'3', '信息技术部'),
        (u'4', '客服部'),
        (u'5', '市场部'),
        (u'6', '事业加盟部'),
        (u'7', '战略研究部'),
        (u'8', '人事新政部'),
        (u'9', '财务部'),
        (u'9', '仓储配送部'),
    )
    Dname = models.CharField(max_length=2,choices = dept_choice)
    Atype = models.CharField(max_length=50)
    Zcbh = models.CharField(max_length=30)
    Bgr = models.CharField(max_length=30)
    Brand = models.CharField(max_length=200)
    Aunit = models.CharField(max_length=10)
    Count = models.IntegerField()
    Price = models.DecimalField(max_digits=10, decimal_places=2)
    Status = models.BooleanField(default=True)
    gtime = models.DateField()
