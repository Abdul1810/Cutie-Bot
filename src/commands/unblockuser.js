const Command = require('../classes/Command.js')


class UnBlockuser extends Command {
	get name () {
		return 'unblockuser'
	}
	
	get aliases () {
		return ['unblacklist']
	}
	
	get category () {
		return 'OWNER'
	}

	get requirement () {
		return 'OWNER'
	}

	get description () {
		return 'Unblacklist a user.'
	}

	get usage () {
		return '{prefix}blockuser <@user or UserID>'
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
		if (!args[0] && !msg.mentions[0]) return msg.channel.createMessage("🧐 Sir, Either mention a \"User\" to Block or provide a valid \"UserID\".")
		const blockedusers = await this.bot.mongo.models.BlockedUsers.findById('_blockedusersdata')
		if (msg.mentions[0]) {
			if (blockedusers) {
				if (!blockedusers.UserID.includes(msg.mentions[0].id)) return msg.channel.createMessage("He/She isn't Blocked.")
				blockedusers.UserID.pull(msg.mentions[0].id)
				await blockedusers.save()
			} else {
				let newData = new this.bot.mongo.models.BlockedUsers({
					_id: '_blockedusersdata',
					UserID: []
				})
				await newData.save()
			}
			return msg.channel.createMessage({
				content: `Unblocked ${msg.mentions[0].id}`
			})
		}
		else {
			if (blockedusers) {
				if (!blockedusers.UserID.includes(args[0])) return msg.channel.createMessage("He/She isn't Blocked.")
				blockedusers.UserID.pull(args[0])
				await blockedusers.save()
			} else {
				let newData = new this.bot.mongo.models.BlockedUsers({
					_id: '_blockedusersdata',
					UserID: [args[0]]
				})
				await newData.save()
			}
			return msg.channel.createMessage({
				content: `Unblocked ${args[0]}`
			})
		}
	}
}

module.exports = UnBlockuser