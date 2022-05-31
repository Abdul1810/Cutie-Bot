const { ctransposeDependencies } = require('mathjs');
const { SlashCommand } = require('slash-create');

const { responses } = require('../assets/responses/pingresponse')


class PingCommand extends SlashCommand {
	constructor(creator) {
	super(creator, {
		name: 'ping',
		description: 'Check The Ping of The Bot.',
	});

	// Not required initially, but required for reloading with a fresh file.
	this.filePath = __filename;
	}

	async run(ctx) {
		const client = ctx.creator.client

		let random = Math.floor((Math.random() * responses.length));
		let response = responses[random].replace("{user}", ctx.data.member.nick ? ctx.data.member.nick : ctx.data.member.user.username).replace("{ms}", client.shards.get(client.guildShardMap[ctx.data.guild_id]).latency)
		return ctx.send(response)
	}
}

module.exports = PingCommand