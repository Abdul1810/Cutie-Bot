const Command = require('../classes/Command.js')
const imageDataURI = require('image-data-uri')

class Seticon extends Command {
	get name () {
		return 'seticon'
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
		return 'To set a server icon for your server'
	}

	get usage () {
		return '{prefix}seticon <image_link or image>'
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
		

        let image = args[0]
        if(args[0] == null) image = msg.attachments[0].url



        if(!image) return msg.channel.createMessage({
			embed:{
				description:`<:CutieWarning:769897779954319362> **Please provide a image to set the server icon** `,
				color: this.bot.ecolor,
				footer: {
					text: `Usage: ${await this.bot.mongo.getprefix(msg.channel.guild.id)}seticon <image_link or image>`
				}
			}
        
        })

		let uri 
    try{

         uri = await imageDataURI.encodeFromURL(image)
    
		} catch (er){

    return msg.channel.createMessage({
			embed:{
				description:`<:CutieWarning:769897779954319362> **Please provide a valid image to set the server icon** `,
				color: this.bot.ecolor,
				footer: {
					text: `Usage: ${await this.bot.mongo.getprefix(msg.channel.guild.id)}seticon <image_link or image>`
				}
			}
        
        })
	}

	try{
		msg.channel.guild.edit({ icon: uri },`[Icon Was Set By ${this.bot.sanitizer.sanitiz(msg.author.username)}]` )
	} catch (e){
		return msg.channel.createMessage({
			embed:{
				description:`<:CutieWarning:769897779954319362> **I cant set the server icon due to some discord ratelimit** try again later `,
				color: this.bot.ecolor,
			}
        
        })
		}

        return msg.channel.createMessage({
			embed:{
				description:`<a:Cutie_Verifiedtick:769893107830882344> **Successfully Server icon was set** `,
				color: this.bot.ecolor,

			}
        
        })
    }
}

module.exports = Seticon