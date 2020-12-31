const {User, Profile} = require('../../models/User');
const util = require('../../util/userdata')

module.exports = {
	dbFix: {
		async dbFix(_, { random }) {
			try{
				users = await User.find({});
				profiles = await util.getProfiles();

				console.log(profiles.length)

				for(var i = 0; i < profiles.length; ++i)
				{
					var frnds={}
					for(var j = 0; j < profiles[i].friends.length; ++j)
					{
						if(!frnds[profiles[i].friends[j]])
							frnds[profiles[i].friends[j]] = 0;

						++frnds[profiles[i].friends[j]];
					}
					console.log(profiles[i]._id, frnds)
					console.log("HI")
				}

			} catch(err){
                throw new Error(err);
            }
		}
	}
}
