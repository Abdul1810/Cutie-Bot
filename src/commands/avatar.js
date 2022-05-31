const Command = require('../classes/Command.js')


class avatar extends Command {
	get name () {
		return 'avatar'
	}
	
	get aliases () {
		return ['a', 'av']
	}

	get category () {
		return 'utility'
	}

	get requirement () {
		return 'None'
	}

	get description () {
		return 'To show the avatar of user'
	}
	
	get usage () {
		return '{prefix}avatar [@user or userID]'
	}
	
	get permissions () {
		return null
	}

	async run (msg, args) {
		let user, av, memberArray;
		if (!args[0]) {
			user = msg.author
			if (user.dynamicAvatarURL("", 2048).includes(".gif")) {
				av = `[GIF](${user.dynamicAvatarURL("gif", 2048)})`
			}
			else {
				av = `[JPEG](${user.dynamicAvatarURL("jpeg", 2048)})`
			}
			return msg.channel.createMessage({
				embed:{
					title: msg.author.username,
					description: `**[PNG](${user.dynamicAvatarURL("png", 2048)}) | ${av} | [WEBP](${user.dynamicAvatarURL("webp", 2048)})\n\u200b\n[16](${user.dynamicAvatarURL("", 16)}) | [32](${user.dynamicAvatarURL("", 32)}) | [64](${user.dynamicAvatarURL("", 64)}) | [128](${user.dynamicAvatarURL("", 128)}) | [256](${user.dynamicAvatarURL("", 256)}) | [512](${user.dynamicAvatarURL("", 512)}) | [1024](${user.dynamicAvatarURL("", 1024)}) | [2048](${user.dynamicAvatarURL("", 2048)})**`,
					color: this.bot.color,
					image:{
						url: user.dynamicAvatarURL("", 2048)
					},
					timestamp: new Date(),
					footer:{
						text: `Requested By ${msg.author.username + "#" + msg.author.discriminator}`
					}
				}
			})
		}
		else if (args[0] && !msg.mentions[0]) {
			try {
				memberArray = await msg.channel.guild.searchMembers(args.join(' '), 1)
				user = memberArray[0].user
				if (user.dynamicAvatarURL("", 2048).includes(".gif")) {
					av = `[GIF](${user.dynamicAvatarURL("gif", 2048)})`
				}
				else {
					av = `[JPEG](${user.dynamicAvatarURL("jpeg", 2048)})`
				}
				return msg.channel.createMessage({
					embed:{
						title: user.username,
						description: `**[PNG](${user.dynamicAvatarURL("png", 2048)}) | ${av} | [WEBP](${user.dynamicAvatarURL("webp", 2048)})\n\u200b\n[16](${user.dynamicAvatarURL("", 16)}) | [32](${user.dynamicAvatarURL("", 32)}) | [64](${user.dynamicAvatarURL("", 64)}) | [128](${user.dynamicAvatarURL("", 128)}) | [256](${user.dynamicAvatarURL("", 256)}) | [512](${user.dynamicAvatarURL("", 512)}) | [1024](${user.dynamicAvatarURL("", 1024)}) | [2048](${user.dynamicAvatarURL("", 2048)})**`,
						color: this.bot.color,
						image:{
							url: user.dynamicAvatarURL("", 2048)
						},
						timestamp: new Date(),
						footer:{
							text: `Requested By ${msg.author.username + "#" + msg.author.discriminator}`
						}
					}
				})
			} catch (e) {
				user = msg.author
				if (user.dynamicAvatarURL("", 2048).includes(".gif")) {
					av = `[GIF](${user.dynamicAvatarURL("gif", 2048)})`
				}
				else {
					av = `[JPEG](${user.dynamicAvatarURL("jpeg", 2048)})`
				}
				return msg.channel.createMessage({
					embed:{
						title: user.username,
						description: `**[PNG](${user.dynamicAvatarURL("png", 2048)}) | ${av} | [WEBP](${user.dynamicAvatarURL("webp", 2048)})\n\u200b\n[16](${user.dynamicAvatarURL("", 16)}) | [32](${user.dynamicAvatarURL("", 32)}) | [64](${user.dynamicAvatarURL("", 64)}) | [128](${user.dynamicAvatarURL("", 128)}) | [256](${user.dynamicAvatarURL("", 256)}) | [512](${user.dynamicAvatarURL("", 512)}) | [1024](${user.dynamicAvatarURL("", 1024)}) | [2048](${user.dynamicAvatarURL("", 2048)})**`,
						color: this.bot.color,
						image:{
							url: user.dynamicAvatarURL("", 2048)
						},
						timestamp: new Date(),
						footer:{
							text: `Requested By ${msg.author.username + "#" + msg.author.discriminator}`
						}
					}
				})
			}
		}
		else {
			if (msg.mentions.length > 5) return msg.channel.createMessage({
				embed:{
					description: '<:CutieWarning:769897779954319362> You must @mention 5 Members at a Time.',
					color: this.bot.ecolor,
					footer:{
						text: `Usage : ${await this.bot.mongo.getprefix(msg.channel.guild.id)}av [@users <= 5]`
					}
				}
			})
			const avatarlist = msg.mentions.map(users => {
				if (users.dynamicAvatarURL("", 2048).includes(".gif")) {
					av = `[GIF](${users.dynamicAvatarURL("gif", 2048)})`
				}
				else {
					av = `[JPEG](${users.dynamicAvatarURL("jpeg", 2048)})`
				}
				return msg.channel.createMessage({
					embed:{
						title: users.username,
						color: this.bot.color,
						description: `**[PNG](${users.dynamicAvatarURL("png", 2048)}) | ${av} | [WEBP](${users.dynamicAvatarURL("webp", 2048)})\n\u200b\n[16](${users.dynamicAvatarURL("", 16)}) | [32](${users.dynamicAvatarURL("", 32)}) | [64](${users.dynamicAvatarURL("", 64)}) | [128](${users.dynamicAvatarURL("", 128)}) | [256](${users.dynamicAvatarURL("", 256)}) | [512](${users.dynamicAvatarURL("", 512)}) | [1024](${users.dynamicAvatarURL("", 1024)}) | [2048](${users.dynamicAvatarURL("", 2048)})**`,
						image:{
							url: users.dynamicAvatarURL("", 2048)
						},
						timestamp: new Date(),
						footer:{
							text: `Requested By ${msg.author.username + "#" + msg.author.discriminator}`
						}
					}
				})
			})
		}
	}
}

module.exports = avatar
