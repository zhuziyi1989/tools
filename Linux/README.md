---
title: Linux 命令笔记
comment: false
date: 2016-08-16 11:34:38
categories:
- note
---


### 打包、压缩、解压
.tar.gz格式（.tar是打包! .gz是压缩！打包后的文件名：FileName；需要打包的文件夹：DirName）
* 压缩：[＊＊＊＊＊＊＊] $ tar zcvf FileN	ame.tar.gz DirName
* 解压：[＊＊＊＊＊＊＊] $ tar zxvf FileName.tar.gz

.zip格式(打包文件file1、file2和目录dir，压缩为file.zip)
* 解压：[＊＊＊＊＊＊＊] $ unzip file.zip
* 压缩：[＊＊＊＊＊＊＊] $ zip -r file.zip file1 file2 dir

### 上/下载命令 Curl
Wget 是大多数 * nix 系统中标准的命令行下载工具。
Mac OS 自带 Curl 下载 Chrome 的例子：
```bash
$ curl -O https://dl.google.com/chrome/mac/stable/GGRO/googlechrome.dmg
```
url 重定向链接：[＊＊＊＊＊＊＊] $ curl -L -o 'file.zip' 'http://example.com/download.php?fileID=foo'
上传文件到远程ftp：[＊＊＊＊＊＊＊] $ curl -T wordpress.zip ftp://root:123456@jandou.com/home/wwwroot/
上传文件到远程sftp：[＊＊＊＊＊＊＊] $ curl -T data.tar.gz -u root sftp://jandou.com

### 远程拷贝、上传
* 拷贝到本地：[＊＊＊＊＊＊＊] $ scp root@jandou.com:../home/wwwroot/ss.jandou.com.tar.gz ~/Desktop
* 上传到远程：[＊＊＊＊＊＊＊] $ scp -r public(本地) root@jandou.com:../home/wwwroot/note.jandou.com

出现错误｀ public: not a regular file ｀不能成功传送，解决方案：
> 有可能服务器没权限 ｀chmod 777｀ ，在使用scp时加上 ｀-r｀ 参数即可

### VI/VIM 相关命令

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


### 网卡的物理地址的动态重置

例如 00:1f:3c:93:b5:99，可执行：[＊＊＊＊＊＊＊] $ sudo ifconfig en1 ether 00:1f:3c:93:b5:99

### Mac Terminal
sudo killall -9  networkd
ifconfig  查看网络配置
lsof -i tcp:8090 -n  查看8090端口使用情况
ssh -D 6088 supdev@172.25.47.49  连接 172.25.47.49 服务器，本地 6088 端口数据 Socks 5 代理到服务器网络

### 文件(夹)操作
\>  ~/ 当前用户目录
\>  /  机器根目录

删除空目录dir: `rmdir dir`
删除非空目录dir: `rm -rf dir`




### 进程守护

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
	> 进程守护全面参考：http://www.ruanyifeng.com/blog/2016/02/linux-daemon.html
	### 常用命令
	新增虚拟主机：lnmp vhost add
	重启LNMP，输入命令：/root/lnmp restart 即可，单独重启mysql：/etc/init.d/mysql restart
	启动 Shadowsocks：pm2 start /root/shadowsocks/servers.py --name="shadowsocks" --watch
	启动 Http-Server：pm2 start http-server --name="node-server" --watch

### LNMP 状态管理命令
LNMP 1.2状态管理: lnmp {start|stop|reload|restart|kill|status}
LNMP 1.2各个程序状态管理: lnmp {nginx|mysql|mariadb|php-fpm|pureftpd} {start|stop|reload|restart|kill|status}
LNMP 1.1状态管理： /root/lnmp {start|stop|reload|restart|kill|status}
Nginx状态管理：/etc/init.d/nginx {start|stop|reload|restart}
MySQL状态管理：/etc/init.d/mysql {start|stop|restart|reload|force-reload|status}
Memcached状态管理：/etc/init.d/memcached {start|stop|restart}
PHP-FPM状态管理：/etc/init.d/php-fpm {start|stop|quit|restart|reload|logrotate}
PureFTPd状态管理： /etc/init.d/pureftpd {start|stop|restart|kill|status}
ProFTPd状态管理： /etc/init.d/proftpd {start|stop|restart|reload}

### LNMP 相关软件安装目录
Nginx 目录: /usr/local/nginx/
MySQL 目录 : /usr/local/mysql/
MySQL数据库所在目录：/usr/local/mysql/var/
MariaDB 目录 : /usr/local/mariadb/
MariaDB数据库所在目录：/usr/local/mariadb/var/
PHP目录 : /usr/local/php/


### 资料
> 安装LNMPA包说明：https://lnmp.org/install.html
> 添加虚拟主机：https://lnmp.org/faq/lnmp-vhost-add-howto.html
> LNMP安装了哪些软件？安装目录在哪？ http://lnmp.org/faq/lnmp-software-list.html
> ss-panel 搭建教程：https://prinzeugen.net/build-shadowsocks-sharing-site-with-ss-panel/
> Linux 查询手册：[http://linuxtools-rst.readthedocs.io/zh_CN/latest/](http://linuxtools-rst.readthedocs.io/zh_CN/latest/)
