const Command = require('../classes/Command.js')


class addrole extends Command {
	get name () {
		return 'addrole'
	}
	
	get aliases () {
		return []
	}
	
	get category () {
		return 'mod'
	}

	get requirement () {
		return 'MANAGE_ROLES'
	}

	get description () {
		return 'To add a role mentioned to user in your server'
	}

	get usage () {
		return '{prefix}addrole <@user or userID> <@role or roleID>'
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
        if (!msg.channel.permissionsOf(msg.author.id).has('manageRoles') && this.owner(msg)) return msg.channel.createMessage({
			embed:{
				description: '<:CutieWarning:769897779954319362> **You dont have permission to use this command**',
				color: this.bot.ecolor,
				footer: {
					text: "Required permission : MANAGE_ROLES"
				}
			}
		})

        if (!msg.channel.permissionsOf(this.bot.user.id).has('manageRoles')) return msg.channel.createMessage({
			embed:{
				description: '<:CutieWarning:769897779954319362> **I dont have permission to perform this command**',
				color: this.bot.ecolor,
				footer: {
					text: "Required permission : MANAGE_ROLES"
				}
			}
		})

		if (!args[0]) return msg.channel.createMessage({
			embed:{
				color: this.bot.ecolor,
				description: `<:CutieWarning:769897779954319362> You must need to mention a user!`,
				footer:{
					text: `Usage: ${await this.bot.mongo.getprefix(msg.channel.guild.id)}addrole <@user or userID> <@role or roleID>`
				}
			}
		})

		let memberID, roleID, role, member, userrolePosition, botrolePosition ,rolePosition;
		var Regex = new RegExp(/<@&(\d.*?[0-9])>/i)
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
						text: `Usage: ${await this.bot.mongo.getprefix(msg.channel.guild.id)}addrole <@user or userID> <@role or roleID>`
					}
				}
			})
		}

		if (!args[1]) return msg.channel.createMessage({
			embed:{
				color: this.bot.ecolor,
				description: `<:CutieWarning:769897779954319362> You must need to mention a role!`,
				footer:{
					text: `Usage: ${await this.bot.mongo.getprefix(msg.channel.guild.id)}addrole <@user or userID> <@role or roleID>`
				}
			}
		})

		if (args[1].match(Regex)) {
			roleID = msg.roleMentions[0]
		}
		else {
			roleID = args[1]
		}

		try {
			role = msg.channel.guild.roles.get(roleID)
		} catch (e) {
			return msg.channel.createMessage({
				embed:{
					color: this.bot.ecolor,
					description: `<:CutieWarning:769897779954319362> You must need to mention a valid role!`,
					footer:{
						text: `Usage: ${await this.bot.mongo.getprefix(msg.channel.guild.id)}addrole <@user or userID> <@role or roleID>`
					}
				}
			})
		}
		userrolePosition = this.getHighestRole(msg.author.id, msg.channel.guild).position
		botrolePosition = this.getHighestRole(this.bot.user.id, msg.channel.guild).position
		rolePosition = role.position

		if (msg.author.id !== msg.channel.guild.ownerID && userrolePosition <= rolePosition) return msg.channel.createMessage({
			embed:{
				color: this.bot.ecolor,
				description: `<:CutieWarning:769897779954319362> Failed to add the role to the user because your role is lower than the specified role.`,
			}
		})

		if (botrolePosition <= rolePosition) return msg.channel.createMessage({
			embed:{
				color: this.bot.ecolor,
				description: `<:CutieWarning:769897779954319362> Failed to add the role to the user because my role is lower than the specified role.`,
			}
		})
		
		try {
			return await member.addRole(roleID, `${this.bot.sanitizer.sanitiz(msg.author.username)} Added Role.`), msg.channel.createMessage({
				embed:{
					color: this.bot.color,
					description: `<a:Cutie_Verifiedtick:769893107830882344> **${msg.author.username}**, Added <@&${roleID}> To ${member.username}`
				}
			})
		} catch (e) {
			return msg.channel.createMessage({
				embed:{
					color: this.bot.ecolor,
					description: `<:CutieWarning:769897779954319362> You must need to mention a user!`,
					footer:{
						text: `Usage: ${await this.bot.mongo.getprefix(msg.channel.guild.id)}addrole <@user or userID> <@role or roleID>`
					}
				}
			})
		}
	}
}

module.exports = addrole
