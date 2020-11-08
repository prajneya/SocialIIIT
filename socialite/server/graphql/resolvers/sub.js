const {User, Profile, UserDets, Sub} = require('../../models/User');

module.exports = {
	subsave: {
		async subsave(_, { id, sub }) {
			const newsub = new Sub({
				id: id,
				sub: JSON.parse(sub)
			});
			const ret = await newsub.save();
			console.log("saved!", newsub);
		}
	}
}
