const Fetch = require('node-fetch');
const { ecolor, color } = require('../../config').settings
const { getRandomJoke } = require("one-liner-joke")

module.exports = {
		error: {
			embed: {
				color: ecolor,
				description: "Something Went Wrong with the Api.Try Again",
				timestamp: new Date()
			}
		},

	async GetAdvice (dev) {
		const res = await Fetch("https://api.adviceslip.com/advice");
		let { slip } = await res.json();
		if (!slip) return this.error

		let Data = {
			embed: {
				color: color,
				description: slip.advice,
				timestamp: new Date(),
				footer: {
					text: `Developed by ${dev}`
				}
			}
		}
		return Data;
	},
	async GetJoke (dev) {
		let Joke = getRandomJoke();

		if (!Joke.body) return this.error

		let Data = {
			embed: {
				color: color,
				description: Joke.body,
				timestamp: new Date(),
				footer: {
					text: `Developed by ${dev}`
				}
			}
		}
		return Data;
	}
}