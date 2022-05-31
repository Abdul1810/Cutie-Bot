const { ctransposeDependencies } = require('mathjs');
const { SlashCommand } = require('slash-create');

class InviteCommand extends SlashCommand {
	constructor(creator) {
	super(creator, {
		name: 'invite',
		description: 'Invite Cutie To Your Server.',
	});
	
	// Not required initially, but required for reloading with a fresh file.
	this.filePath = __filename;
	}

	async run(ctx) {
		const client = ctx.creator.client
		const inviteembed = {
			title: `Cutie#0387`,
			color: client.color,
			timestamp: new Date(),
			thumbnail:{
				url: `${client.user.dynamicAvatarURL("", 2048)}`
			},
			description: `Add me To your Server By Clicking [Here](${client.invitelink})\n\u200b\nHave any Questions About Cutie Join Our Support Server By Clicking The Button Below.`
		}
		return ctx.send({
			embeds: [inviteembed],
			components: [
				{
					type: 1,
					components: [
						{
							type: 2,
							label: "Support Server",
							style: 5,
							url: `${client.supportlink}`
						}
					]
				}
			]
		})
	}
}

module.exports = InviteCommand