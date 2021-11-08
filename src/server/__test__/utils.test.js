const { SIMPLYRETSAPI, GET_ALL_LISTINGS, LISTINGS } = require('../constants');
const { mockListingsDataTransformed } = require('../datasources/__mocks__/listings');
const { mockSimplyretsAPI } = require('../datasources/__mocks__/simplyretsApi.mock');
const { users } = require('../users/__mocks__/users');
const {
	formatDate,
	formatPrice,
	fetchData
} = require('../utils');


describe('formatDate', () => {
	it('should return an ISO compatable date or date/time format', () => {
		expect(formatDate('2011/03/15', false)).toEqual('2011-03-15');
		expect(formatDate('2011.04.13', false)).toEqual('2011-04-13');
		expect(formatDate('2011-05-23T18:50:30.184391Z')).toEqual('2011-05-23 11:50:30');
		expect(formatDate('2011-05-23T18:50:30')).toEqual('2011-05-24 18:50:30');
		expect(formatDate('2011-05-23 18:50:30')).toEqual('2011-05-24 18:50:30');
		expect(() => formatDate('2011-05-32T18:50:30.184391Z')).toThrow();
	});
})

describe('formatPrice', () => {
	it('should format the price to the specified locale', () => {
		expect(formatPrice(23847299)).toEqual('$23,847,299.00');
		expect(formatPrice(0)).toEqual('$0.00');
		expect(formatPrice(null)).toEqual('$0.00');
		expect(formatPrice(0.0)).toEqual('$0.00');
		expect(formatPrice(0.00)).toEqual('$0.00');
		expect(formatPrice(238472.99)).toEqual('$238,472.99');
		expect(formatPrice(2384.7299)).toEqual('$2,384.73');
	})
});

describe('fetchData', () => {
	it('should return an error message to the caller with not authenticated', async () => {
		const res = await fetchData(
			{ limit: 1},
			{
				dataSources: mockSimplyretsAPI,
				user: users[0],
				isAuth: false
			},
			SIMPLYRETSAPI,
			GET_ALL_LISTINGS,
			LISTINGS,
		)
		expect(Array.isArray(res)).toBeTruthy();
		const error = res[0].errors[0];
		expect(error.code).toEqual(401);
		expect(error.message).toEqual('UNAUTHORIZED: Invalid token');
	});

	it('should return the expected data', async () => {	
		mockSimplyretsAPI.simplyretsAPI.getAllListings
			.mockReturnValue(mockListingsDataTransformed[0]);
		const res = await fetchData(
			{ limit: 1},
			{
				dataSources: mockSimplyretsAPI,
				user: users[0],
				isAuth: true,
			},
			SIMPLYRETSAPI,
			GET_ALL_LISTINGS,
			LISTINGS,
		);
		expect(mockSimplyretsAPI.simplyretsAPI.getAllListings).toBeCalled();
		expect(res).toEqual(mockListingsDataTransformed[0]);
	})
})