---
title: Server 操作笔记
comment: false
date: 2016-09-16 11:34:38
---

### 常用命令
新增虚拟主机：lnmp vhost add
重启LNMP，输入命令：/root/lnmp restart 即可，单独重启mysql：/etc/init.d/mysql restart
启动 Shadowsocks：pm2 start /root/shadowsocks/servers.py --name="shadowsocks" --watch
启动 Http-Server：pm2 start http-server --name="node-server" --watch

### LNMP状态管理命令
LNMP 1.2状态管理: lnmp {start|stop|reload|restart|kill|status}
LNMP 1.2各个程序状态管理: lnmp {nginx|mysql|mariadb|php-fpm|pureftpd} {start|stop|reload|restart|kill|status}
LNMP 1.1状态管理： /root/lnmp {start|stop|reload|restart|kill|status}
Nginx状态管理：/etc/init.d/nginx {start|stop|reload|restart}
MySQL状态管理：/etc/init.d/mysql {start|stop|restart|reload|force-reload|status}
Memcached状态管理：/etc/init.d/memcached {start|stop|restart}
PHP-FPM状态管理：/etc/init.d/php-fpm {start|stop|quit|restart|reload|logrotate}
PureFTPd状态管理： /etc/init.d/pureftpd {start|stop|restart|kill|status}
ProFTPd状态管理： /etc/init.d/proftpd {start|stop|restart|reload}

### LNMP相关软件安装目录
Nginx 目录: /usr/local/nginx/
MySQL 目录 : /usr/local/mysql/
MySQL数据库所在目录：/usr/local/mysql/var/
MariaDB 目录 : /usr/local/mariadb/
MariaDB数据库所在目录：/usr/local/mariadb/var/
PHP目录 : /usr/local/php/

### 引用
安装LNMPA包说明：https://lnmp.org/install.html
添加虚拟主机：https://lnmp.org/faq/lnmp-vhost-add-howto.html
LNMP安装了哪些软件？安装目录在哪？ http://lnmp.org/faq/lnmp-software-list.html
ss-panel 搭建教程：https://prinzeugen.net/build-shadowsocks-sharing-site-with-ss-panel/
