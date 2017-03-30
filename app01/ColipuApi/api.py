import time
import hashlib
import urllib.request
import json



def sg(apiname,apipw):
    timestamp = time.strftime("%Y%m%d", time.localtime())
    str5 = apiname + apipw + timestamp + apipw
    s2 = str5.encode(encoding='utf-8')
    md5 = hashlib.md5()
    md5.update(s2)
    sign = md5.hexdigest()
    return sign

def GetToken(url,values):
    data = urllib.parse.urlencode(values)
    data = data.encode('ascii')
    req = urllib.request.Request('http://%s/api/auth2/access_token'% url, data)
    with urllib.request.urlopen(req) as response:
        the_page = response.read()
        a = the_page.decode('utf8')
        dic = json.loads(a)
        return dic


class ColipuApi(object):
    timestamp = time.strftime("%Y%m%d", time.localtime())

    def __init__(self,apiname,apipasswd,url):
        self.apiname = apiname
        self.apipasswd = apipasswd
        self.url = url

    def getSign(self):
        str5 = self.apiname + self.apipasswd + ColipuApi.timestamp + self.apipasswd
        s2 = str5.encode(encoding='utf-8')
        md5 = hashlib.md5()
        md5.update(s2)
        sign = md5.hexdigest()
        return sign

    def getToken(self):
        sign = self.getSign()
        values = {"username": self.apiname,
                  "password": self.apipasswd,
                  "timestamp": ColipuApi.timestamp,
                  "sign": sign}
        sdata = urllib.parse.urlencode(values)
        data = sdata.encode('ascii')
        req = urllib.request.Request('http://%s/api/auth2/access_token' % self.url, data)
        with urllib.request.urlopen(req) as response:
            the_page = response.read()
            a = the_page.decode('utf8')
            sdic = json.loads(a)
            dic = sdic['access_token']
            return dic

    def getData(self,values,url):
        sdata = urllib.parse.urlencode(values)
        data = sdata.encode('ascii')
        req = urllib.request.Request(url, data)
        with urllib.request.urlopen(req) as response:
            the_page = response.read()
            a = the_page.decode('utf8')
            sdic = json.loads(a)
            # dic = sdic['access_token']
            return sdic


    def getPools(self):
        token = self.getToken()
        values = {"token": token,}
        url = 'http://%s/api/product/get_pools' % self.url
        data = self.getData(values,url)
        catalog_id = []
        for i in data['result']:
            catalog_id.append(i['id'])
        #return data['result'][0]
        return catalog_id

    def getSkus(self):
        token = self.getToken()
        values = {'token':token,
                  'catalog_id':'1h1063'}
        url = 'http://%s/api/product/skus' % self.url
        data = self.getData(values, url)
        return data

    def getDatail(self):
        token = self.getToken()
        values = {'token': token,
                  'sku': '1055897'}
        url = 'http://%s/api/product/detail' % self.url
        data = self.getData(values, url)
        return data


    def getStates(self,sku):
        token = self.getToken()
        values = {'token': token,
              'sku': sku}
        url = 'http://%s/api/product/shelf_states' % self.url
        data = self.getData(values, url)
        return data['result']

    def getImages(self):
        token = self.getToken()
        values = {'token': token,
              'sku': '1149456'}
        url = 'http://%s/api/product/images' % self.url
        data = self.getData(values, url)
        return data['result']

    def getPrices(self,sku):
        token = self.getToken()
        values = {'token': token,
              'sku': sku}
        url = 'http://%s/api/product/prices' % self.url
        data = self.getData(values, url)
        return data['result']

    def getProvinces(self):
        token = self.getToken()
        values = {'token': token,}
        url = 'http://%s/api/area/provinces' % self.url
        data = self.getData(values, url)
        return data



    def getArea(self,areatype,id):
        token = self.getToken()
        values = {'token': token,
                  'id':id}
        url = 'http://%s/api/area/%s' % (self.url,areatype)
        data = self.getData(values, url)
        return data


    def getStocks(self):
        token = self.getToken()
        values = {'token': token,
              'sku': '1149456',
               'area':'32_115_125'}
        url = 'http://%s/api/product/stocks' % self.url
        data = self.getData(values, url)
        return data


    def submit(self):
        token = self.getToken()
        values = {'token': token,
            'yggc_order': 'meixiaohui1149456',
            'sku':'[{"sku":1149456,"num":1000,"price":532.00}]',
            'name':'meixiaohui',
            'province':32,
            'city':115,
            'county':125,
            'address':'上海市闵行区',
            'zip':20000,
            'phone':13651675987,
            'mobile':88888,
            'email':'jesse_mei@163.com',
            'invoice_type':2,
            'invoice_title':'我的公司',
            'payment':1}
        url = 'http://%s/api/order/submit' % self.url
        data = self.getData(values, url)
        return data


def order(self,action,orderid):
    token = self.getToken()
    values = {'token': token,
              'order_id': orderid,}
    url = 'http://%s/api/order/%s' % (self.url,action)
    data = self.getData(values, url)
    return data



bozhou = ColipuApi('YiXing','UmeCu1VOuI','10.10.210.131:10030')
guotou = ColipuApi('GuoTou','qckOszPUSMrC','10.10.210.131:10012')
yiyuan = ColipuApi('WHYiYuan','My9UxQnggJIC','180.166.163.28:10119')

a=bozhou.submit()
a=guotou.getDatail()
a=yiyuan.getStates('1042192,101008,1042192,1037248,1054995,1045382')
b=yiyuan.getPrices('1042192,101008,1042192,1037248,1054995,1045382')
#a = bozhou.getArea('cities',32)
#a = bozhou.getArea('getCounty',115)
#b = bozhou.getArea('cities')











'''

def get_token():
    url = "https://qyapi.weixin.qq.com/cgi-bin/gettoken?corpid=wxb37b02ba2b40bdea&corpsecret=jd58FakpPbflDEa2aOFuW-yOIclnjncg412oWEATIBoCOtTMljseEE0VAR2k7mIc"
    req = urllib.request.Request(url)
    with urllib.request.urlopen(req) as response:
        the_page = response.read()
        a = the_page.decode('utf8')
        dic = json.loads(a)
        return dic

a = get_token()
token = a['access_token']


def send_msg(mes):
    url="https://qyapi.weixin.qq.com/cgi-bin/message/send?access_token="+token
    values = {"touser" : "@all" ,
            "toparty":"@all",
            "msgtype":"text",
            "agentid":1,
            "text":{
                "content": "%s"
            },
            "safe":"0"
            }% mes
    #data = urllib.parse.urlencode(values)
    data = values.encode('utf8')
    req = urllib.request.Request(url, data)
    with urllib.request.urlopen(req) as response:
        the_page = response.read()
        a = the_page.decode('utf8')
        dic = json.loads(a)
        return dic

'''
