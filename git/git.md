### git bash 出现vim的时候怎么退出?
如果是输出状态，首先Esc退出输入状态，然后Shift+;，再输入q!或wq!（不保存改动，wq!是保存文件的写入修改）退出

### git命令（烂笔头记录）
git init 创建仓库
git add file  新增文件到版本库
git commit -m "修改注释"  提交修改到版本可以

git status 查看状态
git reflog 查看详细命令日志
git log  查看日志

### HEAD^ 

git reset --hard HEAD^  回到上一个版本

git reset --hard 3628164   回到commit id是"3628164"的版本


每次修改后  add + commit 



### 远程操作
创建SHH Key 钥匙：
`ssh-keygen -t rsa -C "user@gmail.com"` 
id_rsa：私密钥匙
id_rsa.pub：公有钥匙 （在github上点`Add SSH Key`，然后填写标题，并粘贴公有钥匙到Key里。）

!!!!先在远程仓库创建一个名叫`tools`的仓库，所有改动需要本地仓库提交完之后才能对同步远程仓库。

#### 本地仓库与远程库关联：
`git remote add tools git@github.com:zhuziyi1989/tools.git  `（tools：远程仓库名称；zhuziyi1989：github账户名）
#### 把本地master分支的最新修改推送至GitHub:
`git push -u tools master`   （tools：远程仓库名称；master：主分支）

#### 克隆到本地
`git clone git@github.com:{username}/{远程项目名称}.git`

<<<<<<< HEAD

=======
xxx
>>>>>>> d51a089bae7b6dc3c30c7f488b235314452e72c0
