/**
 * 获取随机值用以填充进入redis
 */

class NoRepeat {
    constructor(client) {
        this.redisClient = client;
    }
    isRepeat({ name, ttl}, callback) {
        let client = this.redisClient;
        let key = `noRepeat:${name}`;
        ttl = ttl || 30;
        client.setnx(`noRepeat:${name}`, 'no-repeat', (error, n) => {
            if(error){
                return callback(error);
            }
            if(n == 0){
                return callback(null, false);
            }
            client.expire(key,ttl, (error) =>{
                if(error){
                    return callback(error);
                }
                return callback(null, true);
            })
        })
    }
}

module.exports = NoRepeat;