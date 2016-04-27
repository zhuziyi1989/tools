
### git bash 出现vim的时候怎么退出?
  
  如果是输出状态，首先Esc退出输入状态，然后Shift+;，再输入q!或wq!（不保存改动，wq!是保存文件的写入修改）退出

### git常用命令（烂笔头记录）
git init 创建仓库
git add file  新增文件到版本库
git commit -m "修改注释"  提交修改到版本可以

git status 查看状态
git reflog 查看详细命令日志
git log  查看日志

HEAD^

git reset --hard HEAD^  回到上一个版本

git reset --hard 3628164   回到commit id是"3628164"的版本


每次修改后  add + commit 