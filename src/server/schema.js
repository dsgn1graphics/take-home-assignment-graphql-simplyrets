const { gql } = require('apollo-server');

const typeDefs = gql`
	type Query {
		listings(limit: Int): [Listing]!
		listing(mlsId: ID!): Listing
		# associations: [Association]!
		# association(id: ID!): Association
		# agents: [Agent]!
		# agent(id: ID!): Agent
		# offices: [Office]!
		# office(id: ID!): Office
		# sales: [Sales]!
		# sale(id: ID!): Sales
		# coAgents: [CoAgent]!
		# coAgent(id: ID!): CoAgent
		# taxes: [Tax]!
		# tax(id: ID!): Tax
		# geos: [Geo]!
		# geo(id: ID!): Geo
		# multipleListingServices: [Mls]!
		# multipleListingService(id: ID!): Mls
		# schools: [School]!
		# school(id: ID!): School
		# addresses: [Address]!
		# address(id: ID!): Address
		# parkings: [Parking]!
		# parking(id: ID!): Parking
		properties(limit: Int): [Property]!
		property(mlsId: ID!): Property
        listingsByLocation(city: String!, limit: Int): [Listing]!
	}

	type Listing {
        privateRemarks: String
        showingContactName: String
        mlsId: Int
        showingContactPhone: String
        terms: String
        showingInstructions: String
        leaseTerm: String
        disclaimer: String
        specialListingConditions: String
        originalListPrice: String
        agreement: String
        listDate: String
        modified: String
        listPrice: String
        internetAddressDisplay: String
        listingId: String
        internetEntireListingDisplay: String
        leaseType: String
        virtualTourUrl: String
        remarks: String
        ownership: String
        association: Association
        sales: Sales
        coAgent: CoAgent
        tax: Tax
        geo: Geo
        mls: Mls
        photos: [String]
        school: School
        agent: Agent
        address: Address
        office: Office
        property: Property
    }

    type Contact {
        email: String
        office: String
        cell: String
    }

    type Association { 
        frequency: String
        fee: Int
        name: String
        amenities: String 
    }
  
    type Agent { 
        lastName: String
        contact: Contact
        address: String
        firstName: String
        id: String
        officeMlsId: String
        modified: String
    }
    
    type Office {
        contact: Contact
        name: String
        servingName: String
        brokerid: String
    }
    
    type Sales { 
        closeDate: String
        closePrice: String
        contractDate: String
        agent: Agent
        office: Office 
    }
    
    type CoAgent { 
        lastName: String
        contact: Contact
        address: String
        firstName: String
        id: String
        officeMlsId: String
        modified: String
    }
    
    type Tax { 
        taxYear: Int 
        taxAnnualAmount: Int 
        id: String 
    }
    
    type Geo { 
        county: String
        lat: Float
        lng: Float
        marketArea: String
        directions: String 
    }
    
    type Mls { 
        status: String
        area: String
        daysOnMarket: Int
        originalEntryTimestamp: String
        originatingSystemName: String
        statusText: String
        areaMinor: String 
    }
    
    type School { 
        middleSchool: String
        highSchool: String
        elementarySchool: String
        district: String 
     }
    
    type Address { 
        crossStreet: String
        state: String
        country: String
        postalCode: String
        streetName: String
        streetNumberText: String
        city: String
        streetNumber: Int
        full: String
        unit: String 
    }
    
    type Parking { 
        leased: String 
        spaces: Int 
        description: String 
    }
    
    type Property { 
        roof: String
        cooling: String
        style: String
        area: Int
        bathsFull: Int
        bathsHalf: Int
        stories: Int
        fireplaces: Int
        flooring: String
        heating: String
        bathrooms: String
        foundation: String
        laundryFeatures: String
        occupantName: String
        ownerName: String
        lotDescription: String
        pool: String
        subType: String
        bedrooms: Int
        interiorFeatures: String
        lotSize: String
        areaSource: String
        maintenanceExpense: String
        additionalRooms: String
        exteriorFeatures: String
        water: String
        view: String
        lotSizeArea: String
        subdivision: String
        construction: String
        lotSizeAreaUnits: String
        type: String
        garageSpaces: Float
        bathsThreeQuarter: String
        accessibility: String
        acres: String
        occupantType: String
        subTypeText: String
        yearBuilt: Int
        parking: Parking 
    }
`;

module.exports = typeDefs;