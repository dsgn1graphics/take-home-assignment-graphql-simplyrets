const SimplyretsAPI = require('../simplyrets');
const {
	mockListingsData,
	mockListingsDataTransformed,
	mockListingsByLocation,
	mockListingsByLocationSmallTransformed
} = require('../__mocks__/listings');

const mocks = {
	get: jest.fn(),
}

const api = new SimplyretsAPI({ authToken: 'abcd1234abcd1234'});
api.get = mocks.get;

fdescribe('SimplyretsAPI', () => {
	describe('[getAllListings]', () => {
		it('returns an array of listings', async () => {
			mocks.get.mockReturnValue(mockListingsData);
			const res = await api.getAllListings({
				limit: 1
			});
	
			expect(res).toEqual(mockListingsDataTransformed);
			expect(mocks.get).toBeCalled();
		})	
	})
	
	fdescribe('[getListingById]', () => {
		it('returns a listing', async () => {
			mocks.get.mockReturnValue(mockListingsData[0]);
			const res = await api.getListingById({
				mlsId: mockListingsData[0].mlsId
			});
	
			expect(res).toEqual(mockListingsDataTransformed[0]);
			expect(mocks.get).toBeCalled();
		})
	});
	
	describe('[getAllProperties]', () => {
		it('returns an array of properties', async () => {
			mocks.get.mockReturnValue(mockListingsData);
			const res = await api.getAllProperties({
				limit: 1
			});
	
			expect(res).toEqual([mockListingsDataTransformed[0].property]);
			expect(mocks.get).toBeCalled();
		})
	});

	describe('[getPropertyForListing]', () => {
		it('returns the property for the requested listing', async () => {
			mocks.get.mockReturnValue(mockListingsData[0]);
			const res = await api.getPropertyForListing({
				mlsId: mockListingsData[0].mlsId
			});

			expect(res).toEqual(mockListingsDataTransformed[0].property);
			expect(mocks.get).toBeCalled();
		})
	});

	describe('[getListingsByLocation]', () => {
		it('returns a collection of listings by the location provided', async () => {
			mocks.get.mockReturnValue(mockListingsByLocation);
			const res = await api.getListingsByLocation({
				city: 'Houston'
			});

			expect(res).toEqual(mockListingsByLocationSmallTransformed);
			expect(mocks.get).toBeCalled();			
		})
	})
})