const Command = require('../classes/Command.js')
const prettyMilliseconds = require('pretty-ms')
const os = require('os')
var OSVersion = os.version()
const { VERSION } = require('eris')
const pkg = require('../../package.json')

class Stats extends Command {
	get name () {
		return 'stats'
	}
	
	get aliases () {
		return ['uptime']
	}
	
	get category () {
		return 'bot'
	}

	get requirement () {
		return 'None'
	}

	get description () {
		return 'Check The Bot Statistics'
	}

	get usage () {
		return '{prefix}stats'
	}
	
	get permissions () {
		return null
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
	
	Objsize (obj) {
		var size = 0, key;
		for (key in obj) {
			if (obj.hasOwnProperty(key)) size++;
		}

		return size
	}

	shardUptime (starttime) {
		var ms = new Date().getTime() - starttime
		return prettyMilliseconds(ms, { colonNotation: true, secondsDecimalDigits: 0 });
	}

	__ms (ms) {
		return prettyMilliseconds(ms, { colonNotation: true, secondsDecimalDigits: 0 });
	}

	formatMemoryUsage (data) { 
		return `${Math.round(data / 1024 / 1024 * 100) / 100} MB` 
	}

	getCpuUsage() {
        const percentage = os.cpus().map((cpu, counter) => {
            let total = 0;
            for (let type in cpu.times) {
                total += cpu.times[type];
            }
            return Object.entries(cpu.times).map(t => Math.round(100 * t[1] / total))
        }).reduce((x, y) => x + y[0], 0) / os.cpus().length
        return percentage;
    }

	async run (msg) {
		//\nMost Used Command: ${this.bot.mostrun}
		return msg.channel.createMessage({
			embed:{
				author:{
					name: `Cutie Statistics`,
					icon_url: this.bot.user.avatarURL,
					url: this.bot.invitelink
				},
				color: this.bot.color,
				thumbnail: {
					url: this.bot.user.dynamicAvatarURL("", 2048),
				},
				fields: [
					{
						name: `Bot Statistics`,
						value: `GuildCount: ${this.Objsize(this.bot.guildShardMap)}\nChannel Count: ${this.Objsize(this.bot.channelGuildMap)}\nShard Uptime: ${this.shardUptime(this.bot.startTime)}\nSession Commands Ran: ${this.bot.ran + 1}\nTotal Commands Ran: ${await this.bot.mongo.getCommandCount() + 1}`
					},
					{
						name: `Operating System`,
						value: `Platform: ${process.platform}\nVersion: ${OSVersion}\nServer Uptime: ${this.__ms(os.uptime()*1000)}\nCPU Usage: ${this.getCpuUsage()} %\nCore Count: ${os.cpus().length} Cores\nUsed Memory: ${this.formatMemoryUsage(process.memoryUsage().rss)}\nTotal Memory: ${Math.round(os.totalmem() / 1024 / 1024)} MB`
					},
					{
						name: `Version`,
						value: `Cutie: ${pkg.version}\nNode JS: ${process.version}\nEris: ${VERSION}\nEris Sharder: ${pkg.dependencies['eris-sharder']}\nMongoose(MongoDB): ${pkg.dependencies['mongoose']}`
					}
				],
				footer:{
					text: `Developed By Abdul and Lonelyᴰᵉᵛ`
				},
				timestamp: new Date()
			}
		})
	}
}

module.exports = Stats