#!/usr/bin/python env
from app01.host import hosts
import paramiko
def sshhost(host,port,passwd,user,cmd):
	client = paramiko.SSHClient()
	client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
	client.connect(host,port,username=user,password=passwd,timeout=4)
	stdin,stdout,stderr = client.exec_command(cmd)
	data = []
	for std in stdout.readlines():
		a = std.strip()
		data.append(a)
	return data


api03 = sshhost(hosts[0]["host"], hosts[0]["port"], hosts[0]["passwd"], hosts[0]["user"],'/root/api03.sh')
a03 = [api03[i:49:5] for i in range(5)]



#sshhost(hosts[0]["host"],hosts[0]["port"],hosts[0]["passwd"],hosts[0]["user"], '/root/iissite.sh %s,%s' % a,b )
