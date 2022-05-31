require('eris-sharder/src/sharding/clustermanager').prototype.printLogo = (...args) => { }
const { Master } = require('eris-sharder')

const { bot } = require('./config').tokens
const { webhook } = require('./config').services
const { clusterCount, shardCount } = require('./config').settings

const MasterProcess = new Master(bot, '/src/Cutie.js', {
	stats: false,
	debug: false,
	clusters: clusterCount,
	shards: shardCount,
	webhooks: {
		shard: {
		  id: webhook.loginid,
		  token: webhook.logintoken
		},
		 cluster: {
		  id: webhook.loginid,
		  token: webhook.logintoken
		}
	}
})

MasterProcess.on('stats', stats => {
	console.log(stats)
})

MasterProcess.on('error', err => console.error(err))
