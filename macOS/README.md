# Mac 软件操作笔记

date: 2016-09-17 11:34:38

## Mac

### 快捷键

- ctrl+shift+△  关闭显示器
- command+option+△  睡眠
- command+control+△ 关闭所有的应用程序并重启
- command+option+esc / command+Q 退出程序

> super按键就是command

### Sublime Text 快捷技巧

- Ctrl+Alt+Enter 每一行包裹标签，修改标签名字 
- Ctrl+Shift+K（Command+Shift+K）  删除行
- 鼠标选中文本，按下 Alt+F3（ Ctrl+Command+G ），即可一次性选择全部的相同文本进行同时编辑；
- 鼠标选中多行，按下 Ctrl+Shift+L（Command+Shift+L），即可同时编辑这些行；
- Shift 鼠标右键 (Win) 或 Option 鼠标左键 (Mac) 或使用鼠标中键可以用鼠标进行竖向多行选择；
- Ctrl 鼠标左键(Win) 或 Command 鼠标左键(Mac) 可以自定义选择要编辑的地方。

### TNT的破解软件的使用

如果你的 macOS 装的是TNT的破解软件的话，因为Apple删除了TNT的证书，因此应用程序将在7月12日之后崩溃。目前的解决方案是自己签名。

- 首先，打开终端，安装xcode命令行模式:

xcode-select --install

- 然后在终端输入：

codesign --force --deep --sign - /Applications/name.app

* name.app实际上是你的应用软件的包名。

> Via：https://qiujunya.com/article/2019/7/17/45.html

### 如何制作一个 macOS 系统引导安装盘？

- 格式化 U盘：填写名称 HighSierra 或 Mojave  、选 MacOS 扩展（日志式） 、GUID 分区图

- 安装 macOS Mojave.app  10.14.6 (18G103)

```
sudo /Applications/Install\ macOS\ Mojave.app/Contents/Resources/createinstallmedia --volume /Volumes/Mojave /Applications/Install\ macOS\ Mojave.app --nointeraction
```

- 安装 macOS High Sierra.app   10.13.6(17G4015)   2018年12月5日  High Sierra最后一个版本

```
sudo /Applications/Install\ macOS\ High\ Sierra.app/Contents/Resources/createinstallmedia --volume /Volumes/HighSierra --applicationpath /Applications/Install\ macOS\ High\ Sierra.app --nointeraction
```

### 防止 Google Chrome 自动更新：

#### 将 GoogleSoftwareUpdate.bundle 破坏

- 更改 `GoogleSoftwareUpdate.bundle` 后缀名

```
sudo mv /Library/Google/GoogleSoftwareUpdate GoogleSoftwareUpdate.bundle.bak  //Root 用户下
sudo mv ~/Library/Google/GoogleSoftwareUpdate/GoogleSoftwareUpdate.bundle  GoogleSoftwareUpdate.bundle.bak //当前用户下
```

- 若要恢复需要执行：
```
sudo mv /Library/Google/GoogleSoftwareUpdate.bak GoogleSoftwareUpdate.bundle
sudo mv ~/Library/Google/GoogleSoftwareUpdate.bak GoogleSoftwareUpdate.bundle
```

#### 更改上级文件夹所有者权限

其实过一会儿 GoogleSoftwareUpdate.bundle 文件又会自动生成，于是更改上级文件夹所有者权限，不让浏览器写入文件信息即可 

```
sudo chown root:wheel /Library/Google/GoogleSoftwareUpdate
sudo chown root:wheel ~/Library/Google/GoogleSoftwareUpdate
```

### macOS 不同版本 Chrome 的共存安装方法

需求：安装一个旧版本 Chrome 版本方法，并与新版本共存

* 以下的新版本是 77，旧版本是 70

- ① 首先备份新版本 Chrome 的用户个人资料，在这个路径：

~/Library/ApplicationSupport/Google/  

将该路径目录下的 “Chrome” 文件夹暂时更改为“Chrome.bak”。

- ② 然后在“应用程序”里将第二个 Chrome 重命名，这里假设改为 “Google Chrome 70”

然后启动一次，路径 ~/Library/ApplicationSupport/Google/ 目录下就生成新的“Chrome” 了，这时将其改为 “Chrome 70”，以供老版本使用，再然后将第 ① 步骤中的“Chrome.bak”还原成“Chrome”，以供给新版本使用。

- ③ “Command+空格”打开聚焦搜索，搜索"脚本编辑器”并打开它，然后复制以下代码到编辑器中：

do shell script "/Applications/Google\\ Chrome\\ 70.app/Contents/MacOS/Google\\ Chrome --user-data-dir=/Users/$USER/Library/Application\\ Support/Google/Chrome\\ 70 > /dev/null 2>&1 &"

- ④ 将上一步骤的代码另存为“Google Chrome 70 启动器”，文件格式请选择“应用程序”，然后保存到 USER 目录下的应用程序中，然后就可以用这个文件启动旧版本 Chrome。

- ⑤ 替换下图标，好看点。

选中“Google Chrome 70 启动器”，并右键“显示包内容”，Contents → Resources，替换“applet.icns”即可。

## 终端 Terminal
### 一些不好记住的命令
- sudo killall -9  networkd
- ifconfig  网络配置
- lsof -i tcp:8090 -n  查看8090端口使用情况
- traceroute -p 10086 us.jandou.com  查看主机端口是否开放（或被阻断）

###  traceroute  Linux 环境下端口可用性探测工具

这个工具在Mac上有些略微不同，在centOS使用没问题。

`traceroute [-n] -T -p <目标端口号> Host`

例如：

`traceroute -n -T -p 443 jandou.com`

- -n 直接使用 IP 地址而非主机名称（禁用 DNS 反查）。
- -T 通过 TCP 探测。
- -p 探测目标端口号。
-  Host 目标服务器域名或 IP。

Via: [More...](https://www.alibabacloud.com/help/zh/faq-detail/40572.htm) 
## Git 

 放弃本地所有的改动  git reset --hard HEAD  （谨慎操作！请先提交存档本地改动！）


##  RK61键盘使用技巧

- FN+Ctrl(左)  切换功能键（YUIHJKNM、FN功能键的切换）
- FN+Shift(右)  上下左右按键切换
- Shift+FN+↑ 输入问号？

官方说明书：http://www.rkgaming.com/zh-CN/article.php?id=44


##  NPM 烂笔头

- npm home 打开项目主页
- npm bugs 打开项目的 issue 反馈页面

- 构建钩子
```
"prebuild": "echo I run before the build script",
"build": "cross-env NODE_ENV=production webpack",
"postbuild": "echo I run after the build script"
```
npm 脚本有pre和post两个钩子。
用户执行npm run build的时候，会自动按照下面的顺序执行：

```
npm run prebuild && npm run build && npm run postbuild
```

npm scripts  (link)[http://www.ruanyifeng.com/blog/2016/10/npm_scripts.html]