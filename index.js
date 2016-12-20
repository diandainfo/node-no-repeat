/**
 * 获取随机值用以填充进入redis
 */
var NoRepeat = function(client) {
    this.redisClient = client;
}

NoRepeat.prototype.isRepeat = function(config, callback) {
    var client = this.redisClient,
        name = config.name,
        ttl = config.ttl || 30,
        key = 'noRepeat:' + name;
    client.setnx(key, 'no-repeat', (error, n) => {
        if (error) {
            return callback(error);
        }
        if (n == 0) {
            return callback(null, false);
        }
        client.expire(key, ttl, (error) => {
            if (error) {
                return callback(error);
            }
            return callback(null, true);
        })
    })
}

module.exports = NoRepeat;