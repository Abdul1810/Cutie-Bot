const sanitizer = require("@aero/sanitizer")

class NameHandler {
	constructor() {
		this.sanitizer = sanitizer
	}

	sanitiz (name) {
		let SanitizedName = sanitizer(name)
		return SanitizedName
	}
}

module.exports = NameHandler