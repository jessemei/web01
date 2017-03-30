#!/usr/bin/env python
#!coding:utf:8
import sys

from pypinyin import pinyin,lazy_pinyin
hosts = [{"host":"10.10.4.188","port":22,"passwd":"asd123[]","user":"root"}]
def ping(wenzi):
    a = ''.join(lazy_pinyin(wenzi))
    return a
data = {'销售部':['"Direct Sales Dept."','DirectSelling'],
        '采购部':['"Merchandising Dept."','Purchasing'],
        'IT':['"Information Technology Dept."','InformationTechnology'],
        '财务部':['"Financial Dept."','Financial'],
        '市场部':['"Sales Promotion Dept."','SalesPromotion'],
        '客服部':['"Customer Service Dept."','CustomerService']
        }
test2 = [
        ['杨语彤','销售部'],

         ]

f1 = open('user.txt','w')
sys.stdout = open('user.txt','w')
for i in test2:
    print("Enable-Mailbox -Identity 'colipu.local/colipu/%s/%s' -Alias '%s' -Database '%s'"
          %(data[i[1]][0], i[0], ping(i[0]), data[i[1]][1]))
    print( '''%s,%s,%s,%s@colipu.local,colipu.local,Aa123456,%s,%s,'''
    %(i[0][0],i[0][1:3],i[0],ping(i[0]),data[i[1]][0],ping(i[0])))
