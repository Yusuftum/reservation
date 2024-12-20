const redis = require('redis');
const client = redis.createClient();

client.on('error', (err) => {
    console.error('Redis bağlantı hatası:', err);
});

client.on('connect', () => {
    console.log('Redis bağlantısı başarılı.');
});

module.exports = client;
