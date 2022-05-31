const Command = require('../classes/Command.js')
const imageDataURI = require('image-data-uri')

class Setvanity extends Command {
	get name () {
		return 'setvanity'
	}
	
	get aliases () {
		return []
	}
	
	get category () {
		return 'mod'
	}

	get requirement () {
		return 'MANAGE_GUILD'
	}

	get description () {
		return 'To set a vanity url for your server'
	}

	get usage () {
		return '{prefix}setvanity <name>'
	}
	
	get permissions () {
		return null
	}
	
	owner (msg) {
		return msg.author.id !== this.bot.owner1 && msg.author.id !== this.bot.owner2 && msg.author.id !== this.bot.owner3
	}
	
	async run (msg, args) {
		if (!msg.channel.permissionsOf(msg.author.id).has('manageGuild') && this.owner(msg)) return msg.channel.createMessage({
			embed:{
				description:'<:CutieWarning:769897779954319362> **You dont have permission to use this command**',
				color: this.bot.ecolor,
				footer: {
					text: "Required permission : MANAGE_GUILD"
				}
			}
		})

		if (!msg.channel.permissionsOf(this.bot.user.id).has('manageGuild')) return msg.channel.createMessage({
			embed:{
				description:'<:CutieWarning:769897779954319362> **I dont have permission to perform this command**',
				color: this.bot.ecolor,
				footer: {
					text: "Required permission : MANAGE_GUILD"
				}
			}
		})

		const Guild = msg.channel.guild;
		
		if( Guild.premiumTier < 3) return msg.channel.createMessage({
			embed:{
				description:'<:CutieWarning:769897779954319362> **This Server is not Eligible to set the vanity url**',
				color: this.bot.ecolor,

			}
		})


        if(!args[0]) return msg.channel.createMessage({
			embed:{
				description:`<:CutieWarning:769897779954319362> **You need to provide the text for vanity url** `,
				color: this.bot.ecolor,
				footer: {
					text: `Usage: ${await this.bot.mongo.getprefix(msg.channel.guild.id)}setvanity <text>`
				}
			}
        
        })

        if (args[0].length < 4) return msg.channel.createMessage({
			embed:{
				description:`<:CutieWarning:769897779954319362> **You need to provide a minimum 4 letters text for vanity url** `,
				color: this.bot.ecolor,
				footer: {
					text: `Usage: ${await this.bot.mongo.getprefix(msg.channel.guild.id)}setvanity <text>`
				}
			}
        
        })

	try{
		msg.channel.guild.editVanity(args[0])
	} catch (e){
		return msg.channel.createMessage({
			embed:{
				description:`<:CutieWarning:769897779954319362> **Error: ${e} `,
				color: this.bot.ecolor,
			}
        })
		}

        return msg.channel.createMessage({
			embed:{
				description:`<a:Cutie_Verifiedtick:769893107830882344> **Successfully vanity url is created ** `,
				color: this.bot.ecolor,
                footer:{
                    text: `discord.gg/${args[0]}`
                }
			}
        
        })
    }
}

module.exports = Setvanity