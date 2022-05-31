const Command = require('../classes/Command.js')


class Ban extends Command {
	get name () {
		return 'ban'
	}
	
	get aliases () {
		return []
	}
	
	get category () {
		return 'mod'
	}

	get requirement () {
		return 'BAN_MEMBERS'
	}

	get description () {
		return 'To ban a mentioned user in your server'
	}

	get usage () {
		return '{prefix}ban <@user or userID> [Reason]'
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

	getHighestRole (user, guild) {
		user = user.id ? user : guild.members.get(user)

		const filteredRoles = guild.roles.filter(r => user.roles.includes(r.id))
		return filteredRoles.sort((a, b) => b.position - a.position)[0]
	}
	
	async run (msg, args) {
		if (!msg.channel.permissionsOf(msg.author.id).has('banMembers') && this.owner(msg)) return msg.channel.createMessage({
			embed:{
				description: '<:CutieWarning:769897779954319362> **You dont have permission to use this command**',
				color: this.bot.ecolor,
				footer: {
					text: "Required permission : BAN_MEMBERS"
				}
			}
		})

        if (!msg.channel.permissionsOf(this.bot.user.id).has('banMembers')) return msg.channel.createMessage({
			embed:{
				description: '<:CutieWarning:769897779954319362> **I dont have permission to perform this command**',
				color: this.bot.ecolor,
				footer: {
					text: "Required permission : BAN_MEMBERS"
				}
			}
		})

		if (!args[0]) return msg.channel.createMessage({
			embed:{
				color: this.bot.ecolor,
				description: `<:CutieWarning:769897779954319362> You must need to mention a user!`,
				footer:{
					text: `Usage: ${await this.bot.mongo.getprefix(msg.channel.guild.id)}ban <@user or userID> [Reason] `
				}
			}
		})
		let memberID, member, memberrolePosition, botrolePosition, authorrolePosition, reason;
		if (msg.mentions[0]) {
			memberID = msg.mentions[0].id
		}
		else {
			memberID = args[0]
		}
		
		try {
			member = msg.channel.guild.members.get(memberID)
		} catch (e) {
			return msg.channel.createMessage({
				embed:{
					color: this.bot.ecolor,
					description: `<:CutieWarning:769897779954319362> You must need to mention a valid user!`,
					footer:{
						text: `Usage: ${await this.bot.mongo.getprefix(msg.channel.guild.id)}ban <@user or userID> [Reason]`
					}
				}
			})
		}
		authorrolePosition = this.getHighestRole(msg.author.id, msg.channel.guild).position
		botrolePosition = this.getHighestRole(this.bot.user.id, msg.channel.guild).position
		memberrolePosition = this.getHighestRole(member.id, msg.channel.guild).position

		reason = args.slice(1).join(' ');

		if (botrolePosition <= memberrolePosition) return msg.channel.createMessage({
			embed:{
				color: this.bot.ecolor,
				description: `<:CutieWarning:769897779954319362> Failed to ban the user because my role is lower than the specified user.`,
			}
		})

		if (msg.author.id !== msg.channel.guild.ownerID && authorrolePosition <= memberrolePosition) return msg.channel.createMessage({
			embed:{
				color: this.bot.ecolor,
				description: `<:CutieWarning:769897779954319362> Failed to ban the user because your role is lower than the specified user.`,
			}
		})
		try {
			return await member.ban(1, `${reason ? reason : "None"} [BANNED By ${this.bot.sanitizer.sanitiz(msg.author.username)}]`), msg.channel.createMessage({
				embed:{
					color: this.bot.color,
					description: `<a:Cutie_Verifiedtick:769893107830882344> **${msg.author.username}** banned ${member.username}`
				}
			})
		} catch (e) {
			console.error(e)
			return msg.channel.createMessage({
				embed:{
					color: this.bot.ecolor,
					description: `<:CutieWarning:769897779954319362> You must need to mention a valid user!`,
					footer:{
						text: `Usage: ${await this.bot.mongo.getprefix(msg.channel.guild.id)}ban <@user or userID> [Reason]`
					}
				}
			})
		}
	}
}

module.exports = Ban