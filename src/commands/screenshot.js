const Command = require('../classes/Command.js')
const request = require('node-superfetch');
const url = require('url');


class Screenshot extends Command {
	get name () {
		return 'screenshot'
	}
	
	get aliases () {
		return ['ss']
	}
	
	get category () {
		return 'utility'
	}

	get requirement () {
		return 'None'
	}

	get description () {
		return 'To Take a screenshot of any webpage.'
	}

	get usage () {
		return '{prefix}screenshot <website>'
	}
	
	get permissions () {
		return null
	}
	
	owner (msg) {
		return msg.author.id !== this.bot.owner1 && msg.author.id !== this.bot.owner2 && msg.author.id !== this.bot.owner3
	}
	
	async run (msg, args) {

        let sitename = args[0]
		if (!msg.channel.nsfw) {
			return msg.channel.createMessage({
				embed:{
					description:`<:CutieWarning:769897779954319362> This is NSFW Command.Try this in a NSFW Channel`,
					color: this.bot.ecolor,
					footer: {
						text: `Usage: ${await this.bot.mongo.getprefix(msg.channel.guild.id)}screenshot <website>`
					}
				}
			})
		}
		if(!args[0]) return msg.channel.createMessage({
			embed:{
				description:`<:CutieWarning:769897779954319362> **You need to provide the website to take a screenshot** `,
				color: this.bot.ecolor,
				footer: {
					text: `Usage: ${await this.bot.mongo.getprefix(msg.channel.guild.id)}screenshot <website>`
				}
			}
        
        })
		let site = /^(https?:\/\/)/i.test(sitename) ? sitename : `http://${sitename}`

		try {
			if (!this.pornList) await this.fetchPornList();
			const parsed = url.parse(site);

			if (this.pornList.some(pornURL => parsed.host === pornURL) && !msg.channel.nsfw) {
				return msg.channel.createMessage({
					embed:{
						description:`<:CutieWarning:769897779954319362> This is NSFW Website`,
						color: this.bot.ecolor,
						footer: {
							text: `Usage: ${await this.bot.mongo.getprefix(msg.channel.guild.id)}screenshot <website>`
						}
					}
				})
			}
			let m = await msg.channel.createMessage('<a:emoji_40:798036610045444096> this might take few seconds');

			const { body } = await request.get(`https://image.thum.io/get/width/1920/crop/675/noanimate/${site}`);
			return msg.channel.createMessage({}, {
				file: body, 
				name: 'cutie-screenshot.png' 
			}).then(m.delete())
			
		} catch (err) {
			if (err.status === 404) return msg.channel.createMessage('Could not find any results. Invalid URL?');
			return msg.channel.createMessage({
				embed:{
					description:`<:CutieWarning:769897779954319362> **Oh no, an error occurred: \`${err.message}\`. Try again later!** `,
					color: this.bot.ecolor,
					footer: {
						text: `Usage: ${await this.bot.mongo.getprefix(msg.channel.guild.id)}screenshot <website>`
					}
				}
			
			})
		}
	}

	async fetchPornList(force = false) {
		if (!force && this.pornList) return this.pornList;
		const { text } = await request.get('https://raw.githubusercontent.com/blocklistproject/Lists/master/porn.txt');
		this.pornList = text.split('\n')
			.filter(site => site && !site.startsWith('#'))
			.map(site => site.replace(/^(0.0.0.0 )/, ''));
		return this.pornList;
	}
	 
}

module.exports = Screenshot