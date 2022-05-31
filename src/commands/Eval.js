const Command = require('../classes/Command.js')
const util = require('util')

const owners = ['Abdul♥#5464', 'Abdul♥#5464', 'Vaathii#5054']

class Eval extends Command {
	get name () {
		return 'eval'
	}
	
	get aliases () {
		return ['eval', 'ev']
	}
	
	get category () {
		return 'OWNER'
	}

	get requirement () {
		return 'OWNER'
	}
	
	get description () {
		return 'Developers only 👀'
	}
	
	get usage () {
		return '1+1=5'
	}
	
	get permissions () {
		return 'OWNER'
	}
	
	/**trim (string, max) {
		return string.length > max ? string.slice(0, max) : string
	}*/

	Objsize (obj) {
		var size = 0, key;
		for (key in obj) {
			if (obj.hasOwnProperty(key)) size++;
		}

		return size
	}
	
	async run (msg, args) {
		let res, mainres
		const isAsync = args.includes("--async");
        const isSilent = args.includes("--silent");
        const code = args.filter(e => !/^--(async|silent)$/.test(e)).join(" ");
		try {
            let result = eval(isAsync ? `(async()=>{${code}})()` : code);
            let isResultPromise = false;
            if (result instanceof Promise) {
                result = await result;
                isResultPromise = true;
            }
            if (isSilent) return;
            let inspectedResult = util.inspect(result, { depth: 0 });
            // if (isResultPromise) inspectedResult = `Promise<${inspectedResult}>`;
            return await msg.channel.createMessage({
				embed: {
					author: {
						name: `Eval by ${msg.author.username}`,
						icon_url: msg.author.avatarURL
					},
					description: `\`\`\`js\n${inspectedResult}\`\`\``,
					color: this.bot.color,
					fields: [
						{
							name: "Time Taken",
							value: `\`\`\`js\n${this.bot.shards.get(this.bot.guildShardMap[msg.channel.guild.id]).latency + " milliseconds"}\`\`\``,
							inline: true
						}
					]
				}
			})
        } catch (error) {
			return await msg.channel.createMessage({
				embed: {
					author: {
						name: `Eval by ${msg.author.username}`,
						icon_url: msg.author.avatarURL
					},
					description: `\`\`\`js\n${error}\`\`\``,
					color: this.bot.color,
					fields: [
						{
							name: "Type",
							value: `\`\`\`js\n${typeof error == "undefined" ? 'Error 404' : typeof res}\`\`\``,
							inline: true
						}
					]
				}
			})
		}
	}
}

module.exports = Eval