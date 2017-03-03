#!coding:utf-8
from django.db import models
# Create your models here.
from django.db import models


class AssetType(models.Model):
    Asset_type = models.CharField(max_length=20)

class dept(models.Model):
    dept_name = models.CharField(max_length=50)

class Aunit(models.Model):
    unit_name = models.CharField(max_length=5)

class Asset(models.Model):
    dept_choice = (
        (u'1', '销售部'),
        (u'2', '采购部'),
        (u'3', '信息技术部'),
        (u'4', '客服部'),
        (u'5', '市场部'),
        (u'6', '事业加盟部'),
        (u'7', '战略研究部'),
        (u'8', '人事行政部'),
        (u'9', '财务部'),
        (u'10', '仓储配送部'),
    )
    Dname = models.CharField(max_length=2,choices = dept_choice)
    asset_type = (
        (u'1', '笔记本电脑'),
        (u'2', 'MOTO无线基站'),
        (u'3', 'UPS电源'),
        (u'4', '标签打印机'),
        (u'5', '传真机'),
        (u'6', '打印机'),
        (u'7', '大型存储设备'),
        (u'8', '服务器'),
        (u'9', '服务器机柜'),
        (u'10', '交换机'),
        (u'11', '扫描枪'),
        (u'12', '扫描仪'),
        (u'13', '台式电脑'),
        (u'14', '条码打印机'),
        (u'15', '投影仪'),
        (u'16', '投影仪幕布'),
        (u'17', '网络设备'),
        (u'18', '无动力筒机'),
        (u'19', '显示器'),
        (u'20', '针式打印机'),
    )
    Atype = models.CharField(max_length=2, choices=asset_type)
    Status_type = (
        (u'1','在用'),
        (u'0','闲置')
    )
    Status = models.CharField(max_length=2,choices=Status_type)
    Zcbh = models.CharField(max_length=30)
    Bgr = models.CharField(max_length=30)
    Brand = models.CharField(max_length=200)
    Aunit = models.CharField(max_length=10)
    Count = models.IntegerField()
    Price = models.FloatField()

    gtime = models.DateField()
    def __str__(self):
        return self.Bgr


class user(models.Model):
    username = models.CharField(max_length=50)
    password = models.CharField(max_length=50)


class apiorder(models.Model):
    Apiname = models.CharField(max_length=50)
    worder = models.CharField(max_length=10)
    horder = models.CharField(max_length=10)
    yorder = models.CharField(max_length=10)
    product = models.CharField(max_length=10)








