const gql = require('graphql-tag');
const nock = require('nock');

const { constructTestServer } = require('./__utils');
const {
	mockListingsData,
	mockListingsDataTransformed,
	mockListingsByLocationSmall
} = require('../datasources/__mocks__/listings');

const SimplyretsAPI = require('../datasources/simplyrets');

const LISTINGS_LAYOUT_VIEW_QUERY = gql`
	query ListingsLayoutView_Query {
		listings(limit: 1) {
			listingId
			listPrice
			listDate
			geo {
				lat
				lng
			}
			property {
				acres
				type
				lotDescription
			}
			photos
		}
	}
`;

const GET_LISTING = gql`
	query getLising($mlsId: ID!) {
			listing(mlsId: $mlsId) {
			listingId
			listPrice
			listDate
			geo {
				lat
				lng
			}
			property {
				acres
				type
				lotDescription
			}
			photos    
		}
	}
`;

const GET_LISTINGS_BY_LOCATION = gql`
	query getListingsByLocation {
		listingsByLocation(city: "Houston", limit: 1) {
			address {
				state
				city
				postalCode
				streetName
				country
				streetNumberText
				streetNumber
				full
				unit
				crossStreet
			}
			mlsId
			listDate
			modified
			listPrice
			leaseType
		}
	}
`;

describe('Queries', () => {
	describe('get listings data', () => {
		it('fetches a collection of listings;', async () => {
			const {
				server
			} = constructTestServer();
			const simplyretsAPI = server.config.dataSources().simplyretsAPI;

			simplyretsAPI.get = jest.fn(() => mockListingsDataTransformed);
			// simplyretsAPI.getAllListings.mockReturnValueOnce(mockListingsDataTransformed);
			const res = await server.executeOperation({ query: LISTINGS_LAYOUT_VIEW_QUERY });
			expect(res).toMatchSnapshot();
		});

		it('fetches a single listing when a mlsId is provided', async () => {
			const {
				server
			} = constructTestServer();
			const simplyretsAPI = server.config.dataSources().simplyretsAPI;

			simplyretsAPI.get = jest.fn(() => mockListingsDataTransformed[0]);
			// simplyretsAPI.getAllListings.mockReturnValueOnce(mockListingsDataTransformed);
			const res = await server.executeOperation({ query: LISTINGS_LAYOUT_VIEW_QUERY });
			expect(res).toMatchSnapshot();

		});

		it('fetches a collection of listings by location', async () => {
			const {
				server
			} = constructTestServer();
			const simplyretsAPI = server.config.dataSources().simplyretsAPI;

			simplyretsAPI.get = jest.fn(() => mockListingsByLocationSmall);
			// simplyretsAPI.getAllListings.mockReturnValueOnce(mockListingsDataTransformed);
			const res = await server.executeOperation({ query: GET_LISTINGS_BY_LOCATION });
			expect(res).toMatchSnapshot();
		})
	});
})