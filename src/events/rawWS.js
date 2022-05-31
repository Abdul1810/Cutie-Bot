const Event = require('../classes/Event')

class rawWS extends Event {

	get name () {
		return 'rawWS'
	}

	get once () {
		return false
	}

	interaction_pass (props) {
		require('node-fetch')('https://discord.com/api/v8/interactions/' + props.id + '/' + props.token + '/callback', {
				method: 'POST',
						headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					type: 6
				})
			})
	}

	async run (packet) {
		if (packet.t === 'INTERACTION_CREATE') {
			if (packet.d.data.custom_id === '_ping') {
				return this.interaction_pass(packet.d)
			}
		}
	}
}

module.exports = rawWS