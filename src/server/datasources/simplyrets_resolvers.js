const { fetchData } = require('../utils');

const LIMIT_MAX = 20;
const LIMIT_MIN = 5;
const SIMPLYRETSAPI = 'simplyretsAPI';
const GET_LISTINGS_BY_LOCATION = 'getListingsByLocation';
const GET_PROPERTY_FOR_LISTING = 'getPropertyForListing';
const GET_ALL_PROPERTIES = 'getAllProperties';
const GET_LISTING_BY_ID = 'getListingById';
const GET_ALL_LISTINGS = 'getAllListings';



module.exports = {
	Query: {
		listings: async (_, { limit = LIMIT_MAX, lastId = 0 }, context) => {
			return await fetchData({ limit, lastId }, context, SIMPLYRETSAPI, GET_ALL_LISTINGS);
		},
		listing: async (_, { mlsId }, context) => {
			return await fetchData({ mlsId }, context, SIMPLYRETSAPI, GET_LISTING_BY_ID);
		},
		properties: async (_, { limit = LIMIT_MAX, lastId = 0 }, context) => {
			return await fetchData({ limit, lastId }, context, SIMPLYRETSAPI, GET_ALL_PROPERTIES);
		},
		property: async (_, { mlsId }, context) => {
			return await fetchData({ mlsId }, context, SIMPLYRETSAPI, GET_PROPERTY_FOR_LISTING)
		},
		listingsByLocation: async(_, { city, limit = LIMIT_MIN, lastId = 0}, context) => {
			return await fetchData({ city, limit, lastId}, context, SIMPLYRETSAPI, GET_LISTINGS_BY_LOCATION);
		}
	}
}