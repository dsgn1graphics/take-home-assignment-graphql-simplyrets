const resolvers = require('../simplyrets_resolvers');
const {
	mockListingsDataTransformed,
	mockListingsByLocationSmallTransformed,
} = require('../__mocks__/listings');
const { mockSimplyretsAPI } = require('../__mocks__/simplyretsApi.mock');
const {
	users
} = require('../../users/__mocks__/users');


describe('Query', () => {
	const mockContext = {
		dataSources: mockSimplyretsAPI,
		user: users[0],
		isAuth: true
	}

	describe('[listings]', () => {
		const {
			getAllListings
		} = mockContext.dataSources.simplyretsAPI;

		it('returns the expected data collection for all listings', async () => {
			getAllListings.mockReturnValueOnce(mockListingsDataTransformed);
			const res = await resolvers.Query.listings(
				null,
				{ limit: 20 },
				mockContext
			);
	
			expect(res.length).toEqual(1);
			expect(res).toEqual(mockListingsDataTransformed);
		});	
	});

	describe('[listing]', () => {
		const {
			getListingById
		} = mockContext.dataSources.simplyretsAPI;

		it('returns the requested listing', async () => {
			getListingById.mockReturnValueOnce(mockListingsDataTransformed[0]);
			const res = await resolvers.Query.listing(
				null,
				{ mlsId: "1005192" },
				mockContext
			);

			expect(res).toEqual(mockListingsDataTransformed[0]);
		})
	});

	describe('[properties]', () => {
		const {
			getAllProperties
		} = mockContext.dataSources.simplyretsAPI;

		it('returns a collection of properties for all listings', async () => {
			getAllProperties.mockReturnValueOnce([mockListingsDataTransformed[0].property]);
			const res = await resolvers.Query.properties(
				null,
				{ limi: 5 },
				mockContext
			);

			expect(res).toEqual([mockListingsDataTransformed[0].property]);
		})
	});

	describe('[property]', () => {
		const {
			getPropertyForListing
		} = mockContext.dataSources.simplyretsAPI;

		it('returns the property associated to the provided listing', async () => {
			getPropertyForListing.mockReturnValueOnce(mockListingsDataTransformed[0].property);
			const res = await resolvers.Query.property(
				null,
				{ mlsId: "1005192" },
				mockContext
			);

			expect(res).toEqual(mockListingsDataTransformed[0].property);
		})
	});

	describe('[location]', () => {
		const {
			getListingsByLocation
		} = mockContext.dataSources.simplyretsAPI;

		it('returns a collection of listings by the provided city', async () => {
			getListingsByLocation.mockReturnValueOnce(mockListingsByLocationSmallTransformed);
			const res = await resolvers.Query.listingsByLocation(
				null,
				{ city: 'Houston' },
				mockContext
			);

			expect(getListingsByLocation).toBeCalled();
			expect(res).toEqual(mockListingsByLocationSmallTransformed);
		});
	});
})