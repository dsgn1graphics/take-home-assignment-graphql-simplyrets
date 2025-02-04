const currencyFormatter = require('currency-formatter');
const { users, acl } = require('./users/__mocks__/users');
const { schemaMap } = require('./schema_map');

/**
 * formatDate
 * @param {string} data Date
 * @param {Boolean} t include the timestamp, default true
 * @returns {string} date format in YYYY-MM-DD HH:MM:SS
 */
module.exports.formatDate = (data, t = true) => {
	const date = new Date(data);
	const datePart = date.toISOString().split('T')[0];
	const timePart = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
	return t
		? `${datePart} ${timePart}`
		: datePart;
}

/**
 * formatPrice
 * @param {number} price
 * @param {string} locale the currency code of the current users locale, default en-US
 * @return string formated with price and symbol for supported regions, uses Intl.NumberFormat API
 */
module.exports.formatPrice = (price, locale = 'en-US') => {	
	// For a larger list this could be moved to a currency-locale.json file
	const currencyMap = {
		'en-US': {
			code: 'USD',
			symbol: '$'
		}
	}
	if (!currencyMap[locale])
		return price;

	// need a mutable copy to manipulate
	let p = { price };
	const formattedPrice = currencyFormatter.format( p.price, { code: currencyMap[locale].code });
	return formattedPrice;
}

/**
 * fetchData
 * @param {any} params query params for request
 * @param {Object} context shared server context object
 * @param {String} api api name
 * @param {String} method api method
 * @param {String} resolver caller name
 * Reusable function to reduce code for making simple get request
 * @returns 
 */
module.exports.fetchData = async (params, context, api, method, resolver) => {
	const {
		dataSources,
		user,
		isAuth,
	} = context;
	const userAcls = acl.users.find(u => u.id === user.id);

	if (isAuth && userAcls.active.indexOf(resolver) >= 0) {
		const response = await dataSources[api][method](params);
		return response;
	}

	const errorMsg = {
		errors: [
			{
				code: 401,
				message: 'UNAUTHORIZED: Invalid token'
			}
		]
	};

	return schemaMap[resolver] === 'multiple' ? [errorMsg] : errorMsg;
}