from app01.ColipuApi import api
apiname = 'WHYiYuan'
apipw = 'My9UxQnggJIC'
sign = api.sg(apiname=apiname, apipw=apipw)
url = '10.10.210.131:10023'
values = {"username": 'WHYiYuan',
         "password": "My9UxQnggJIC",
         "timestamp": 20161229,
         "sign": sign}
a = api.GetToken(url=url,values=values)