const { Base } = require('eris-sharder')
const { AutoPoster } = require('topgg-autoposter')

const { CommandHandler, EventHandler, MongoHandler, NameHandler, SlashHandler } = require('./handlers')
const { color, ecolor, prefix, owners } = require('../config').settings
const { votelink, invitelink, supportlink } = require('../config').links
const { webhook } = require("../config").services
const { topggtoken } = require('../config').tokens

class Cutie extends Base {
	constructor (client) {
		super(client)
		
		this.bot.location = process.cwd()
		this.bot.color = color
		this.bot.ecolor = ecolor
		this.bot.owner1 = owners[0]
		this.bot.owner2 = owners[1]
		this.bot.owner3 = owners[2]
		this.bot.mongo = new MongoHandler()
		this.bot.sanitizer = new NameHandler()
		this.bot.webhook = webhook
		this.bot.votelink = votelink
		this.bot.invitelink = invitelink
		this.bot.supportlink = supportlink
		this.bot.ran = 0
		this.bot.mostrun = null
		// this.bot.clusterID = this.clusterID
		// this.bot.ipc = this.ipc

		new CommandHandler(this.bot)
		new EventHandler(this.bot)
		new SlashHandler(this.bot)
	}

	async launch () {
		this.bot.editStatus('online', { name: `.help | ${await this.bot.mongo.getGuildCount()} Servers!`, type: 2 })

		// const mostrun = await this.bot.mongo.MostUsed()
		// this.bot.mostrun = mostrun

		// const poster = AutoPoster(topggtoken, this.bot)
		// poster.on('posted', (stats) => {
 		// 	console.log(`Posted stats to Top.gg | ${stats.serverCount} servers`)
		// })
		/**
		this.bot.executeWebhook(this.bot.webhook.loginid, this.bot.webhook.logintoken, {
			embeds:[{
				title:"Cluster restart Notification",
				description:"Maybe some glitch in my code or my developer restarted me.Now i am back online",
				thumbnail:{
					url:this.bot.user.avatarURL
				},
				color:this.bot.color
			}]
		})
		*/
	}
}

module.exports = Cutie