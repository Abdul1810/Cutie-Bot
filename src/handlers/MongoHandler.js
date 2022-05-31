const Mongo = require('mongoose')
const Schema = Mongo.Schema
const { prefix, mongoUser } = require('../../config').settings

class MongoHandler {
	constructor () {
		this.mongo = Mongo
		this.mongo.set(`useFindAndModify`,false)
		this.init().catch((e) => console.error(e))
		this.schemas = {
			Guild: new Schema({
				Servername: String,
				Prefix: String,
				GuildID: String
			}),

			ChatChannel: new Schema({
				Servername: String,
				GuildID: String,
				chatchannelID: String
			}),
			
			GuildCount: new Schema({
				_id: String,
				ServerCount: { type: Number}
			}),
			
			IgnoreChannel: new Schema({
				Servername: String,
				IgnoredChannelsID: { type: Array, default: []},
				GuildID: String
			}),

			CutieStaff: new Schema({
				_id: { type: String, default: []},
				Developers: { type: Array, default: []},
				Moderators: { type: Array, default: []},
				Bughunters : { type: Array, default: []},
				Donators: { type: Array, default: []}
			}),

			CommandCount: new Schema({
				_id: String,
				count: { type: Number }
			}),

			BlockedUsers: new Schema({
				UserID: { type: Array, default: []},
				_id: String
			})
		}
		
		this.models = {
			Guild: Mongo.model('prefixes', this.schemas.Guild),
			ChatChannel: Mongo.model('chatchannels', this.schemas.ChatChannel),
			GuildCount: Mongo.model('guildcount', this.schemas.GuildCount),
			IgnoreChannel: Mongo.model('ignoredchannels', this.schemas.IgnoreChannel),
			BlockedUsers: Mongo.model('blockedusers', this.schemas.BlockedUsers),
			CommandCount: Mongo.model('commandcount', this.schemas.CommandCount),
			CutieStaff: Mongo.model('cutiestaff', this.schemas.CutieStaff)
		}
	}

	async getprefix (guildid) {
		const guildprefix = await this.models.Guild.findOne({
			GuildID: guildid
		})
		if (!guildprefix) {
			return prefix
		}
		else {
			return guildprefix.Prefix
		}
	}

	async getchannel (guildid) {
        const guildchannel = await this.models.ChatChannel.findOne({
            GuildID: guildid
        })
        if (!guildchannel) {
            return null
        }
        else if (guildchannel) {
            return guildchannel.chatchannelID
        }
    }

	async getIgnoredChannels (guildid) {
		const ignoredchannels = await this.models.IgnoreChannel.findOne({
			GuildID: guildid
		})
		if (!ignoredchannels) {
			return null
		}
		else if (ignoredchannels) {
			return ignoredchannels.IgnoredChannelsID
		}
	}

	async getBlockedUsers () {
		const BlockedUsers = await this.models.BlockedUsers.findById('_blockedusersdata')
		return BlockedUsers.UserID
	}

	async addGuildCount () {
		const guildcount = await this.models.GuildCount.findById(`_guilddata`)
		if (!guildcount) {
			const newGuildCount = new this.models.GuildCount({
				_id: `_guilddata`,
				ServerCount: 3770+1
			})
			await newGuildCount.save()
			return
		} else {
			guildcount.ServerCount += 1
			await guildcount.save()
			return
		}
	}

	async delGuildCount () {
		const guildcount = await this.models.GuildCount.findById(`_guilddata`)
		if (!guildcount) {
			const newGuildCount = new this.models.GuildCount({
				_id: `_guilddata`,
				ServerCount: 3770-1
			})
			await newGuildCount.save()
			return
		} else {
			guildcount.ServerCount -= 1
			await guildcount.save()
			return
		}
	}

	async getGuildCount () {
		const guildcount = await this.models.GuildCount.findById('_guilddata')
		if (!guildcount) {
			const newGuildCount = new this.models.GuildCount({
				_id: `_guilddata`,
				ServerCount: 3770
			})
			await newGuildCount.save()
			return guildcount.ServerCount
		} else {
			return guildcount.ServerCount
		}
	}

	async getCommandCount () {
		const commandcount = await this.models.CommandCount.findById('_commandcount')
		if (commandcount) return commandcount.count
		else return 0
	}

	async addCommandCount () {
		const commandcount = await this.models.CommandCount.findById('_commandcount')
		if (!commandcount) {
			const newCount = new this.models.CommandCount({
				_id: '_commandcount',
				count: 27025+1
			})
			await newCount.save()
			return
		} else {
			commandcount.count += 1
			commandcount.save()
			return
		}
	}
/*	async getGuild (id) {
		const guildDoc = await this.models.Guild.findById(`${mongoUser}_guilddata_${id}`)
		if (!guildDoc) {
			const newGuild = new this.models.Guild({
				_id: `${mongoUser}_guilddata_${id}`
			})
			await newGuild.save()
			return newGuild
		} else return guildDoc
	}
	*/
	
	async init () {
		await this.mongo.connect(mongoUser, {
			useNewUrlParser: true,
			useUnifiedTopology: true
		})
	}
}

module.exports = MongoHandler