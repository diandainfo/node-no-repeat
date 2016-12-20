# node-no-repeat

本质是通过redis的setNx方法进行防重。

> 如果不重复返回true，且在后续ttl秒内不会返回true
>
> 如果重复返回false

目前只有一个方法：

isRepeat({

​	name: 用以确认重复的key

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

