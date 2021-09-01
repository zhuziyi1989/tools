# iTerm2 Help

|   Mac 部分键名   |  图标    |
| ---- | ---- |
|caps lock|`⇪`|
|shift|`⇧`|
|control|`^`|
|option/alt|`⌥` 分叉的轨道|
|command|`⌘`|
|喜爱程度（favorite）|🍑|

## 标签

* 新建标签：command + t
* 关闭标签：command + w
* 切换标签：command + 数字    command + 左右方向键

## 查找

- 屏幕上查找：`⌘` + `f` 
- 搜索命令历史：`^`+ `r` 重复按，循环显示。

## 分屏

* 垂直分屏：command + d
* 水平分屏：command + shift + d
* 切换屏幕：`⌘`+`f`+`方向键` 或 `⌘`+`[` 或 `⌘`+ `]`
* 切换全屏：`⌘`+`enter `

## 快速输入

- 历史类似命令：`⌘` + `;` （输入打头几个字母，然后输入命令，iterm2 将自动列出之前输入过的类似命令。）
- 历史剪切板：`⌘`+ `⇧` + `h` （iterm2 将自动列出剪切板的历史记录。如果需要将剪切板的历史记录保存到磁盘，在Preferences > General > Magic > Save copy/paste history to disk.中设置。）
- 快跳历史目录： `d` （输入 d 显示最近频繁进入的路径，然后输入路径前对应序号，可进入对应路径）
- 快速目录跳转：`j` + `关键词`  （输入 j + 关键词，根据记忆自动快速进入对应路径）
- 查看历史输入命令列表：`history`  列出最近历史输入的全部命令

## 其他

* 清除当前行：ctrl + u
* 到行首：ctrl + a
* 到行尾：ctrl + e
* 前进后退：ctrl + f/b (相当于左右方向键)
* 上一条命令：ctrl + p
* 搜索命令历史：ctrl + r
* 删除当前光标的字符：ctrl + d
* 删除光标之前的字符：ctrl + h
* 删除光标之前的单词：ctrl + w
* 清空全部：ctrl + q
* 删除到文本末尾：ctrl + k
* 交换光标处文本：ctrl + t
* 清屏1：command + r (不清空历史)
* 清屏2：command + k (清空历史！) ⚠️
* 清屏3：ctrl + l (不清空历史)
* 清屏3：输入命令 clear (不清空历史)

## Tabs and Windows


**Function** | **Shortcut**
-------- | --------
New Tab| `⌘` + `T`
Close Tab or Window | `⌘` + `W`  (same as many mac apps)
Go to Tab | `⌘` + `Number Key`  (ie: `⌘2` is 2nd tab)
Go to Split Pane by Direction | `⌘` + `Option` + `Arrow Key`
Cycle iTerm Windows | `⌘` + `backtick`  (true of all mac apps and works with desktops/mission control)
**Splitting** 拆分窗口 | 
Split Window Vertically (same profile) | `⌘` + `D`
Split Window Horizontally (same profile) | `⌘` + `Shift` + `D`  (mnemonic: shift is a wide horizontal key)
**Moving** 移动拖拽窗口 |
Move a pane with the mouse | `⌘` + `Alt` + `Shift` and then drag the pane from anywhere
**Fullscreen** |
Fullscreen | `⌘`+ `Enter`
Maximize a pane | `⌘` + `Shift` + `Enter`  (use with fullscreen to temp fullscreen a pane!)
Resize Pane | `Ctrl` + `⌘` + `Arrow` (given you haven't mapped this to something else)
**Less Often Used By Me** |
Go to Split Pane by Order of Use | `⌘` + `]` , `⌘` + `[`
Split Window Horizontally (new profile) | `Option` + `⌘` + `H`
Split Window Vertically (new profile) | `Option` + `⌘` + `V`
Previous Tab | `⌘`+ `Left Arrow`  (I usually move by tab number)
Next Tab | `⌘`+ `Right Arrow`
Go to Window | `⌘` + `Option` + `Number`

## My Favorite Shell Key Combos

These might be helpful to getting you faster with the shell but really this
isn't iTerm2 specific.  I'm assuming you are using bash or zsh on Mac.
There are many tips but I use these quite a bit.  There is also more than one way
to do it sometimes so adopt what you like best.

Hopefully some of these change your life.  :)

🍑: favorite

**Function** | **Shortcut** | **Use**
-------- | ----------- | --------
Delete to start of line (🍑) | `Ctrl` + `U` | Use this to start over typing without hitting Ctrl-C
Delete to end of line (🍑) | `Ctrl` + `K` | Use this with command history to repeat commands and <br />changing one thing at the end! 
Repeat last command | `Up Arrow` | Cycle and browse your history with up and down.  <br />`Ctrl-R` is faster if you know the string you are looking for. 
Move back and forth on a line | `Arrow Keys` | This takes you off the home row but it's easy to remember
Move back and forth on a line by words | `⌥` + `Arrow Keys` | Fast way to jump to a word to correct a typo or "run again"<br /> with minor changes 
Delete previous word (in shell) | `Ctrl` + `W` | It's faster to delete by words.  Especially when your <br />last command was wrong by a single typo or something. 
Clear screen | `Ctrl` + `L` | This is telling the shell to do it.  When this doesn't work `⌘` + `K` will tell iTerm to do it which works when you aren't in a shell.  Use this instead of typing `clear` over and over. 

## Moving Faster

A lot of shell shortcuts work in iterm and it's good to learn these because arrow keys, home/end
keys and Mac equivalents don't always work.  For example `⌘` + `Left Arrow` is usually the same as `Home`
(go to beginning of current line) but that doesn't work in the shell.  Home works in many apps but it
takes you away from the home row.

**Function** | **Shortcut**
-------- | --------
Move to the start of line | `Ctrl` + `A` or `Home`
Move to the end of line | `Ctrl` + `E` or `End`
Move forward a word | `Option` + `F`
Move backward a word | `Option` + `B`
Set Mark | `⌘` + `M`
Jump to Mark | `⌘` + `J`
Moving by word on a line (this is a shell thing but passes through fine)| `Ctrl` + `Left/Right Arrow`
Cursor Jump with Mouse (shell and vim - might depend on config) | `Option` + `Left Click`


## Copy and Paste with iTerm without using the mouse

I don't use this feature too much.

**Function** | **Shortcut**
-------- | --------
Enter Copy Mode | `Shift` + `⌘` + `C`
Enter Character Selection Mode in Copy Mode | `Ctrl` + `V`
Move cursor in Copy Mode | `HJKL` vim motions or arrow keys
Copy text in Copy Mode | `Ctrl` + `K`

Copy actions goes into the normal system clipboard which you can paste like normal.


## Search the Command History

**Function** | **Shortcut** 
-------- | --------
Search as you type | `Ctrl` + `R` and type the search term; Repeat `Ctrl` + `R` to loop through result
Search the last remembered search term | `Ctrl` + `R` twice
End the search at current history entry  | `Ctrl` + `Y`  这个是干吗的？ 
Cancel the search and restore original line | `Ctrl` + `G`直接按`ESC`不香吗？ 

## Misc

**Function** | **Shortcut**
-------- | --------
Clear the screen/pane (when `Ctrl + L` won't work) | `⌘` + `K`  (真清屏) 
Broadcast command to all panes in window (nice when needed!)  什么使用场景？ | `⌘` + `Alt` +  `I` (again to toggle)
Find Cursor 聚焦光标 | `⌘` + `/`  _or use a theme or cursor shape that is easy to see_