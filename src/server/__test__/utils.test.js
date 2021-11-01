const {
	formatDate,
	formatPrice,
	buildContact,
	paginationResults	
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

/**
 * This test is currently disabled. I was having problems getting the 
 * full-icu package configured correctly to support Intl with jest. 
 * It works on node both compiled versions v14.16.0 and v16.13.0
 * with nvm install -s <Version> --with-intl=full-icu flag... An alternative
 * method or package may have better support
 */
xdescribe('formatPrice', () => {
	it('should format the price to the specified locale', () => {
		expect(formatPrice(23847299)).toEqual('$23,847,299.00');
		expect(formatPrice(0)).toEqual('0.00');
		expect(formatPrice(null)).toEqual('0.00');
		expect(formatPrice(0.0)).toEqual('0.00');
		expect(formatPrice(0.00)).toEqual('0.00');
		expect(formatPrice(238472.99)).toEqual('$238,472.99');
		expect(formatPrice(2384.7299)).toEqual('$2,384.73');
	})
})