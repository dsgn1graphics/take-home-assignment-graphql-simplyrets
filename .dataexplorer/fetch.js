/// add "type": "module" to the package.json to use this package
import fetch, { Headers } from 'node-fetch';

/**
 * Tool to help fetch data from external apis
 * NFPU
 * for development use only
 */

const URL = 'https://api.simplyrets.com/properties';
const auth = Buffer.from("simplyrets:simplyrets").toString('base64');

const meta = {
	'Content-Type': 'application/json',
	'Authorization': 'Basic ' + auth,
}
const headers = new Headers(meta);

fetch(
	URL + '/?limit=1',
	{
		headers: headers
	}
)
	.then(response => response.json())
	.then(data => {
		console.log(JSON.stringify(data, null, 4));
		const listing = data[0];

		const buildContact = (contact) => contact 
			? contact.email + "\n" + contact.phone + "\n" + contact.cell
			: null;

		const formatDate = (date) => date ? date : null; // TODO

		const formatPrice = (price) => price ? price : null; // TODO

		/**
		 * Data structures
		 */
		// Listing
		const singleListing = {
			favoriteCount: listing.favoriteCount,
			privateRemarks: listing.privateRemarks,
			showingContactName: listing.showingContactName,
			mlsId: listing.mlsId,
			showingContactPhone: listing.showingContactPhone,
			terms: listing.terms,
			showingInstructions: listing.showingInstructions,
			leaseTerm: listing.leaseTerm,
			disclaimer: listing.disclaimer,
			originalListPrice: formatPrice(listing.originalListPrice),
			agreement: listing.agreement,
			listDate: formatDate(listing.listDate),
			modified: listing.modified,
			listPrice: formatPrice(listing.listPrice),
			internetAddressDisplay: listing.internetAddressDisplay,
			listingId: listing.listingId,
			internetEntireListingDisplay: listing.internetEntireListingDisplay,
			leaseType: listing.leaseType,
			virtualTourUrl: listing.virtualTourUrl,
			remarks: listing.remarks,
			association: listing.association,
			sales: listing.sales,
			coAgent: listing.coAgent,
			tax: listing.tax,
			geo: listing.geo,
			mls: listing.mls,
			photos: listing.photos,
			school: listing.school,
			agent: listing.agent,
			address: listing.address,
			office: listing.office,
			property: listing.property, 
		}

		const association = {
			frequency: listing.association.frequency,
			fee: listing.association.fee,
			name: listing.association.name,
			aminities: listing.association.aminities
		}

		const agent = {
			lastName: listing.agent.lastName,
			contact: buildContact(listing.agent.contact),
			address: listing.agent.contact.address,
			firstName: listing.agent.contact.firstName,
			id: listing.agent.contact.id
		}

		const office = {
			contact: buildContact(listing.office.contact),
			name: listing.office.name,
			servingName: listing.office.servingName,
			brokerid: listing.office.brokerid
		}

		const sales = {
			closeDate: formatDate(listing.sales.closeDate),
			closePrice: formatPrice(listing.sales.closePrice),
			contractDate: formatDate(listing.sales.contractDate),
			agent: {
				lastName: listing.sales.agent.lastName,
				contact: buildContact(listing.sales.agent.contact),
				address: listing.sales.agent.contact?.address,
				firstName: listing.sales.agent.contact?.firstName,
				id: listing.sales.agent.contact?.id
			},
			office: {
				contact: buildContact(listing.sales.office.contact),
				name: listing.sales.office.name,
				servingName: listing.sales.office.servingName,
				brokerid: listing.sales.office.brokerid
			}
		}

		const coagent = {
			lastName: listing.coAgent.lastName,
			contact: buildContact(listing.coAgent.contact),
			address: listing.coAgent.address,
			firstName: listing.coAgent.firstName,
			id: listing.coAgent.id
		}

		const tax = {
			taxYear: listing.tax.taxYear,
			taxAnnualAmount: listing.tax.taxAnnualAmount,
			id: listing.tax.id
		}

		const geo = {
			county: listing.geo.count,
			lat: listing.geo.lat,
			lng: listing.geo.lng,
			marketArea: listing.geo.marketArea,
			directions: listing.geo.directions
		}

		const mls = {
			status: listing.mls.status,
			area: listing.mls.area,
			daysOnMarket: listing.mls.daysOnMarket,
			originalEntryTimestamp: formatDate(listing.mls.originalEntryTimestamp),
			originatingSystemName: formatDate(listing.mls.originatingSystemName),
			statusText: listing.mls.statusText,
			areaMinor: listing.mls.areaMinor
		}

		const school = {
			middleSchool: listing.school.middleSchool,
			highSchool: listing.school.highSchool,
			elementarySchool: listing.school.elementarySchool,
			district: listing.school.district
		}

		const address = {
			crossStreet: listing.address.crossStreet,
			state: listing.address.state,
			country: listing.address.country,
			postalCode: listing.address.postalCode,
			streetName: listing.address.streetName,
			streetNumberText: listing.address.streetNumberText,
			city: listing.address.city,
			streetNumber: listing.address.streetNumber,
			full: listing.address.full,
			unit: listing.address.unit
		}

		const parking = {
			leased: listing.property.parking?.leased,
			spaces: listing.property.parking?.spaces,
			description: listing.property.parking?.description
		}

		const property = {
			roof: listing.property.roof,
			cooling: listing.property.cooling,
			style: listing.property.style,
			area: listing.property.area,
			bathsFull: listing.property.bathsFull,
			bathsHalf: listing.property.bathHalf,
			stories: listing.property.stories,
			fireplaces: listing.property.fireplaces,
			flooring: listing.property.flooring,
			heating: listing.property.heating,
			bathrooms: listing.property.bathrooms,
			foundation: listing.property.foundation,
			laundryFeatures: listing.property.laundryFeatures,
			occupantName: listing.property.occupantName,
			ownerName: listing.property.ownerName,
			lotDescription: listing.property.lotDescription,
			pool: listing.property.pool,
			subType: listing.property.subType,
			bedrooms: listing.property.bedrooms,
			interiorFeatures: listing.property.interiorFeatures,
			lotSize: listing.property.lotSize,
			areaSource: listing.property.areaSource,
			maintenanceExpense: listing.property.maintenanceExpense,
			additionalRooms: listing.property.additionalRooms,
			exteriorFeatures: listing.property.exteriorFeatures,
			water: listing.property.water,
			view: listing.property.price,
			lotSizeArea: listing.property.lotSizeArea,
			subdivision: listing.property.subdivision,
			construction: listing.property.construction,
			lotSizeAreaUnits: listing.property.lotSizeAreaUnits,
			type: listing.property.type,
			garageSpaces: listing.property.garageSpaces,
			bathsThreeQuarter: listing.property.bathsThreeQuarter,
			accessibility: listing.property.accessibility,
			acres: listing.property.acres,
			occupantType: listing.property.occupantType,
			subTypeText: listing.property.subTypeText,
			yearBuilt: listing.property.yearBuilt,
			parking: {
				leased: listing.property.parking?.leased,
				spaces: listing.property.parking?.spaces,
				description: listing.property.parking?.description
			}
		}


		// Preview data after transforming
		// console.log(
		// 	association,
		// 	agent,
		// 	office,
		// 	sales,
		// 	coagent,
		// 	tax,
		// 	geo,
		// 	mls,
		// 	school,
		// 	address,
		// 	parking,
		// 	property,
		// );

		const dataDate = '2011-05-23T18:50:30.184391Z';
		const date = new Date(dataDate);
		const datePart = date.toISOString().split('T')[0];
		const timePart = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
		console.log(`${datePart} ${timePart}`);

		
		console.log(new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(23847299));
		console.log(new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(0));
		console.log(new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(null));
		console.log(new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(0.0));
		console.log(new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(0.00));
		console.log(new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(238472.99));
		console.log(new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(2384.7299));
	});
