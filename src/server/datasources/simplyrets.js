const {
	propertyReducer,
	listingReducer,
	listingReducerByLocationSmall
} = require('./simplyrets_reducer');
const { RESTDataSource } = require('apollo-datasource-rest');
const {
	users,
	acl
} = require('../users/__mocks__/users');

class SimplyretsAPI extends RESTDataSource {
	propertiesPath = 'properties';

	constructor({ authToken }) {
		super();
		this.baseURL = 'https://api.simplyrets.com/';
		this.authToken = authToken;
	}

	addHeader() {
		return {
			headers: {
				'Authorization': 'Basic ' + this.authToken,
				'Content-Type': 'application/json'
			}
		}
	}

	/**
	 * getAllListings 
	 * @returns Array<Listings>
	 */
	async getAllListings({ limit, lastId }) {
		const response = await this.get(this.propertiesPath, {
			limit: limit
		}, this.addHeader());

		return Array.isArray(response)
			? response.map(record => {
				return listingReducer(record);
			})
			: [];
	}

	/**
	 * getListingById
	 * @param {string} mlsId 
	 * @returns Listing
	 */
	async getListingById({ mlsId }) {
		const path = `${this.propertiesPath}/${mlsId}`;
		const response = await this.get(path, {}, this.addHeader());
		return listingReducer(response);
	}

	/**
	 * getAllProperties
	 * @returns Array<Property>
	 */
	async getAllProperties({ limit, lastId }) {
		const response = await this.get(this.propertiesPath, {
			limit: limit
		}, this.addHeader());
		return Array.isArray(response)
			? response.map(record => {
				return propertyReducer(record.property)
			})
			: [];
	}

	/**
	 * getPropertyForListing
	 * @param {string} mlsId
	 * @returns Property
	 */
	async getPropertyForListing({ mlsId }) {
		const listing = await this.getListingById({ mlsId: mlsId });
		return propertyReducer(listing.property);
	}

	/**
	 * getListingsByLocation
	 * @param {object} params
	 * @return [Listing]
	 */
	async getListingsByLocation({ city, limit }) {
		const response = await this.get(this.propertiesPath, {
			q: city,
			limit: limit
		}, this.addHeader());
		return Array.isArray(response)
			? response.map(record => {
				return listingReducerByLocationSmall(record);
			})
			: [];
	}

	async getUsers({ limit, lastId }) {
		return users
	}
}

module.exports = SimplyretsAPI;