#!/usr/bin/python env
#from app01.host import hosts
import paramiko
hosts = ["10.10.4.188",22,"asd123[]","root"]
class linuxcmd:
	def __init__(self,host,port,passwd,user):
		self.host = host
		self.port = port
		self.passwd = passwd
		self.user = user

	def cmd(self,cmd):
		client = paramiko.SSHClient()
		client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
		client.connect(self.host,self.port,username=self.user,password=self.passwd,timeout=4)
		stdin,stdout,stderr = client.exec_command(cmd)
		text = []
		for i in stdout.readlines():
			a = i.strip()
			text.append(a)
		return text



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


api01 = linuxcmd(hosts[0],hosts[1],hosts[2],hosts[3])
