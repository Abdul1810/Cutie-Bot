const Command = require('../classes/Command.js')


class purge extends Command {
	get name () {
		return 'purge'
	}
	
	get aliases () {
		return ['clear', 'delete']
	}
	
	get category () {
		return 'mod'
	}

	get requirement () {
		return 'MANAGE_MESSAGES'
	}

	get description () {
		return 'To clear the number of message in a channel'
	}

	get usage () {
		return '{prefix}purge <0-250>'
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
	
	async run (msg, args) {
		if (!msg.channel.permissionsOf(msg.author.id).has('manageMessages') && this.owner(msg)) return msg.channel.createMessage({
			embed:{
				description: '<:CutieWarning:769897779954319362> **You dont have permission to use this command**',
				color: this.bot.ecolor,
				footer: {
					text: "Required permission : MANAGE_MESSAGES"
				}
			}
		})

		else if (!msg.channel.permissionsOf(this.bot.user.id).has('manageMessages')) return msg.channel.createMessage({
			embed:{
				description: '<:CutieWarning:769897779954319362> **I dont have permission to perform this command**',
				color: this.bot.ecolor,
				footer: {
					text: "Required permission : MANAGE_MESSAGES"
				}
			}
		})
		else {
			if (!msg.mentions[0]) {	
				const amount = parseInt(args[0]) + 1

				if (isNaN(amount)) {
					return msg.channel.createMessage({
						embed:{
							color: this.bot.ecolor,
							description: "<:CutieWarning:769897779954319362> Input amount of messages to be purged.",
							footer: {
								text: `Usage: ${await this.bot.mongo.getprefix(msg.channel.guild.id)}purge <1-250>`
							}
						}
					})
				}
				else if (amount <= 1 || amount > 602) {
					return msg.channel.createMessage({
						embed:{
							color: this.bot.ecolor,
							description: "<:CutieWarning:769897779954319362> your input amount must be a number between 1 to 250.",
							footer: {
								text: `Usage: ${await this.bot.mongo.getprefix(msg.channel.guild.id)}purge <1-250>`
							}
						}
					})
				}
				msg.channel.purge(amount, null, null, null, `${this.bot.sanitizer.sanitiz(msg.author.username)} purged ${amount} Messages in ${this.bot.sanitizer.sanitiz(msg.channel.name)}.`)
				return msg.channel.createMessage({
					embed: {
						color: this.bot.color,
						description: `${msg.author.mention} Purged ${amount - 1} Messages in ${msg.channel.mention}.`
					}
				}).then(message => {
					setTimeout(() => {
						message.delete().catch(() => {});
					}, 3000);
				})
			}
			else {
				const amount = parseInt(args[1])
				let i;

				if (isNaN(amount)) {
					return msg.channel.createMessage({
						embed:{
							color: this.bot.ecolor,
							description: "<:CutieWarning:769897779954319362> Input amount of messages to be purged.",
							footer: {
								text: `Usage: ${await this.bot.mongo.getprefix(msg.channel.guild.id)}purge <1-250>`
							}
						}
					})
				}
				else if (amount <= 0 || amount > 101) {
					return msg.channel.createMessage({
						embed:{
							color: this.bot.ecolor,
							description: "<:CutieWarning:769897779954319362> your input amount must be a number between 1 to 250.",
							footer: {
								text: `Usage: ${await this.bot.mongo.getprefix(msg.channel.guild.id)}purge <1-250>`
							}
						}
					})
				}
				msg.delete()
				let purgedcount = 0

				for (let i in msg.channel.messages.filter(e => e.member.id === msg.mentions[0].id)) {
					if (purgedcount < amount) {
						msg.channel.messages.filter(e => e.member.id === msg.mentions[0].id).reverse()[i].delete().catch(() => { })
						purgedcount += 1
					}
				}

				return msg.channel.createMessage({
					embed: {
						color: this.bot.color,
						description: `${msg.author.mention} Purged ${purgedcount} Messages of ${msg.mentions[0].mention}.`
					}
				}).then(message => {
					setTimeout(() => {
						message.delete().catch(() => {});
					}, 3000);
				})
			}
		}
	}
}

module.exports = purge