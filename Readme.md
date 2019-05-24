## skr-cli

add 

remove 

init

## commander 使用
- option 配置命令描述
- command 注册命令 <test> 表示必填参数 【test】 表示可选参数 <test...> 表示可变参数，action中接受的是一个数组。
- parse(process.argv) 解析用户输入的参数，要放在最后，如果在 command 之前则无法监听该 command 


##TODO
- npm link : find skr in /usr/local/lib/node_modules