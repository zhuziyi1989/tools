#!/bin/zsh

#默认 开https  不开http
proxy_on(){
   networksetup -setsecurewebproxystate 'Wi-Fi' on
   networksetup -setwebproxystate 'Wi-Fi' off
}

#关闭代理
proxy_off(){
   networksetup -setsecurewebproxystate 'Wi-Fi' off
   networksetup -setsecurewebproxystate 'Wi-Fi' off
}

#打开http和https代理
proxy_all(){
   networksetup -setsecurewebproxystate 'Wi-Fi' on
   networksetup -setsecurewebproxystate 'Wi-Fi' on
}

if [ "$1" = "on" ]; then
    proxy_on
elif [ "$1" = "off" ]; then
    proxy_off
elif [ "$1" = "all" ]; then
    proxy_all
else
    printf "Usage: sh ~/.dotfiles/sh/proxy.sh {on|off|all}\n"
fi