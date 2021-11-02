module.exports.users = [
	{
		id: 123456,
		email: 'user1@sideinc.com',
		roles: ['admin'],
	}
]

module.exports.acl = {
	users: [
		{
			id: 123456,
			active: [
				'listings',
				'listing',
				'properties',
				'property',
				'listingsByLocation'
			] 
		}
	]
}