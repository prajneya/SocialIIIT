const {User, Profile, UserDets, Sub} = require('../../models/User');

module.exports = {
	subsave: {
		async subsave(_, { id, sub }) {
			try{
				const newsub = new Sub({
					id: id,
					sub: JSON.parse(sub)
				});
				const ret = await newsub.save();
				console.log("saved!", newsub);
			} catch(err){
				throw new Error(err);
			}
		}
	}
}
