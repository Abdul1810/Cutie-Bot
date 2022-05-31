const { SlashCommand, CommandOptionType } = require('slash-create');
const { default: resolvedMember } = require('slash-create/lib/structures/resolvedMember')

class AvatarCommand extends SlashCommand {
	constructor(creator) {
		super(creator, {
			name: 'avatar',
			description: 'Get the Avatar of a user/yourself.',
			options: [{
			type: CommandOptionType.USER,
			name: 'user',
			description: 'Whom do you want to check Avatar?'
			}]
		});

		// Not required initially, but required for reloading with a fresh file.
		this.filePath = __filename;
	}

	async run(ctx) {
		let resolved, member, avatarembed, av;
		const client = ctx.creator.client
	  	if (!ctx.data.data.resolved) {
			resolved = new resolvedMember(ctx.data.member, ctx.data.member.user, ctx.creator)
			member = resolved.user

			if (member.dynamicAvatarURL("", 2048).includes(".gif")) {
				av = `[GIF](${member.dynamicAvatarURL("gif", 2048)})`
			}
			else {
				av = `[JPEG](${member.dynamicAvatarURL("jpeg", 2048)})`
			}

			avatarembed = {
				title: ctx.data.member.user.username,
				description: `**[PNG](${member.dynamicAvatarURL("png", 2048)}) | ${av} | [WEBP](${member.dynamicAvatarURL("webp", 2048)})\n\u200b\n[16](${member.dynamicAvatarURL("", 16)}) | [32](${member.dynamicAvatarURL("", 32)}) | [64](${member.dynamicAvatarURL("", 64)}) | [128](${member.dynamicAvatarURL("", 128)}) | [256](${member.dynamicAvatarURL("", 256)}) | [512](${member.dynamicAvatarURL("", 512)}) | [1024](${member.dynamicAvatarURL("", 1024)}) | [2048](${member.dynamicAvatarURL("", 2048)})**`,
				color: client.color,
				image:{
					url: member.dynamicAvatarURL("", 2048)
				},
				timestamp: new Date(),
				footer:{
					text: `Requested By ${ctx.data.member.user.username + "#" + ctx.data.member.user.discriminator}`
				}
			}
		}
		else {
			const resolved = new resolvedMember(ctx.data.data.resolved.members[ctx.data.data.options[0].value], ctx.data.data.resolved.users[ctx.data.data.options[0].value], ctx.creator)
			member = resolved.user
			console.log(member)

			if (member.dynamicAvatarURL("", 2048).includes(".gif")) {
				av = `[GIF](${member.dynamicAvatarURL("gif", 2048)})`
			}
			else {
				av = `[JPEG](${member.dynamicAvatarURL("jpeg", 2048)})`
			}

			avatarembed = {
				title: member.username,
				description: `**[PNG](${member.dynamicAvatarURL("png", 2048)}) | ${av} | [WEBP](${member.dynamicAvatarURL("webp", 2048)})\n\u200b\n[16](${member.dynamicAvatarURL("", 16)}) | [32](${member.dynamicAvatarURL("", 32)}) | [64](${member.dynamicAvatarURL("", 64)}) | [128](${member.dynamicAvatarURL("", 128)}) | [256](${member.dynamicAvatarURL("", 256)}) | [512](${member.dynamicAvatarURL("", 512)}) | [1024](${member.dynamicAvatarURL("", 1024)}) | [2048](${member.dynamicAvatarURL("", 2048)})**`,
				color: client.color,
				image:{
					url: member.dynamicAvatarURL("", 2048)
				},
				timestamp: new Date(),
				footer:{
					text: `Requested By ${ctx.data.member.user.username + "#" + ctx.data.member.user.discriminator}`
				}
			}
		}
		
		return ctx.send({
			embeds: [avatarembed]
		})
	}
}

module.exports = AvatarCommand