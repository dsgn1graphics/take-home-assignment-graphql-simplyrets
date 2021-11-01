const {
	formatDate,
	formatPrice
} = require('../utils');

module.exports.parkingReducer = (parking) => {
	if (!parking) return {};

	return {
		leased: parking.leased,
		spaces: parking.spaces,
		description: parking.description
	}
}

module.exports.contactReducer = (contact) => {
	if (!contact) return {};

	return {
		email: contact.email,
		office: contact.office,
		cell: contact.cell
	}
}

module.exports.addressReducer = (address) => {
	if (!address) return {};

	return {
		crossStreet: address.crossStreet,
		state: address.state,
		country: address.country,
		postalCode: address.postalCode,
		streetName: address.streetName,
		streetNumberText: address.streetNumberText,
		city: address.city,
		streetNumber: address.streetNumber,
		full: address.full,
		unit: address.unit
	}
}

module.exports.schoolReducer = (school) => {
	if (!school) return {};

	return {
		middleSchool: school.middleSchool,
		highSchool: school.highSchool,
		elementarySchool: school.elementarySchool,
		district: school.district
	}
}

module.exports.mlsReducer = (mls) => {
	if (!mls) return {};

	return {
		status: mls.status,
		area: mls.area,
		daysOnMarket: mls.daysOnMarket,
		originalEntryTimestamp: formatDate(mls.originalEntryTimestamp),
		originatingSystemName: formatDate(mls.originatingSystemName),
		statusText: mls.statusText,
		areaMinor: mls.areaMinor
	}
}

module.exports.geoReducer = (geo) => {
	if (!geo) return {};

	return {
		county: geo.county,
		lat: geo.lat,
		lng: geo.lng,
		marketArea: geo.marketArea,
		directions: geo.directions
	}
}

module.exports.taxReducer = (tax) => {
	if (!tax) return {};

	return {
		taxYear: tax.taxYear,
		taxAnnualAmount: tax.taxAnnualAmount,
		id: tax.id
	}
}

module.exports.coagentReducer = (coAgent) => {
	if (!coAgent) return {};

	return {
		lastName: coAgent.lastName,
		contact: this.contactReducer(coAgent.contact),
		address: coAgent.address,
		firstName: coAgent.firstName,
		id: coAgent.id,
		officeMlsId: coAgent.officeMlsId,
		modified: coAgent.modified
	}
}

module.exports.salesReducer = (sales) => {
	if (!sales) return {};

	return {
		closeDate: formatDate(sales.closeDate),
		closePrice: formatPrice(sales.closePrice),
		contractDate: formatDate(sales.contractDate),
		agent: this.agentReducer(sales.agent),
		office: this.officeReducer(sales.office)
	}
}

module.exports.officeReducer = (office) => {
	if (!office) return {};

	return {
		contact: this.contactReducer(office.contact),
		name: office.name,
		servingName: office.servingName,
		brokerid: office.brokerid
	}
}

module.exports.agentReducer = (agent) => {
	if (!agent) return {};

	return {
		lastName: agent.lastName,
		contact: this.contactReducer(agent.contact),
		address: agent.address,
		firstName: agent.firstName,
		id: agent.id,
		officeMlsId: agent.officeMlsId,
		modified: agent.modified
	}
}

module.exports.associationReducer = (association) => {
	if (!association) return {}
	return {
		frequency: association.frequency,
		fee: association.fee,
		name: association.name,
		amenities: association.amenities
	}
}

module.exports.propertyReducer = (property) => {
	if (!property) return {};

	return {
		roof: property.roof,
		cooling: property.cooling,
		style: property.style,
		area: property.area,
		bathsFull: property.bathsFull,
		bathsHalf: property.bathsHalf,
		stories: property.stories,
		fireplaces: property.fireplaces,
		flooring: property.flooring,
		heating: property.heating,
		bathrooms: property.bathrooms,
		foundation: property.foundation,
		laundryFeatures: property.laundryFeatures,
		occupantName: property.occupantName,
		ownerName: property.ownerName,
		lotDescription: property.lotDescription,
		pool: property.pool,
		subType: property.subType,
		bedrooms: property.bedrooms,
		interiorFeatures: property.interiorFeatures,
		lotSize: property.lotSize,
		areaSource: property.areaSource,
		maintenanceExpense: property.maintenanceExpense,
		additionalRooms: property.additionalRooms,
		exteriorFeatures: property.exteriorFeatures,
		water: property.water,
		view: property.view,
		lotSizeArea: property.lotSizeArea,
		subdivision: property.subdivision,
		construction: property.construction,
		lotSizeAreaUnits: property.lotSizeAreaUnits,
		type: property.type,
		garageSpaces: property.garageSpaces,
		bathsThreeQuarter: property.bathsThreeQuarter,
		accessibility: property.accessibility,
		acres: property.acres,
		occupantType: property.occupantType,
		subTypeText: property.subTypeText,
		yearBuilt: property.yearBuilt,
		parking: this.parkingReducer(property.parking)
	}
}

module.exports.listingReducer = (listing) => {
	if (!listing) return {};

	return {
		privateRemarks: listing.privateRemarks,
		showingContactName: listing.showingContactName,
		mlsId: listing.mlsId,
		showingContactPhone: listing.showingContactPhone,
		terms: listing.terms,
		showingInstructions: listing.showingInstructions,
		leaseTerm: listing.leaseTerm,
		disclaimer: listing.disclaimer,
		specialListingConditions: listing.specialListingConditions,
		originalListPrice: formatPrice(listing.originalListPrice),
		agreement: listing.agreement,
		listDate: formatDate(listing.listDate),
		modified: formatDate(listing.modified),
		listPrice: formatPrice(listing.listPrice),
		internetAddressDisplay: listing.internetAddressDisplay,
		listingId: listing.listingId,
		internetEntireListingDisplay: listing.internetEntireListingDisplay,
		leaseType: listing.leaseType,
		virtualTourUrl: listing.virtualTourUrl,
		remarks: listing.remarks,
		ownership: listing.ownership,
		association: this.associationReducer(listing.association),
		sales: this.salesReducer(listing.sales),
		coAgent: this.coagentReducer(listing.coAgent),
		tax: this.taxReducer(listing.tax),
		geo: this.geoReducer(listing.geo),
		mls: this.mlsReducer(listing.mls),
		photos: listing.photos,
		school: this.schoolReducer(listing.school),
		agent: this.agentReducer(listing.agent),
		address: this.addressReducer(listing.address),
		office: this.officeReducer(listing.office),
		property: this.propertyReducer(listing.property),
	}
}

module.exports.listingReducerByLocationSmall = (listing) => {
	if (!listing) return {};

	return {
		address: this.addressReducer(listing.address),
		mlsId: listing.mlsId,
		listDate: formatDate(listing.listDate),
		modified: formatDate(listing.modified),
		listPrice: formatPrice(listing.listPrice),
		leaseType: listing.leaseType
	}
}
