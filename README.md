# node-no-repeat

本质是通过redis的set方法的NX参数进行防重。
>从 Redis 2.6.12 版本开始， SET 命令的行为可以通过一系列参数来修改：
>EX second ：设置键的过期时间为 second 秒。 SET key value EX second 效果等同于 SETEX key second value 。
>NX ：只在键不存在时，才对键进行设置操作。 SET key value NX 效果等同于 SETNX key value 。
>英文文档 https://redis.io/commands/set
>中文文档 http://redisdoc.com/string/set.html

目前只有一个方法：

isRepeat({

​	name: 用以确认是否重复的key

​	ttl: 时间间隔

},callback)

callback会接受两个参数：error, isRepeat。

isRepeat：true 不重复

​		   false 重复

示例如下：

~~~javascript
const redis = require('redis');
const NoRepeat = require('norepeat');
// 配置redis
let client = redis.createClient({
    host: '127.0.0.1',
    db: 1
});
let noRepeat = new NoRepeat(client);
noRepeat.isRepeat({
    name: name,
    // 1 times/second
    ttl: 1
}, (error, isRepeat) => {
    if(isRepeat === true){
        // it's ok
    }
    if(isRepeat === false) {
        // it's repeat
    }
})
~~~

