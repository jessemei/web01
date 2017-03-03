#!coding:utf-8
from django.shortcuts import render
from django.http import HttpResponse
import simplejson
from django.shortcuts import redirect
from django.http import request
from django.template import loader
from app01.host import *
from app01.sshlinux import *
from app01.host import hosts
from app01.models import *
import hashlib
from django.db import connection,transaction
import json
# Create your views here.
#

def deco(fun):
    def wrapper(request,*args,**kwargs):
        is_login1 = request.session.get('is_login')
        if is_login1:
  	        return fun(request,*args,**kwargs)
        else:
	        return redirect("/login")
    return wrapper

@deco
def index(request):
    user2 = request.session.get('user')
    return render(request, 'index1.html',{'user':user2})
@deco
def asset1(request):
    if request.method == 'GET':
        p = Asset.objects.all()
        #print(type(p))
        return render(request,"table.html",{'data':p})
@deco
def add1(request):
    if request.method == 'GET':
        #p = Asset.objects.all()
        return render(request, "asset_add.html")
    else:
        dname = request.POST['dname_id']
        atype = request.POST['atype']
        zcbh = request.POST['zcbh']
        bgr = request.POST['bgr']
        brand = request.POST['brand']
        price = request.POST['price']
        aunit = request.POST['aunit']
        count  = request.POST['count']
        gdate = request.POST['gdate']
        status = request.POST['status']
        print(dname,atype,gdate)
        return HttpResponse('ok')

@deco
def fenye(request,page1):
    if request.method == 'GET':
       zongyeshu = Asset.objects.all().count()
       c = 10
       if zongyeshu%c != 0:
           zpage = zongyeshu//c + 1
       else:
           zpage = zongyeshu//c

       page = int(page1)

       cpage = page + 1
       if page == 1:
           spage = 1
       else:
           spage = page - 1

       start = (page-1)*c
       end = start + c
       y = page
       if page == 1:
           y2 = None
       else:
           y2 = page -1

       y1 = page + 1
       p = Asset.objects.all()[start:end]
    return render(request, "pc.html", {'data': p,'cpage':cpage,'zpage':zpage,'spage':spage,'zongyeshu':zongyeshu,'y1':y1,'y2':y2,'y':y})
@deco
def api(request):
    if request.method == 'GET':
        return render(request,'api.html')
    else:
        action = request.POST['action']
        apisite = request.POST['apisite']
        sshhost(hosts[0]["host"], hosts[0]["port"], hosts[0]["passwd"], hosts[0]["user"], '/root/iissite.sh %s %s'% (action,apisite))
        return HttpResponse("<h2>OK</h2>")
@deco
def apiinfo(request):
    return render(request, 'apiinfo.html')


def passwd(pw):
    str5 = pw
    s2 = str5.encode(encoding='utf-8')
    md5 = hashlib.md5()
    md5.update(s2)
    password = md5.hexdigest()
    return password

def login(request):
    if request.method == 'POST':
        user1 = request.POST['username']
        pw = passwd(request.POST['password'])
        a = user.objects.filter(username=user1)
        print(a)
        if user.objects.filter(username=user1).count() != 0:
            sqlpw = user.objects.filter(username=user1).values('password')[0]['password']
            if user.objects.filter(username=user1) != None and pw == sqlpw:
                request.session['is_login'] = True
                request.session['user'] = user1
                return redirect('/index')
            else:
                return render(request, 'login.html', {'error': '密码错误！'})
        else:
            return render(request, 'login.html', {'error': '用户名不存在！'})
    else:
        return render(request,'login.html')


def aprorder(request):
    api01 = sshhost(hosts[0]["host"], hosts[0]["port"], hosts[0]["passwd"], hosts[0]["user"],'/root/api01.sh')
    api02 = sshhost(hosts[0]["host"], hosts[0]["port"], hosts[0]["passwd"], hosts[0]["user"],'/root/api02.sh')
    api03 = sshhost(hosts[0]["host"], hosts[0]["port"], hosts[0]["passwd"], hosts[0]["user"],'/root/api03.sh')

    return render(request,'apiorder.html',{'data1':api02[0:5],'data2':api02[5:10],
                                           'data3':api02[10:15],'data4':api02[15:20],
                                           'data5':api02[20:25],'data6':api02[25:30],
                                           'data7':api02[30:35],'data8':api02[35:40],
                                           'data9':api02[40:45],
                                           'data10':api01,'data11':api03[0:5],
                                           'data12': api03[5:10],'data13':api03[10:15],
                                           'data14': api03[15:20],'data15':api03[20:25],
                                           'data16': api03[25:30],'data17':api03[30:35],
                                           'data18': api03[35:40],'data19':api03[40:45],
                                           'data20': api03[45:50],
                                           }
                  )


def search(request):
    if request.method == 'POST':
        if request.POST['tiaojian'] == 'b':
            user = request.POST['username']
            sdata = Asset.objects.filter(Bgr=user)
            return render(request, "search.html", {'data':sdata})
        else:
            user = request.POST['username']
            sdata = Asset.objects.filter(Zcbh=user)
            return render(request, "search.html", {'data': sdata})

    else:
        return render(request,'pc.html')

ziduan = ['Apiname','worder','horder','yorder','product']
cishu = [0,1,2,3,4]
#ap = zip(cishu,zichan)
ap = [('Apiname', 0), ('worder', 1), ('horder', 2), ('yorder', 3), ('product', 4)]


def edit(request):
    dept1 = {'销售部':1,'采购部':2,'信息技术部':3,'客服部':4,'市场部':5,'事业加盟部':6,
             '战略研究部':7,'人事行政部':8,'财务部':9,'仓储配送部':10}
    atype1 = {'笔记本电脑':1,'台式电脑':13}
    name = request.POST['Aname']
    zcbq = request.POST['zcbq']
    brand = request.POST['brand']
    num = request.POST['num']
    yuanzhi = request.POST['yuanzhi']
    status = request.POST['status']
    gdate = request.POST['gdate']
    atype = request.POST['atype']
    auint = request.POST['auint']
    dept = request.POST['dept']
    id = request.POST['id']
    try:
        Asset.objects.filter(id=id).update(Count=num,Zcbh=zcbq,Bgr=name,
                                           Dname=dept1[dept],gtime=gdate,
                                           Status=status,Brand=brand,Price=yuanzhi,
                                           Aunit=auint,Atype=atype1[atype])

    except Exception:
        data = {
            'status':'OK'
        }
        return HttpResponse(simplejson.dumps(data))
    else:
        data = {
            'status': 'OK'
        }
        return HttpResponse(simplejson.dumps(data))


def logout(request):
    del request.session['user']
    del request.session['is_login']
    return render(request,'login.html')

def test(request):
    return render(request,'boo.html')

def adel(request):


    try:
        id = request.POST['aid']
        Asset.objects.get(id=id).delete()
    except Exception:
        data = {
            'status': 'NO'
        }
        return HttpResponse(simplejson.dumps(data))
    else:
        data = {
        'status': 'OK'
        }
        return HttpResponse(simplejson.dumps(data))
def apidata(dname):
    cursor = connection.cursor()
    cursor.execute("SELECT SUM(Price) from app01_asset WHERE Dname=%s"%dname)
    b = cursor.fetchone()[0]
    return b


def assetinfo(request):
    deptnum = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    deptdata = [apidata(i) for i in deptnum]
    return render(request,'assetinfo.html',{'data':deptdata})

def zichan(request):

    p = Asset.objects.all()

    return render(request,'pc1.html',{'data':p})