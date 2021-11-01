const { paginateResults } = require('../utils');

const LIMIT_MAX = 20;
const LIMIT_MIN = 5;

const fetchData = async (params, context, api, method) => {
	const {
		dataSources
	} = context;
	const result = await dataSources[api][method](params);
	return result;
}

module.exports = {
	Query: {
		listings: async (_, { limit = LIMIT_MAX, lastId }, { dataSources }) => {
			const results = await dataSources.simplyretsAPI.getAllListings({
				limit: limit,
			});
			return results;
		},
		listing: async (_, { mlsId }, { dataSources}) => {
			const result = await dataSources.simplyretsAPI.getListingById({
				mlsId: mlsId
			});
			return result;
		},
		properties: async (_, { limit = LIMIT_MAX, lastId }, { dataSources }) => {
			const results = await dataSources.simplyretsAPI.getAllProperties({
				limit: limit
			});
			return results;
		},
		property: async (_, { mlsId }, { dataSources }) => {
			const result = await dataSources.simplyretsAPI.getPropertyForListing({
				mlsId: mlsId
			});
			return result;
		},
		listingsByLocation: async(_, { city, limit = LIMIT_MIN}, context) => {
			return await fetchData({ city, limit}, context, 'simplyretsAPI', 'getListingsByLocation');
		}
	}
}