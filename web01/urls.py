"""web01 URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.9/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Add an import:  from blog import urls as blog_urls
    2. Import the include() function: from django.conf.urls import url, include
    3. Add a URL to urlpatterns:  url(r'^blog/', include(blog_urls))
"""
from django.conf.urls import url,include
from django.contrib import admin
from app01 import views

urlpatterns = [
    url(r'^app01/',include('app01.urls')),
    url(r'^app02/',include('app02.urls')),
    url(r'^admin/', admin.site.urls),
    url(r'^index',views.index),
    url(r'^api/',views.api,),
    url(r'^add/',views.add1,),
    url(r'^edit/',views.edit,),
    url(r'^del/',views.adel,),
    url(r'^assetinfo/',views.assetinfo,),
    url(r'^test/',views.test,),
    url(r'^zichan/',views.zichan,),
    url(r'^page/([0-9][0-9])/$',views.fenye,),
    url(r'^page/([0-9][0-9][0-9])/$',views.fenye,),
    url(r'^page/([0-9])/$',views.fenye,),
    url(r'^asset/',views.asset1,),
    url(r'^apiinfo/',views.apiinfo,),
    url(r'^login/',views.login,),
    url(r'^logout/',views.logout,),
    url(r'^apiorder/',views.aprorder,),
    url(r'^search/',views.search,),
    url(r'^weixin/',views.weixin,),
]
