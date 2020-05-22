# 树莓派安装 OpenWrt 打造超级路由器


![](https://tva1.sinaimg.cn/large/006tKfTcly1g0vtjq6abvj30ku0bejsf.jpg)  

一直在树莓派上安装Pi-hole当作DNS服务器来使用，最近发现了 OpenWrt 这一项目，可以把树莓派变成一个超级路由器，可以安装上千的插件，实现非常多的功能，例如将树莓派变成无线路由器，实现Nas 、网站服务器、远程监控甚至智能家居，同时还可以让所有设备快速上网（你懂的），同时它又基于Linux系统，可以在做路由器的同时当作一个服务器来使用，扩展性非常强。  

本文教大家如何在树莓派上安装 OpenWrt 打造超级路由器。  

OpenWrt官方介绍：  

> OpenWrt项目是针对嵌入式设备的Linux操作系统。OpenWrt不是一个单一且不可更改的固件，而是提供了一个完全可写的文件系统及软件包管理。这使您可以不使用供应商提供的应用程序选择和配置，而是通过使用软件包来定制设备以适应任何应用程序。对于开发人员来说，OpenWrt是一个构建应用程序的框架，无需在其周围构建完整的固件; 对于普通用户来说，这意味着拥有了完全定制的能力，能以意想不到的方式使用该设备。  
>   
>   
> OpenWrt/LEDE是一个为嵌入式设备（通常是无线路由器）开发的高扩展度的GNU/Linux发行版。与许多其他路由器的发行版不同，OpenWrt/LEDE是一个完全为嵌入式设备构建的功能全面、易于修改的由现代Linux内核驱动的操作系统。在实践中，这意味着您可以得到您需要的所有功能，却仍能避免臃肿。

**〇、设备信息**  
所用到的设备：  


*   Raspberry Pi 2B
*   无线网卡： EDUP EP-N8508GS  

成品就是这货，树莓派无线路由器：  
![](https://tva1.sinaimg.cn/large/006tKfTcly1g0vtjq6abvj30ku0bejsf.jpg)

**一、安装 OpenWrt**  
**(一)支持的设备**  

OpenWrt 支持的设备比较多，可以从 [OpenWrt 支持的设备列表](https://openwrt.org/toh/start)查看，同时要求设备内至少大于4M，在内存小于4M或内存小于32M的设备在可用性、扩展性及操作的稳定性上将有所局限。  

从 OpenWrt 支持的设备列表来看，各版本的树莓派都可以安装最新版本的OpenWrt，截止到2018年10月14日，最新版本是 [18.06.1](https://openwrt.org/releases/18.06.1) 。  

![](https://tva1.sinaimg.cn/large/006tKfTcly1g0vtlrbggrj30sr0d8mzc.jpg)

▲OpenWrt 支持的树莓派版本  

**（二）下载 OpenWrt 镜像**  
在设备上面的表格中选择自己的树莓派型号，点击 View/Edit data ，然后进入 详情页面，选择“ Firmware OpenWrt Install URL ”，这个就是要下载的镜像，我们把它保存到本地。  

**（三）烧录镜像**  
将 OpenWrt 镜像烧录到树莓派中，windows下可以使用 Etcher 软件烧录。同样  
OpenWrt 镜像支持树莓派从U盘启动，详见U盘安装树莓派系统，利用U盘启动Raspberry。  

![](https://tva1.sinaimg.cn/large/006tKfTcly1g0vtmgwr3pj30mb0bd0te.jpg)

**（四）启动树莓派**  
这样 OpenWrt 就已经在树莓派上运行起来了。  

**二、树莓派上的 OpenWrt 配置**  
我打算将树莓派连接到已经在家中工作的无线路由器上，计划用树莓派自带的网卡通过网线连接到家中的路由器，用树莓派的无线网卡发射WIFI，然后其他设备通过树莓派的无线接入。  

以下是我的树莓派无线路由器配置过程。  

**（一）登陆 OpenWrt**  
用网线将树莓派和电脑相连接，然后在浏览器中输入192.168.1.1，即可打开登陆页面。  

![](https://tva1.sinaimg.cn/large/006tKfTcly1g0vtnmioc3j311y0lctay.jpg)

OpenWrt 登陆页面  

自己设置一个密码，点击login登陆  

![](https://tva1.sinaimg.cn/large/006tKfTcly1g0vto0kmsmj311y0lc0va.jpg)

**（二）配置 OpenWrt 联网**  
下一步就是要配置树莓派OpenWrt的网络连接设置，使得 树莓派OpenWrt 连接到互联网，选择 network/Interfaces 选项卡。  

![](https://tva1.sinaimg.cn/large/006tKfTcly1g0vtoeaxg7j311y0lctbr.jpg)

1.新建 WAN 口  
这里新建WAN口的原因是 Wide Area Network代表广域网，即路由器上接到互联网中的网口称为WAN口，为了方便使用新建了这个WAN 口，其实不新建直接在LAN口中配置也行，只是不符合规范。  

点击 “Add new Interface”  

![](https://tva1.sinaimg.cn/large/006tKfTcly1g0vtow3cylj311y0lctbj.jpg)

点击 “Add new Interface”  

2.在“ Name of the new interface”中输入WAN，其他保持不动，点击”submit”(提交)  
![](https://tva1.sinaimg.cn/large/006tKfTcly1g0vtpgjo0tj311y0lctbj.jpg)


3.配置WAN口。  

配置WAN口为静态IP地址，因为我家中的路由器IP地址是192.168.0.1，掩码为255.255.255.255.0,故我的WAN 口配置成IP为  
192.168.0.3， 掩码同样为255.255.255.255.0 ，DNS地址手动填写即可。如下图所示。  

树莓派OpenWrt WAN口配置  

这里要注意的是，配置完成后，OpenWrt会验证接口配置中的IP是否能获取到，如果在点击保存后的30S内，该接口没有获取拿到预期的IP地址，则OpenWrt会取消这项配置，所以在要保证点击配置后，立即将树莓派和家中的路由器用网线连接起来，然后连接家中路由器上，访问[http://192.168.0.3/](http://192.168.0.3/),如果成功打开OpenWrt配置页面，则说明配置成功了，如果不行的话，将树莓派重新连接到电脑中，在30结束后选择强制保存。  
	
![](https://tva1.sinaimg.cn/large/006tKfTcly1g0vtq011ghj311y0lcdiu.jpg)

4.将树莓派连接到家中的路由器上。  
WAN口成功配置后，将树莓派与家中的路由器相连接，同时电脑也连接到家中的路由器，打开页面[http://192.168.0.3/](http://192.168.0.3/)，就可以看到树莓派OpenWrt的配置页面了  

![](https://tva1.sinaimg.cn/large/006tKfTcly1g0vtqexxvlj311y0lc76l.jpg)

这样树莓派 OpenWrt就已经成功连接到互联网了。  

下面继续配置无线路由。  

**三、配置树莓派 OpenWrt 无线路由功能**  
（一）安装无线驱动  
1.进入OpenWrt的“system/Software”选项卡，选择“Configuration”

![](https://tva1.sinaimg.cn/large/006tKfTcly1g0vtqquedoj311y0lcgob.jpg)

进入OpenWrt的“system/Software”选项卡，选择“Configuration”  

2.更换镜像源  
将“Distribution feeds”中的源全部换成中科大的 OpenWrt 镜像源，加快更新及安装软件的速度，否则会有错误。这里再次感谢中科大的 OpenWrt 镜像源，速度快了很多，好像只有他才有OpenWrt 镜像源。  

全部换成如下：  

> .
> src/gz openwrt\_core [http://mirrors.ustc.edu.cn/lede/ ... 08/bcm2709/packages](http://mirrors.ustc.edu.cn/lede/releases/18.06.1/targets/brcm2708/bcm2709/packages)  
> src/gz openwrt\_base [http://mirrors.ustc.edu.cn/lede/ ... -a7\_neon-vfpv4/base](http://mirrors.ustc.edu.cn/lede/releases/18.06.1/packages/arm_cortex-a7_neon-vfpv4/base)  
> src/gz openwrt\_luci [http://mirrors.ustc.edu.cn/lede/ ... -a7\_neon-vfpv4/luci](http://mirrors.ustc.edu.cn/lede/releases/18.06.1/packages/arm_cortex-a7_neon-vfpv4/luci)  
> src/gz openwrt\_packages [http://mirrors.ustc.edu.cn/lede/ ... neon-vfpv4/packages](http://mirrors.ustc.edu.cn/lede/releases/18.06.1/packages/arm_cortex-a7_neon-vfpv4/packages)  
> src/gz openwrt\_routing [http://mirrors.ustc.edu.cn/lede/ ... \_neon-vfpv4/routing](http://mirrors.ustc.edu.cn/lede/releases/18.06.1/packages/arm_cortex-a7_neon-vfpv4/routing)  
> src/gz openwrt\_telephony [http://mirrors.ustc.edu.cn/lede/ ... eon-vfpv4/telephony](http://mirrors.ustc.edu.cn/lede/releases/18.06.1/packages/arm_cortex-a7_neon-vfpv4/telephony)

  ![](https://tva1.sinaimg.cn/large/006tKfTcly1g0vtsdhw8tj311y0lcq5w.jpg)

更换 OpenWrt 镜像源  

3.更新OpenWrt软件包  
点击“Update List”  

![](https://tva1.sinaimg.cn/large/006tKfTcly1g0vtsp4i78j311y0lctb8.jpg)

更新OpenWrt软件包  

4.安装无线驱动  
我的树莓派USB网卡是 EDUP EP-N8508GS 的，亲测其支持的驱动是 kmod-rtl8192cu ，然后再安装无线工具 wireless-tools ，完成后重启树莓派。  

![](https://tva1.sinaimg.cn/large/006tKfTcly1g0vtsztvxpj311y0lcad5.jpg)

5、重启  
重启树莓派后就能看到“NetWorks/Wireless”选项了，点击“Enable”就可以启用无线了，这时手机上就可以搜到名为OpenaWrt的无线了，连上之后就可以上网了。  
![](https://tva1.sinaimg.cn/large/006tKfTcly1g0vtt7vjcmj311y0lcn07.jpg)

树莓派 成为OpenaWrt无线路由器  

 ![](https://tva1.sinaimg.cn/large/006tKfTcly1g0vttdq0sej30kt0mp0ui.jpg)

手机连接OpenWrt即可上网了  

6.无线配置  
点击“Edit”即可配置OpenWrt无线路由器，包括设置无线的名称、密码、是否隐藏、MAC地址过滤等等。  

![](https://tva1.sinaimg.cn/large/006tKfTcly1g0vttnhtc8j311y0lcgoe.jpg)

终于完成了！  

**四、相关故障及解决办法**  
OpenWrt的绝大部分故障都是由于源速度太慢导致的错误，这是由于众所周知的原因，我们可以通过更换中科大的镜像源来解决，有能力的还可以搭建反代来解决。  

以下是常见的故障  

（一）更新中提示 “Could not lock /var/lock/opkg.lock”  


*   opkg\_conf\_load: Could not lock /var/lock/opkg.lock: Resource temporarily unavailable.  
  

解决办法：  


> .
> rm -f /var/lock/opkg.lock  
> opkg update


（二）更新速度慢或者有以下提示  

> .
> Failed to establish connection  
> Collected errors:  
> \* opkg\_download: Failed to download [http://downloads.openwrt.org/rel ... ackages/Packages.gz](http://downloads.openwrt.org/releases/18.06.1/targets/brcm2708/bcm2709/packages/Packages.gz), wget returned 4.  
> \* opkg\_download: Check your network settings and connectivity.  
>   
> \* opkg\_download: Failed to download [http://downloads.openwrt.org/rel ... v4/base/Packages.gz](http://downloads.openwrt.org/releases/18.06.1/packages/arm_cortex-a7_neon-vfpv4/base/Packages.gz), wget returned 4.  
> \* opkg\_download: Check your network settings and connectivity.  
>   
> \* opkg\_download: Failed to download [http://downloads.openwrt.org/rel ... v4/luci/Packages.gz](http://downloads.openwrt.org/releases/18.06.1/packages/arm_cortex-a7_neon-vfpv4/luci/Packages.gz), wget returned 4.  
> \* opkg\_download: Check your network settings and connectivity.


这是由于源站速度太慢造成的  

解决办法：用中科大的镜像替换，将源地址更换为以下地址：  


> .
> src/gz openwrt\_core [http://mirrors.ustc.edu.cn/lede/ ... 08/bcm2709/packages](http://mirrors.ustc.edu.cn/lede/releases/18.06.1/targets/brcm2708/bcm2709/packages)  
> src/gz openwrt\_base [http://mirrors.ustc.edu.cn/lede/ ... -a7\_neon-vfpv4/base](http://mirrors.ustc.edu.cn/lede/releases/18.06.1/packages/arm_cortex-a7_neon-vfpv4/base)  
> src/gz openwrt\_luci [http://mirrors.ustc.edu.cn/lede/ ... -a7\_neon-vfpv4/luci](http://mirrors.ustc.edu.cn/lede/releases/18.06.1/packages/arm_cortex-a7_neon-vfpv4/luci)  
> src/gz openwrt\_packages [http://mirrors.ustc.edu.cn/lede/ ... neon-vfpv4/packages](http://mirrors.ustc.edu.cn/lede/releases/18.06.1/packages/arm_cortex-a7_neon-vfpv4/packages)  
> src/gz openwrt\_routing [http://mirrors.ustc.edu.cn/lede/ ... \_neon-vfpv4/routing](http://mirrors.ustc.edu.cn/lede/releases/18.06.1/packages/arm_cortex-a7_neon-vfpv4/routing)  
> src/gz openwrt\_telephony [http://mirrors.ustc.edu.cn/lede/ ... eon-vfpv4/telephony](http://mirrors.ustc.edu.cn/lede/releases/18.06.1/packages/arm_cortex-a7_neon-vfpv4/telephony)


原文来自：[科技爱好者博客](http://blog.lxx1.com/3294)