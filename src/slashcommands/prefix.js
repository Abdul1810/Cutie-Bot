const { ctransposeDependencies } = require('mathjs');
const { SlashCommand } = require('slash-create');

class PrefixCommand extends SlashCommand {
	constructor(creator) {
	super(creator, {
		name: 'prefix',
		description: 'Get the Prefix of this Server.',
	});
	
	// Not required initially, but required for reloading with a fresh file.
	this.filePath = __filename;
	}

	async run(ctx) {
		const client = ctx.creator.client
		const prefix = await client.mongo.getprefix(ctx.data.guild_id)
		const prefixembed = {
			color: ctx.creator.client.color,
			description:`<a:annouc:770280757636759633> My prefix in this sever is [ ${prefix} ]`
		}
		return ctx.send({
			embeds: [prefixembed]
		})
	}
}

module.exports = PrefixCommand