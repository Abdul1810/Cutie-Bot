const Command = require('../classes/Command.js')
const request = require('request-promise-native')
const moment = require('moment')

class Roleinfo extends Command {
	get name () {
		return 'roleinfo(ri)'
	}
	
	get aliases () {
		return ['ri', 'roleinfo']
	}
	
	get category () {
		return 'utility'
	}

	get requirement () {
		return 'None'
	}

	get description () {
		return 'Get The Information About a Role.'
	}

	get usage () {
		return '{prefix}ri [<@Role> or RoleID]'
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
		let role, roleid, rolecreationdate, highestroleid, res, color, colorfetch;
		let permissions = []
		if (!msg.roleMentions[0]) {
			highestroleid = this.getHighestRole(msg.author.id, msg.channel.guild).id
			roleid = args[0] ? args[0] : highestroleid

			try {
				role = msg.channel.guild.roles.get(roleid)
				if (!role) throw new Error('Catching This')
			}
			catch (e) {
				role = msg.channel.guild.roles.filter(e => e.name === args.join(' '))[0]
			}
		}
		else {
			roleid = msg.roleMentions[0]
			role = msg.channel.guild.roles.get(roleid)
		}
		if (role === undefined) {
			highestroleid = this.getHighestRole(msg.author.id, msg.channel.guild).id
			role = msg.channel.guild.roles.get(highestroleid)
		}
		rolecreationdate = moment.utc(role.createdAt).format('dddd, MMMM Do YYYY, HH:mm:ss').split(",")
		
		for (let key in role.permissions.json) {
			permissions.push(key)
		}

		if (role.color !== 0) {
			color = role.color.toString(16).padStart(6, '0')
			colorfetch = {
				method: 'GET',
				url: `http://thecolorapi.com/id?hex=${color}`,
				json: true
			}
			res = await request(colorfetch)
		}

		return msg.channel.createMessage({
			embed:{
				title: 'Role Information',
				color: this.bot.color,
				thumbnail:{
					url: `${color ? `http://singlecolorimage.com/get/${color}/100x100` : this.bot.user.dynamicAvatarURL("", 2048)}`
				},
				fields:[
					{
						name: 'Role Name',
						value: `${role.name}`
					},
					{
						name: 'Role ID',
						value: `${role.id}`
					},
					{
						name: 'Role Mention',
						value: `${role.mention}`
					},
					{
						name: 'Role Type',
						value: `${role.managed ? 'Bot Role' : 'Member Role'}`
					},
					{
						name: 'Role Color',
						value: `${res !== undefined ? res.name.value : 'No Colour'} ${color !== undefined ? `(#${color})` : ''}`
					},
					{
						name: 'Role Position',
						value: `${role.position}`
					},
					{
						name: 'Role Permissions',
						value: `${permissions.join(', ') ? permissions.join(', ') : 'No Permissions'}`
					},
					{
						name: 'Created At',
						value: `Day : ${rolecreationdate[0]}\nDate : ${rolecreationdate[1]}\nTime : ${rolecreationdate[2]}`
					}
				],
				footer:{
					text: `Developed By ${this.developer()}`
				}
			}
		})
	}
}

module.exports = Roleinfo