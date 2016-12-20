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
    client.set(key, 'no-repeat', 'EX', ttl, 'NX', (error, n) => {
        if (error) {
            return callback(error);
        }
        if (n === 'OK') {
            return callback(null, true);
        }
        return callback(null, false);
    })
}

module.exports = NoRepeat;