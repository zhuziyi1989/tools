---
# Linux 基本操作命令
title: Linux 基本操作命令
comment: false
date: 2016-08-16 11:34:38
categories:
- note
---


# 打包、压缩、解压
.tar.gz格式（.tar是打包! .gz是压缩！打包后的文件名：FileName；需要打包的文件夹：DirName）
* 压缩：```tar zcvf FileName.tar.gz DirName```
* 解压：```tar zxvf FileName.tar.gz```

.zip格式(打包文件file1、file2和目录dir，压缩为file.zip)
* 解压：```unzip file.zip```
* 压缩：```zip -r file.zip file1 file2 dir```

# 上/下载命令 Curl
Wget 是大多数 * nix 系统中标准的命令行下载工具。
Mac OS 自带 Curl 下载 Chrome 的例子：

```bash
curl -O https://dl.google.com/chrome/mac/stable/GGRO/googlechrome.dmg
```
url 重定向链接：

```bash
curl -L -o 'file.zip' 'http://example.com/download.php?fileID=foo'
```
上传文件到远程ftp：
```bash
curl -T wordpress.zip ftp://root:123456@jandou.com/home/wwwroot/
```
上传文件到远程sftp：
```bash
curl -T data.tar.gz -u root sftp://jandou.com
```

# 远程拷贝、上传
* 拷贝到本地：
```bash
scp root@jandou.com:../home/wwwroot/ss.jandou.com.tar.gz ~/Desktop
```
* 上传到远程：
```bash
scp -r public(本地) root@jandou.com:../home/wwwroot/note.jandou.com
```

出现错误｀ public: not a regular file ｀不能成功传送，解决方案：
> 有可能服务器没权限 ｀chmod 777｀ ，在使用scp时加上 ｀-r｀ 参数即可

# VI/VIM 相关命令

`:w`   保存文件但不退出vi
`:w` file 将修改另外保存到file中，不退出vi
`:w!`   强制保存，不推出vi
`:wq`  保存文件并退出vi
`:wq!` 强制保存文件，并退出vi
`:q`  不保存文件，退出vi
`:q!` 不保存文件，强制退出vi
`:e!` 放弃所有修改，从上次保存文件开始再编辑

`i` 进入编辑模式
`d` 非编辑模式，双击 d ,删除整行

# 杀死一个进程  `kill` / `killall`
```killall -9  networkd``` （ -9 参数**强制**杀死该进程，这个信号**不能被捕获也不能被忽略**。另有其他参数，如 -15 使进程**需要被关闭，请自行停止运行并退出**。）

# 网络の管理

## `ifconfig` 

### 查看物理网卡等信息

这个命令很简单，直接执行：` ifconfig`

### 网卡的物理地址的动态重置

例如 00:1f:3c:93:b5:99，可执行：``` ifconfig en1 ether 00:1f:3c:93:b5:99```

## `iftop` 监控网卡的实时流量

![ iftop 画面截图](https://tva1.sinaimg.cn/large/007S8ZIlgy1ge7997kphyj31580qu42i.jpg)

- 界面基本说明

  -  `=>` 右箭头，主机发送流量
  - `<=`左箭头，主机接收流量
  - `TX`：发送流量
  - `RX`：接收流量
  - `TOTAL`：总流量
  - `cum`表示累积流量`cumulative`，`主机对`之间累计的网络数据总流量
  - `peak`指网络速率的尖峰值（最大值）
  - `rates`：分别表示过去 2s 10s 40s 的平均流量

- 举个栗子：`iftop -n -P -N -i enp2s0 -f "src port 8888"`

  - 默认使用第一个网络接口，我这里加参数```-i```上指定网卡`enp2s0`，

  - 参数`-f "src port 8888"`表示过滤信息，只显示本机`8888`端口的流量情况

  - 参数`-n`，表示显示IP地址，而不是主机域名

  - 参数`-P`，表示显示端口

  - 参数`-N`，直接显示端口数字，不执行端口转换成服务操作

> [iftop 基本操作命令详解](iftop.md)

## `lsof`查看当前系统文件的工具

### 列出网络连接信息，并筛选出`tcp`协议，且端口为`8090`的连接。

`lsof -i tcp:8090`

### 列出某个用户(root)的所有活跃的网络端口

`lsof -a -u root -i`

> [有关于 lsof 的详解...](https://linuxtools-rst.readthedocs.io/zh_CN/latest/tool/lsof.html)

##  SSH 远程连接

### 巧用 SSH 做简单代理
连接 172.25.47.49 服务器，并使本地 6088 端口的数据走 Socks 5 代理到服务器网络
```ssh -D 6088 root@172.25.47.49 ```

# 文件(夹)操作
- 删除空目录dir: `rmdir dir`
- 删除非空目录dir: `rm -rf dir`（谨慎）


# 进程守护

1. 用 `screen` 进程守护，来源 http://www.cmsky.com/shadowsocks-manyuser-sspanel/

	```zsh
	screen -S ss
	cd /root/shadowsocks/shadowsocks/
	python servers.py
	```
	恢复执行：
	```zsh
	screen -r ss
	```

2. 用 `supervisor` 进程守护

	- 首先安装 `supervisor`

		默认安装了 `pip` , 如果没安装过，不同平台参考下面命令安装：
		```bash
		$ sudo apt-get install python-pip  # For Debian/Ubuntu
		$ sudo yum install python-pip      # For CentOS
		```

		安装 `supervisor` 命令：
		```bash
		$ pip install supervisor
		```
	- 创建 `supervisor` 配置文件
		```bash
		# 输出至 supervisor 的默认配置路径。
		# 我没有放在默认位置，我放在 /root/shadowsocks 文件夹里的！
		$ echo_supervisord_conf > /etc/supervisord.conf
		```
	- 在 supervisord.conf 所放目录下运行 supervisor 服务
		```bash
		# $ [root@zhuziyi shadowsocks]# supervisord
		$ supervisord
		```
	- vim 配置 supervisor 以监控 ss-manyuser 运行（或者vi命令）
		```bash
		$ vim /etc/supervisord.conf
		```
	- 在文件尾部（当然也可以[新建配置文件](http://supervisord.org/configuration.html)，不过这样比较方便）添加如下内容并酌情修改：
		```text
		[program:ss-manyuser]
		command = python /root/shadowsocks-rm/shadowsocks/servers.py  
		user = root  
		autostart = true  
		autorestart = true  
		```
		其中 command 里的目录请自行修改为你的 servers.py 所在的绝对路径。

	- 重启 supervisor 服务以加载配置
		```bash
		$ killall -HUP supervisord
		```

	- 查看 shadowsocks-manyuser 是否已经运行：
		```bash
		$ ps -ef | grep servers.py
		```

	- 可以通过以下命令管理 shadowsock-manyuser 的状态
		```bash
		$ supervisorctl {start|stop|restart} ss-manyuser
		```

	> 参考：https://prinzeugen.net/build-shadowsocks-sharing-site-with-ss-panel/

3. 在命令后面加上一个 & 符号，表示该命令放在后台执行
	- fg（foreground）命令：将后台进程 **调到前台**
	- bg（background）命令：将一个在后台暂停运行的命令，变成继续在后台执行的命令。
	- Ctrl + Z 命令：将一个正在前台执行的命令放到后台，并且暂停
	- Ctrl + C 命名：结束前台进程
	- 用jobs查看进程的 jobnumber，然后用命令：kill %n 来结束。
	- 用 PS 查看进程的 pid，然后用命令：kill pid 来结束。

4. pm2 管理

- 启动 Shadowsocks：```pm2 start /root/shadowsocks/servers.py --name="shadowsocks" --watch```
- 启动 Http-Server：```pm2 start http-server --name="node-server" --watch```

	> 进程守护全面参考：http://www.ruanyifeng.com/blog/2016/02/linux-daemon.html

# LNMP 相关软件安装目录

```wiki
Nginx 目录: /usr/local/nginx/
MySQL 目录 : /usr/local/mysql/
MySQL数据库所在目录：/usr/local/mysql/var/
MariaDB 目录 : /usr/local/mariadb/
MariaDB数据库所在目录：/usr/local/mariadb/var/
PHP目录 : /usr/local/php/
```

可使用命令 ```which nginx``` 可返回Nginx所在目录。

## 本文相关资料

- LNMP安装了哪些软件？安装目录在哪？http://lnmp.org/faq/lnmp-software-list.html
- ss-panel 搭建教程：https://prinzeugen.net/build-shadowsocks-sharing-site-with-ss-panel/
- Linux 查询手册：[http://linuxtools-rst.readthedocs.io/zh_CN/latest/](http://linuxtools-rst.readthedocs.io/zh_CN/latest/)


