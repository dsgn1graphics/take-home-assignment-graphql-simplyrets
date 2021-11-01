module.exports.mockSimplyretsAPI = {
	simplyretsAPI: {
		getAllListings: jest.fn(),
		getListingById: jest.fn(),
		getAllProperties: jest.fn(),
		getPropertyForListing: jest.fn(),
		getListingsByLocation: jest.fn()
	}
}