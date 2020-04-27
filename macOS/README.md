# Mac 软件操作笔记

date: 2016-09-17 11:34:38

## Mac 基础快捷键
* ctrl+shift+△  关闭显示器
* command+option+△  睡眠
* command+control+△ 关闭所有的应用程序并重启
* command+shift+Y 用当前选中的文字生成便签
* command+option+esc 退出程序
* command+shift+Y 用当前选中的文字生成便签

**super按键就是 command ！！**

## Sublime Text 基础命令

* 光标先选中每一行
* Ctrl+L全选
* Ctrl+Alt+Enter每一行包裹标签，修改标签名字。
* Ctrl+Shift+K   删除行

## Node.js 入门操作
$ nmp init  自动生成package.json

有package.json文件之后，直接使用npm install命令，就会在当前目录中安装所需要的模块。

单独安装express模块时：
* -\-save参数表示将该模块写入dependencies属性
* -\-save-dev表示将该模块写入devDependencies属性。

$ npm install express -\-save
$ npm install express -\-save-dev

 [Package.json文件解析](http://javascript.ruanyifeng.com/nodejs/packagejson.html)  from 阮一峰
