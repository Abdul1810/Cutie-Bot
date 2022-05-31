const Command = require('../classes/Command.js')
const { shardCount } = require('../../config').settings

class Restart extends Command {
	get name () {
		return 'restart'
	}
	
	get aliases () {
		return ['reboot']
	}
	
	get category () {
		return 'OWNER'
	}

	get requirement () {
		return 'OWNER'
	}

	get description () {
		return 'Restart a Shard'
	}

	get usage () {
		return '{prefix}restart <ShardID or All>'
	}
	
	get permissions () {
		return 'OWNER'
	}
	
	owner (msg) {
		return msg.author.id !== this.bot.owner1 && msg.author.id !== this.bot.owner2 && msg.author.id !== this.bot.owner3
	}

	developer () {
		let Choice = Math.floor((Math.random() * 2));
		if (Choice === 0) {
			return `Abdul♥#5464`
		}
		else if (Choice === 1) {
			return `Abdul♥#5464`
		}
	}
	
	async run (msg, args) {
		if (!args[0]) return msg.channel.createMessage("🧐 Sir, Either provide a \"ShardID\" to Reboot or \"All | Cluster\" Keyword to restart all the Shard(s)")
		if (args[0].toLowerCase() === "all") {
			msg.channel.createMessage("**Restarting All Shards.please wait...**")
			let i;
			for (i=0;i<shardCount;i++) {
				this.bot.shards.get(i).disconnect()
			}
			setTimeout(() => { }, 10000)
			for (i=0;i<shardCount;i++) {
				this.bot.shards.get(i).connect()
			}
			return
		}
		else if (args[0].toLowerCase() === "cluster") {
			msg.channel.createMessage("**Restarting Cluster.please wait...**")
			return process.exit()
		}
		else {
			let shardID = Number(args[0])
			if (shardID === NaN) return msg.channel.createMessage("**Please Provide a Correct ShardID to Restart :\\**")
			if (shardID >= shardCount || shardID < 0) return msg.channel.createMessage("**Please Provide a Correct ShardID to Restart :\\**")
			msg.channel.createMessage(`**Restarting Shard \"__${args[0]}__\".please wait...**`)
			return this.bot.shards.get(shardID).disconnect(),
				setTimeout(() => {
					this.bot.shards.get(shardID).connect();
				}, 10000)
		}
	}
}

module.exports = Restart