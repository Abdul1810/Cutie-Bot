const Event = require('../classes/Event.js')
const { owners } = require('../../config/settings.js')
const request = require('request-promise-native')

class MessageCreate extends Event {
	
	get name () {
		return 'messageCreate'
	}
	
	get once () {
		return false
	}
	
	_checkPerms (msg, perms) {
		if (!Array.isArray(perms)) perms = [perms]
		if (perms.includes('OWNER')) return owners.includes(msg.author.id)
	}
	
	async run (msg) {
		if (msg.author.bot || msg.channel.type !== 0 || !msg.channel.guild) return
		if (!msg.channel.permissionsOf(this.bot.user.id).has('sendMessages')) return

		const chatchannelid = await this.bot.mongo.getchannel(msg.channel.guild.id)
		if(msg.channel.id === chatchannelid) {
			if (msg.author.bot || msg.channel.type !== 0 || !msg.channel.guild) return;
			if (msg.cleanContent.length < 2) return;
			else if (msg.attachments.size > 0) return;
			else {
				let text = msg.cleanContent.replace(/^<@!?[0-9]{1,20}> ?/i, '')
				try {
					const options = {
						method: 'GET',
						url: "http://api.brainshop.ai/get",
						qs: {
							bid: "156697",
							key: "NAyr6VuoR3wQwiGv",
							uid: `http://api.brainshop.ai/get?bid=156697&key=NAyr6VuoR3wQwiGv&uid=[${msg.author.id}]&msg=[msg]`,
							msg: text
				
						},
						json: true
					}
					let reply = await request(options);
					if (reply) {
						return msg.channel.createMessage({
							content: `<@${msg.author.id}>, ${reply.cnt}`,
							allowedMentions: {
								repliedUser: true
							},
							messageReference: {
								messageID: msg.id
							}
						})
					}
				} catch (e) {
					const options2 = {
						method: 'GET',
						url: "http://api.brainshop.ai/get",
						qs: {
							bid: "154010",
							key: "9Pag7cNZUmxG8DtL",
							uid: `http://api.brainshop.ai/get?bid=154010&key=9Pag7cNZUmxG8DtL&uid=[${msg.author.id}]&msg=[msg]`,
							msg: text
						},
						json: true
					};
					let reply2 = await request(options2);
					if (reply2) {
						return msg.channel.createMessage({
							content: `<@${msg.author.id}>, ${reply2.cnt}`,
							allowedMentions: {
								repliedUser: true
							},
							messageReference: {
								messageID: msg.id
							}
						})
					}
				}
			}
		}
		else {
			try {
				if (msg.author.bot || msg.channel.type !== 0 || !msg.channel.guild) return

				//const guildData = await this.bot.mongo.getGuild(msg.channel.guild.id)
				const prefixdata = await this.bot.mongo.getprefix(msg.channel.guild.id)
				var IgnoredChannels = await this.bot.mongo.getIgnoredChannels(msg.channel.guild.id)
				const prefix = prefixdata.toLowerCase()
				const BlockedUsersinstance = await this.bot.mongo.models.BlockedUsers.findById('_blockedusersdata')
				let BlockedUsers = BlockedUsersinstance ? BlockedUsersinstance.UserID : []
				
                if (BlockedUsers && !owners.includes(msg.author.id)) {
                    if (BlockedUsers.includes(msg.author.id)) return
                }

				const regularMention = msg.content.startsWith(`<@${this.bot.user.id}>`)
				const isMentioningBot = (regularMention || msg.content.startsWith(`<@!${this.bot.user.id}>`))
				const mentionString = regularMention ? `<@${this.bot.user.id}>` : `<@!${this.bot.user.id}>`
				const usedPrefix = isMentioningBot ? mentionString : prefix

				if (!msg.content.toLowerCase().startsWith(usedPrefix)) return

				const args = msg.content.slice(usedPrefix.length).trim().split(/ +/g)
				let command = args.shift().toLowerCase()

				if (!msg.content.startsWith(prefix)) {
					if (!msg.channel.permissionsOf(this.bot.user.id).has('embedLinks')) return msg.channel.createMessage("I Don't Have Following Permission To Perform This command : \n\u200b> Embed_Links\n\u200bTo fix this problem Give the appropriate permission.")
					if (isMentioningBot && !command) {
						let lastLetter = prefix.split('')[prefix.length - 1]

						await msg.channel.createMessage({
							embed:{ 
								color: this.bot.color,
								description:`<a:annouc:770280757636759633> My prefix in this sever is [ ${prefix} ]`
							}
						})
					}
				}

				if (!this.bot.commands.has(command)) return
				if (!msg.channel.permissionsOf(this.bot.user.id).has('embedLinks')) return msg.channel.createMessage("I Don't Have Following Permission To Perform This command : \n\u200b> Embed_Links\n\u200bTo fix this problem Give the appropriate permission.")
				if (IgnoredChannels) {
					if (IgnoredChannels.includes(msg.channel.id) && !command.includes("igch") && !command.includes("ignorechannel")) return msg.channel.createMessage(`${msg.author.username}, I can't \`listen\` to the commands here`).then(message => {
						setTimeout(() => {
							message.delete().catch(() => {});
						}, 5000);
					})
				}
				command = this.bot.commands.get(command)
				if (command.permissions && !this._checkPerms(msg, command.permissions)) return

				return await command.run(msg, args), this.bot.ran+=1, this.bot.mongo.addCommandCount(), this.bot.executeWebhook(this.bot.webhook.botlogid, this.bot.webhook.botlogtoken, {
					content: `${msg.author.username} used ${command.name} in ${msg.channel.guild.name}`
				})
			} catch (err) {
			this.emit('error', err)
		}
	}
  }
}

module.exports = MessageCreate