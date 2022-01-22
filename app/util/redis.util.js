import { createClient } from 'redis';

let _redisClient;

async function createConnection(config) {
    _redisClient = createClient(config);
    _redisClient.on('connect', () => {
        console.log('Redis client connected');
    });
    await _redisClient.connect();
    _redisClient.del('ALL_USER');
}

async function setValue(key, value, expired) {
    console.log('SET');
    const valJson = JSON.stringify(value);
    if (expired) {
        return _redisClient.setEx(key, expired, valJson);
    }
    return _redisClient.set(key, valJson);
}

async function delKey(key) {
    return _redisClient.del(key);
}

async function clearAll() {
    await _redisClient.flushDb();
}

async function getValue(key) {
    const valJson = await _redisClient.get(key);
    if (valJson) {
        return JSON.parse(valJson);
    }
    return valJson;
}

async function close() {
    await _redisClient.close();
}

export {
    createConnection, setValue, getValue, close, delKey, clearAll
};
