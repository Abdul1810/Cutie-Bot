const { responses } = require("../assets/responses/pingresponse")
const Command = require('../classes/Command.js')
const Util = require('../api').util

class ping extends Command {
	get name () {
		return 'ping'
	}
	
	get aliases () {
		return ['pong']
	}
	
	get category () {
		return 'bot'
	}

	get requirement () {
		return 'None'
	}

	get description () {
		return 'To show the Bot Latency'
	}
	
	get usage () {
		return '{prefix}ping'
	}
	
	get permissions () {
		return null
	}
	
	async run (msg) {
		//const pingmessage = msg.channel.createMessage("<a:emoji_40:798036610045444096> *Wait wht...*")
		let random = Math.floor((Math.random() * responses.length));
		let response = responses[random].replace("{user}", msg.author.username)
		const pingmsg = msg.channel.createMessage({
			content: response.replace("{ms}", msg.channel.guild.shard.latency),
			"components": [
				{
					"type": 1,
					"components": [
						{
							"type": 3,
							"custom_id": "_ping",
							"options":[
								{
									"label": "Abdul♥#5464",
									"value": "Abdul♥#5464",
									"description": "Rocky ✨",
									"emoji": {
										"name": "Cutie0",
										"id": "853856421476433930"
									}
								},
								{
									"label": "Lonely#6166",
									"value": "Lonely#6166",
									"description": "Coding Tamizha",
									"emoji": {
										"name": "HeyUrCute",
										"id": "853856847651799070"
									}
								},
								{
									"label": "Vaathii#5054",
									"value": "Vaathii#5054",
									"description": "Shiva Aka Vaathi & SaD MaN 💔",
									"emoji": {
										"name": "Vaathi_cat",
										"id": "864030343773683723"
									}
								}
							],
							"placeholder": "Cutie™ ✨",
							"min_values": 0,
							"max_values": 3
						}
					]
				}
			]
		}).then(message => {
			setTimeout(() => {
				message.edit({
					content: response.replace("{ms}", msg.channel.guild.shard.latency).replace("{user}", msg.author.username),
					"components": []
				}).catch(() => {});
			}, 20000);
		})
		return
	}
}

module.exports = ping