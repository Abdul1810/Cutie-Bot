const Command = require('../classes/Command.js')


class SetNick extends Command {
	get name () {
		return 'setnick'
	}
	
	get aliases () {
		return ['setnickname', 'changenickname']
	}
	
	get category () {
		return 'mod'
	}

	get requirement () {
		return 'MANAGE_NICKNAMES'
	}

	get description () {
		return 'Manage Member Nickname in a Server'
	}

	get usage () {
		return '{prefix}setnick <@user> [New NickName]'
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
		if (!msg.channel.permissionsOf(msg.author.id).has('kickMembers') && this.owner(msg)) return msg.channel.createMessage({
			embed:{
				description: '<:CutieWarning:769897779954319362> **You dont have permission to use this command**',
				color: this.bot.ecolor,
				footer: {
					text: "Required permission : MANAGE_NICKNAMES"
				}
			}
		})

        if (!msg.channel.permissionsOf(this.bot.user.id).has('kickMembers')) return msg.channel.createMessage({
			embed:{
				description: '<:CutieWarning:769897779954319362> **I dont have permission to perform this command**',
				color: this.bot.ecolor,
				footer: {
					text: "Required permission : MANAGE_NICKNAMES"
				}
			}
		})

		if (!args[0]) return msg.channel.createMessage({
			embed:{
				color: this.bot.ecolor,
				description: `<:CutieWarning:769897779954319362> You must need to mention a user!`,
				footer:{
					text: `Usage: ${await this.bot.mongo.getprefix(msg.channel.guild.id)}setnick <@user> [New NickName] `
				}
			}
		})
		let memberID, member, memberrolePosition, botrolePosition, authorrolePosition, newNick, oldNick;
		if (msg.mentions[0]) {
			memberID = msg.mentions[0].id
		}
		else {
			memberID = args[0]
		}
		
		try {
			member = msg.channel.guild.members.get(memberID)
			oldNick = member.nick ? member.nick : member.username
		} catch (e) {
			return msg.channel.createMessage({
				embed:{
					color: this.bot.ecolor,
					description: `<:CutieWarning:769897779954319362> You must need to mention a valid user!`,
					footer:{
						text: `Usage: ${await this.bot.mongo.getprefix(msg.channel.guild.id)}setnick <@user> [New NickName]`
					}
				}
			})
		}
		authorrolePosition = this.getHighestRole(msg.author.id, msg.channel.guild).position
		botrolePosition = this.getHighestRole(this.bot.user.id, msg.channel.guild).position
		memberrolePosition = this.getHighestRole(member.id, msg.channel.guild).position

		newNick = args.slice(1).join(' ');

		if (botrolePosition <= memberrolePosition) return msg.channel.createMessage({
			embed:{
				color: this.bot.ecolor,
				description: `<:CutieWarning:769897779954319362> Failed to Change Nickname of the user because my role is lower than the specified user.`,
			}
		})

		if (msg.author.id !== msg.channel.guild.ownerID && authorrolePosition <= memberrolePosition) return msg.channel.createMessage({
			embed:{
				color: this.bot.ecolor,
				description: `<:CutieWarning:769897779954319362> Failed to Change Nickname of the user because your role is lower than the specified user.`,
			}
		})
		try {
			return await member.edit({ nick: newNick }, `Name Changed By ${this.bot.sanitizer.sanitiz(msg.author.username)}.User's Old Name : ${oldNick}`)
			/*kick(`${reason ? reason : "None"} [KICKED By ${this.bot.sanitizer.sanitiz(msg.author.username)}]`)*/, msg.channel.createMessage({
				embed:{
					color: this.bot.color,
					description: `<a:Cutie_Verifiedtick:769893107830882344> SuccessFully Changed the NickName.\nOldNickName \`${oldNick}\` NewNickName \`${newNick}\``
				}
			})
		} catch (e) {
			console.error(e)
			return msg.channel.createMessage({
				embed:{
					color: this.bot.ecolor,
					description: `<:CutieWarning:769897779954319362> You must need to mention a valid user!`,
					footer:{
						text: `Usage: ${await this.bot.mongo.getprefix(msg.channel.guild.id)}setnick <@user> [New NickName]`
					}
				}
			})
		}
	}
}

module.exports = SetNick