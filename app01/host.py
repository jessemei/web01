#!/usr/bin/env python
#!coding:utf:8
import sys

from pypinyin import pinyin,lazy_pinyin

def ping(wenzi):
    data = ''.join(lazy_pinyin(wenzi))
    return data
data = {
    'HR':['Human Resource & Admin Dept.','Private'],
    '采购':['"Merchandising Dept."','Purchasing'],
    '销售':['"Direct Sales Dept."','DirectSelling'],
    'IT':['"Information Technology Dept."','InformationTechnology'],
    '客服':['"Customer Service Dept."','CustomerService'],
    '市场':['"Sales Promotion Dept."','SalesPromotion'],
        }
test2 = [

        ['乔鹏','销售'],


         ]

f1 = open('user.txt','w')
sys.stdout = open('user.txt','w')
for i in test2:
    print("Enable-Mailbox -Identity 'colipu.local/colipu/%s/%s' -Alias '%s' -Database '%s'"
          %(data[i[1]][0], i[0], ping(i[0]), data[i[1]][1]))
    print( '''%s,%s,%s,%s@colipu.local,colipu.local,Aa123456,%s,%s,'''
         %(i[0][0],i[0][1:3],i[0],ping(i[0]),data[i[1]][0],ping(i[0])))


def aduser(type):

    if type == 'ad':
        for i in test2:
            return "Enable-Mailbox -Identity 'colipu.local/colipu/%s/%s' -Alias '%s' -Database '%s'"% (data[i[1]][0], i[0], ping(i[0]), data[i[1]][1])
    else:
        for i in test2:
            return "%s,%s,%s,%s@colipu.local,colipu.local,Aa123456,%s,%s,"%(i[0][0],i[0][1:3],i[0],ping(i[0]),data[i[1]][0],ping(i[0]))
