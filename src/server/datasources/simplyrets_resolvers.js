const { fetchData } = require('../utils');
const c = require('../constants');

module.exports = {
	Query: {
		[c.LISTINGS]: async (_, { limit = c.LIMIT_MAX, lastId = 0 }, context) => {
			return await fetchData({ limit, lastId }, context, c.SIMPLYRETSAPI, c.GET_ALL_LISTINGS, c.LISTINGS);
		},
		[c.LISTING]: async (_, { mlsId }, context) => {
			return await fetchData({ mlsId }, context, c.SIMPLYRETSAPI, c.GET_LISTING_BY_ID, c.LISTING);
		},
		[c.PROPERTIES]: async (_, { limit = c.LIMIT_MAX, lastId = 0 }, context) => {
			return await fetchData({ limit, lastId }, context, c.SIMPLYRETSAPI, c.GET_ALL_PROPERTIES, c.PROPERTIES);
		},
		[c.PROPERTY]: async (_, { mlsId }, context) => {
			return await fetchData({ mlsId }, context, c.SIMPLYRETSAPI, c.GET_PROPERTY_FOR_LISTING, c.PROPERTY)
		},
		[c.LISTINGS_BY_LOCATION]: async(_, { city, limit = c.LIMIT_MIN, lastId = 0}, context) => {
			return await fetchData({ city, limit, lastId}, context, c.SIMPLYRETSAPI, c.GET_LISTINGS_BY_LOCATION, c.LISTINGS_BY_LOCATION);
		},
		[c.USERS]: async(_, { limit = c.LIMIT_MAX, lastId = 0 }, context) => {
			return await fetchData({ limit, lastId }, context, c.SIMPLYRETSAPI, c.GET_USERS, c.USERS);
		}
	}
}