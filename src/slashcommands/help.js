const { ctransposeDependencies } = require('mathjs');
const { SlashCommand } = require('slash-create');

const { owners } =require('../../config').settings

class HelpCommand extends SlashCommand {
	constructor(creator) {
		super(creator, {
			name: 'help',
			description: 'View All Commands of Cutie.',
		})
	// Not required initially, but required for reloading with a fresh file.
	this.filePath = __filename;
	}

	async run(ctx) {
		const client = ctx.creator.client
		const chatInstance = client.commands.filter(x => x.category == 'chatbot').map((x) => x.name)
		const modInstance = client.commands.filter(x => x.category == 'mod').map((x) => x.name)
		const utilityInstance = client.commands.filter(x => x.category == 'utility').map((x) => x.name)
		const funInstance = client.commands.filter(x => x.category == 'fun').map((x) => x.name)
		const roleplayInstance = client.commands.filter(x => x.category == 'roleplay').map((x) => x.name)
		const imageInstance = client.commands.filter(x => x.category == 'image').map((x) => x.name)
		const textInstance = client.commands.filter(x => x.category == 'text').map((x) => x.name)
		//const analyzeInstance = client.commands.filter(x => x.category == 'analyze').map((x) => x.name)
		const botInstance = client.commands.filter(x => x.category == 'bot').map((x) => x.name)
		const ownerInstance = client.commands.filter(x => x.category == 'OWNER').map((x) => x.name)

		const chat = [...new Set(chatInstance)].join(', ');
		const mod = [...new Set(modInstance)].join(', ');
		const utility = [...new Set(utilityInstance)].join(', ');
		const fun = [...new Set(funInstance)].join(', ');
		const roleplay = [...new Set(roleplayInstance)].join(', ');
		const image = [...new Set(imageInstance)].join(', ');
		const text = [...new Set(textInstance)].join(', ');
		//const analyze = [...new Set(analyzeInstance)].join(', ')
		const bot = [...new Set(botInstance)].join(', ');
		const owner = [...new Set(ownerInstance)].join(', ')
		let helpembed = {
			color: client.color,
			author: { name: 'Cutie', icon_url: client.user.avatarURL, url: client.invitelink },
			thumbnail: { url: client.user.avatarURL },
			footer: { text: `Type: ${await client.mongo.getprefix(ctx.data.guild_id)}help <Command-name>  for more information!` },
			fields: [
				{ name: '**__CHAT BOT__**', value: chat },
				{ name: '**__MOD COMMANDS__**', value: mod },
				{ name: '**__UTILITY COMMANDS__**', value: utility },
				{ name: '**__FUN COMMANDS__**', value: fun },
				{ name: '**__ROLEPLAY COMMANDS__**', value: roleplay },
				{ name: '**__IMAGE COMMANDS__**', value: image },
				{ name: '**__TEXT COMMANDS__**', value: text },
				{ name: '**__BOT COMMANDS__**', value: bot }
			],
			timestamp: new Date(),
			description: `**Server Prefix [ ${await client.mongo.getprefix(ctx.data.guild_id)} ]**`,
		}
		if (owners.includes(ctx.data.member.user.id)) {
			helpembed.fields.push({
				name: `**__OWNER__** `,
				value: owner
			})
		}
		return ctx.send({
			embeds: [helpembed],
			components: [
				{
					type: 1,
					components: [
						{
							type: 2,
							style: 5,
							label: 'Invite',
							url: client.invitelink
						},
						{
							type: 2,
							style: 5,
							label: 'Support',
							url: client.supportlink
						}
					]
				}
			]
		})
	}
}

module.exports = HelpCommand