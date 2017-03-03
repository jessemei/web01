#!coding:utf-8
from app01.ColipuApi import api
apiname = 'BoZhou'
apipw = 'QRMDNCC3oXa9'
sign = api.sg(apiname=apiname, apipw=apipw)
url = '180.166.163.28:10115'
values = {"username": apiname,
         "password": apipw,
         "timestamp": 20161230,
         "sign": sign}
# = api.GetToken(url=url,values=values)


