const currencyFormatter = require('currency-formatter');

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
	// console.log(currencyFormatter);
	const formattedPrice = currencyFormatter.format( p.price, { code: currencyMap[locale].code });
	return formattedPrice;
}

module.exports.paginateResults = ({
	after: pointer,
	limit = 20,
	results,
	getPointer = () => null, // this can be overridden
	}) => {
	// if 0 || 0< return empty array
	if (limit < 1)
		return [];
	// if pointer for last page item null, return results from index 0 to limit
	if (!pointer)
		return results.slice(0, limit);
	// find the index of the record indicated by the pointer
	// if no pointer exist, 
	const pointerIndex = results.findIndex(record => {
		const recordPointer = record.pointer ? record.pointer : getPointer(record);
		return recordPointer ? pointer === recordPointer : false;
	});

	// return results, append new records onto collection, otherwise return the collection
	return pointerIndex >= 0
		? pointerIndex === results.length -1 // avoid overflow
			? []
			: results.slice(
				pointerIndex + 1,
				Math.min(results.length, pointerIndex + 1 + limit),
			)
		: results.slice(0, limit);
}