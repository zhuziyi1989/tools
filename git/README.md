# git烂笔头记录

#### git基础命令

git init 创建仓库

git add file  新增文件file到版本库

git rm file   从版本库里删除file，本地文件不受影响

git commit -m "代码提交信息/修改注释"  提交修改到版本可以

git s(status) 查看状态

git log  查看日志

git reflog 查看详细命令日志

git checkout -- test.txt   恢复误删本地文件test.txt（区别于版本库里的文件！）

> 每次修改后记得 add + commit 提交到仓库

#### 克隆到本地
* 执行如下命令以创建一个本地仓库的克隆版本：
`git clone /path/to/repository`

* 如果是远端服务器上的仓库，你的命令会是这个样子：
`git clone username@host:/path/to/repository`

> 比如克隆github远程仓库
> `git clone git@github.com:{username}/{远程项目路径、名称}.git`

* 默认情况是克隆主分支，若要克隆其它分支：git clone -b {分支名} {仓库地址}   

### HEAD^
git reset --hard HEAD^  回到上一个版本

git reset --hard 3628164   回到commit id是"3628164"的版本

### 远程操作
创建SHH Key 钥匙：

`ssh-keygen -t rsa -C "user@gmail.com"`

id_rsa：私密钥匙

id_rsa.pub：公有钥匙 （在github上点`Add SSH Key`，然后填写标题，并粘贴公有钥匙到Key里。）

多账户需要产生不同钥匙，且需要配置config文件,如下：
`Host gitlab.cbpmgt.com
 HostName gitlab.cbpmgt.com
 User zhuziyi
 IdentityFile ~/.ssh/id_rsa.gitlab

Host github.com
 HostName github.com
 User git
 IdentityFile ~/.ssh/id_rsa.github
 `

!!!!先在远程仓库创建一个名叫`tools`的仓库，所有改动需要本地仓库提交完之后才能对同步远程仓库。

#### 本地仓库与远程库关联：

`git remote add tools git@github.com:zhuziyi1989/tools.git  `（tools：远程仓库名称；zhuziyi1989：github账户名）

#### 把本地master分支的最新修改推送至GitHub:

`git push -u tools master`   （tools：远程仓库名称；master：主分支）

假设有其他人修改了远程主分支，我需要先 `git pull` 拉取远程更，再把本地更新`git push`到远程服务器

### git bash 出现vim的时候怎么退出?

如果是输出状态，首先Esc退出输入状态，然后Shift+;，再输入q!或wq!（不保存改动，wq!是保存文件的写入修改）退出

<<<<<<< HEAD

=======
>>>>>>> [git经典教程](https://lvwzhen.gitbooks.io/git-tutorial/content/)
