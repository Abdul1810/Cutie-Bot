const Command = require('../classes/Command.js')
const moment = require('moment')

class ChannelInfo extends Command {
	get name () {
		return 'channelinfo(ci)'
	}
	
	get aliases () {
		return ['ci', 'channelinfo']
	}
	
	get category () {
		return 'utility'
	}

	get requirement () {
		return 'None'
	}

	get description () {
		return 'Get The Information About a Channel.'
	}

	get usage () {
		return '{prefix}ci [#channel or ChannelID]'
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
		let channel, channelid, channeltype, channelcreationdate;
		if (!msg.channelMentions[0]) {
			channelid = args[0] ? args[0] : msg.channel
			try {
				channel = msg.channel.guild.channels.get(channelid)
				if (!channel) throw new Error('Catching This')
			}
			catch (e) {
				channel = msg.channel.guild.channels.filter(e => e.name === args.join('-'))[0]
			}
		}
		else {
			channelid = msg.channelMentions[0]
			channel = msg.channel.guild.channels.get(channelid)
		}
		if (!channel) {
			channel = msg.channel
		}
		channelcreationdate = moment.utc(channel.createdAt).format('dddd, MMMM Do YYYY, HH:mm:ss').split(",")
		switch (channel.type) {
			case 0:
				channeltype = 'Text Channel'
				break
			case 5:
				channeltype = 'Announcement Channel'
				break
			case 2:
				channeltype = 'Voice Channel'
				break
			case 4:
				channeltype = 'Category'
				break
			case 13:
				channeltype = 'Stage Channel'
				break
		}
		return msg.channel.createMessage({
			embed:{
				title: 'Channel Information',
				color: this.bot.color,
				thumbnail:{
					url: this.bot.user.dynamicAvatarURL("", 2048)
				},
				fields:[
					{
						name: 'Channel Name',
						value: `${channel.name}`
					},
					{
						name: 'Channel ID',
						value: `${channel.id}`
					},
					{
						name: 'Channel Mention',
						value: `${channel.mention}`
					},
					{
						name: 'Channel Type',
						value: `${channeltype}, ${channel.nsfw ? 'NSFW Channel' : 'SFW Channel'}`
					},
					{
						name: 'Category',
						value: `<#${channel.parentID ? channel.parentID : channel.id}>`
					},
					{
						name: 'Position',
						value: `${channel.position}`
					},
					{
						name: `${channel.rateLimitPerUser !== undefined ? 'Slow Mode' : 'User Limit'}`,
						value: `${channel.rateLimitPerUser !== undefined ? channel.rateLimitPerUser : channel.userLimit === 0 ? 'No Limit' : channel.userLimit}`
					},
					{
						name: 'Created At',
						value: `Day : ${channelcreationdate[0]}\nDate : ${channelcreationdate[1]}\nTime : ${channelcreationdate[2]}`
					}
				],
				footer:{
					text: `Developed By ${this.developer()}`
				}
			}
		})
	}
}

module.exports = ChannelInfo