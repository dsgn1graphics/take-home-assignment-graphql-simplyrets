module.exports.mockSimplyretsAPI = {
	simplyretsAPI: {
		getAllListings: jest.fn(),
		getListingById: jest.fn(),
		getAllProperties: jest.fn(),
		getPropertyForListing: jest.fn(),
		getListingsByLocation: jest.fn()
	}
}

module.exports.mockJWT = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIzNDU2LCJlbWFpbCI6InVzZXIxQHNpZGVpbmMuY29tIiwicGFzc3dvcmQiOiJ0ZXN0Iiwicm9sZXMiOlsiYWRtaW4iXSwiaWF0IjoxNjM1ODI5NjMxfQ.lBct2xt74xO3cCXz7Tl0iTPxgdljQ_1a3PnFrlGqeIM';