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
    values = '''{"touser" : "@all" ,
            "toparty":"@all",
            "msgtype":"text",
            "agentid":1,
            "text":{
                "content": "%s"
            },
            "safe":"0"
            }'''% mes
    #data = urllib.parse.urlencode(values)
    data = values.encode('utf8')
    req = urllib.request.Request(url, data)
    with urllib.request.urlopen(req) as response:
        the_page = response.read()
        a = the_page.decode('utf8')
        dic = json.loads(a)
        return dic


