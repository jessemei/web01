#!/usr/bin/env python
#!coding:utf:8

from pypinyin import pinyin,lazy_pinyin
hosts = [{"host":"10.10.4.188","port":22,"passwd":"asd123[]","user":"root"}]

exchangedata = [('CustomerService','客服部'),('DirectSelling','销售部'),
                ('Financial','财务部'),('InformationTechnology','信息技术部'),
                ('Mailbox Database 0410844510',''),('Private','人事行政部'),
                ('Purchasing','采购部'),('SalesPromotion','市场部')]

info = {
    '直销销售部':('DirectSelling','DirectSelling'),
    '采购部':('Purchasing','Purchasing')
}

def ping(wenzi):
    a = ''.join(lazy_pinyin(wenzi))
    return a

renyuan = ['高亮']
infolist = [ping(i) for i in renyuan]
for i in range(len(infolist)):
    print('''Enable-Mailbox -Identity 'colipu.local/colipu/%s' -Alias '%s' -Database 'Private' '''
          %(renyuan[i],infolist[i]))
    print('''%s,%s,%s,%s@colipu.local,colipu.local,Aa123456,colipu,%s,'''
          %(renyuan[i][0],renyuan[i][1:3],renyuan[i],infolist[i],infolist[i]))

