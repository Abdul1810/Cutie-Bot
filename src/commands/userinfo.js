const Command = require('../classes/Command.js')
const { Constants } = require("eris")
const moment = require('moment')

class Userinfo extends Command {
	get name () {
		return 'userinfo(ui)'
	}
	
	get aliases () {
		return ['userinfo', 'ui', ]
	}
	
	get category () {
		return 'utility'
	}

	get requirement () {
		return 'None'
	}

	get description () {
		return 'View User Information'
	}

	get usage () {
		return '{prefix}ui [@user or userid]'
	}
	
	get permissions () {
		return null
	}

	staff (msg) {
		return msg.author.id !== this.bot.owner1 && msg.author.id !== this.bot.owner2 && msg.author.id !== this.bot.owner3
	}

	developer () {
		let Choice = Math.floor((Math.random() * 2));
		if (Choice === 0) {
			return `Abdul♥#5464`
		}
		if (Choice === 1) {
			return `Abdul♥#5464`
		}
	}
	
	async run (msg, args) {
		let flags= []
		let roles = []
		let serverjoindate = []
		let platformjoindate = []
		let memberID, member, memberfetched, memberArray;
		if (!args[0]) {
			memberID = msg.author.id
		} else {
			if (msg.mentions[0]) {
				memberID = msg.mentions[0].id
				member = msg.channel.guild.members.get(memberID)
				memberfetched = true
			}
			else {
				memberID = args.join(' ')
				memberfetched = false
			}
		}

		if (!memberfetched) {
			try {
				memberArray = await msg.channel.guild.searchMembers(memberID, 1)
				if (memberArray.length === 0) throw new TypeError('Oh no Catch is here')
				member = memberArray[0]
				memberfetched = true
			} catch (e) {
				memberID = msg.author.id
				member = msg.channel.guild.members.get(memberID)
				memberfetched = true
			}
		}
		
		if (member.user.publicFlags & Constants.UserFlags.DISCORD_EMPLOYEE) {
			flags.push('Discord Staff <:cutie_badge_discordstaff:854230683925217290>')
		}
		if (member.user.publicFlags & Constants.UserFlags.DISCORD_PARTNER) {
			flags.push('Partnered Server Owner <:cutie_badge_partneredserverowner:854231794894503957>')
		}
		if (member.user.publicFlags & Constants.UserFlags.HYPESQUAD_EVENTS) {
			flags.push('HypeSquad Events <:cutie_badge_hypesquadevents:854229348642324490>')
		}
		if (member.user.publicFlags & Constants.UserFlags.BUG_HUNTER_LEVEL_1) {
			flags.push('Bug Hunter Level 1 <:cutie_badge_bughunterlevel1:854230064233578506>')
		}
		if (member.user.publicFlags & Constants.UserFlags.HOUSE_BRAVERY) {
			flags.push('HypeSquad Bravery <:cutie_badge_hypesquadbravery:854229088163856424>')
		}
		if (member.user.publicFlags & Constants.UserFlags.HOUSE_BALANCE) {
			flags.push('HypeSquad Brilliance <:cutie_badge_hypesquadbrilliance:854230385822793759>')
		}
		if (member.user.publicFlags & Constants.UserFlags.HOUSE_BRILLIANCE) {
			flags.push('HypeSquad Balance <:cutie_badge_hypesquadbalance:854231458150612993>')
		}
		if (member.user.publicFlags & Constants.UserFlags.EARLY_SUPPORTER) {
			flags.push('Discord Early Supporter <:cutie_badge_earlysupporter:854230192163913769>')
		}
		if (member.user.publicFlags & Constants.UserFlags.TEAM_USER) {
			flags.push('Discord Team User')
		}
		if (member.user.publicFlags & Constants.UserFlags.BUG_HUNTER_LEVEL_2) {
			flags.push('Bug Hunter Level 2 <:cutie_badge_bughunterlevel2:854230544295788554>')
		}
		if (member.user.publicFlags & Constants.UserFlags.VERIFIED_BOT) {
			flags.push('Verified Bot <:cutie_badge_verifiedbot:854232036431626283>')
		}
		if (member.user.publicFlags & Constants.UserFlags.VERIFIED_BOT_DEVELOPER) {
			flags.push('Early Verified Bot Developer <:cutie_badge_earlyverifiedbotdev:854231645129408572>')
		}

		// let _fetchNativeGuildMember, _MemberPromiseRoles;
		
		// try {
		// 	_fetchNativeGuildMember = await this.bot.searchGuildMembers('749244809696247828', member.username, 1)
		// 	if (_fetchNativeGuildMember) {
		// 		_MemberPromiseRoles = _fetchNativeGuildMember[0].roles
		// 	}
		// 	if (_MemberPromiseRoles.includes('756507764645429359')) {
		// 		flags.push('Cutie Staff <:cutie_staff:854233117442703371>')
		// 	}
		// 	if (_MemberPromiseRoles.includes('756507146006298696')) {
		// 		flags.push('Cutie Moderator <:cutie_moderationteam:854233223986806794>')
		// 	}
		// 	if (_MemberPromiseRoles.includes('855065043133661184')) {
		// 		flags.push('Cute Bug Hunter <:cutie_badge_bughunterlvl1:855068566466199593>')
		// 	}
		// } catch (e) { }
		const cutiebadges = await this.bot.mongo.models.CutieStaff.findById({
			_id: `_cutiestaff`
		})

		if (cutiebadges) {
			if (cutiebadges.Developers.includes(member.id)) {
				flags.push('Cutie Staff <:cutie_staff:854233117442703371>')
			}
			if (cutiebadges.Moderators.includes(member.id)) {
				flags.push('Cutie Moderator <:cutie_moderationteam:854233223986806794>')
			}
			if (cutiebadges.Bughunters.includes(member.id)) {
				flags.push('Cute Bug Hunter <:cutie_badge_bughunterlvl1:855068566466199593>')
			}
			if (cutiebadges.Donators.includes(member.id)) {
				flags.push('Cute Donator <:cutie__donator:860092477926014986>')
			}
		}

		if (member.roles) {
			for (let i in member.roles) {
				roles.push(`<@&${member.roles[i]}>`)
			}
		}
		serverjoindate = moment.utc(member.joinedAt).format('dddd, MMMM Do YYYY, HH:mm:ss').split(",")
		platformjoindate = moment.utc(member.createdAt).format('dddd, MMMM Do YYYY, HH:mm:ss').split(",")
		return msg.channel.createMessage({
			embed:{
				color: this.bot.color,
				title: `User Information`,
				thumbnail: {
					url: member.user.dynamicAvatarURL("", 1024),
				},
				fields: [
					{
						name: `📝 User Name`,
						value: `${member.username}#${member.discriminator}`
					},
					{
						name: `✏️ Server Nick Name`,
						value: `${member.nick ? member.nick : "No Nick Name"}`
					},
					{
						name: `🆔 User ID`,
						value: `${member.id}`
					},
					{
						name: `<:cutie_badge_nitro:854228954369753099> Profile Badge`,
						value: `${flags[0] ? flags.join(", ") : "None 🚫"}`
					},
					{
						name: `<:cutie_badge_bot:854233305342541864> Discord Bot`,
						value: `${member.bot ? "True ✅" : "False 🚫"}`
					},
					{
						name: `<:cutie_clock:854232250807353384> Server Join`,
						value: `Day : ${serverjoindate[0]}\nDate : ${serverjoindate[1]}\nTime : ${serverjoindate[2]}`
					},
					{
						name: `<:cutie_hourglass:854232415529730068> Account Creation`,
						value: `Day : ${platformjoindate[0]}\nDate : ${platformjoindate[1]}\nTime : ${platformjoindate[2]}`
					},
					{
						name: `📜 Roles [${roles.length}]`,
						value: `${roles.length !== 0 ? roles.join(", ").slice(0, 480) : "No Roles"}`
					},
					{
						name: `<:cutie_profilepicture:854232343320461337> Profile Picture`,
						value: `\u200b`
					}
				],
				image: {
					url: member.user.dynamicAvatarURL("", 2048),
				},
				timestamp: new Date(),
				footer: {
					text: `Developed by ${this.developer()}`
				}
			}
		})
		//console.log(member)
		//return msg.channel.createMessage(flags.join(", "))
	}
}

module.exports = Userinfo