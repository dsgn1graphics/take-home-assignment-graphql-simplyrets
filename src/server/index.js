const { ApolloServer } = require('apollo-server');

const typeDefs = require('./schema');
const SimplyretsAPI = require('./datasources/simplyrets');
const simplyretsAPIResolvers = require('./datasources/simplyrets_resolvers');

const username = 'simplyrets';
const password = 'simplyrets';
const authToken =  { authToken: Buffer.from(`${username}:${password}`).toString('base64') }

const server = new ApolloServer({
	typeDefs,
	dataSources: () => ({
		simplyretsAPI: new SimplyretsAPI(authToken)
	}),
	context: async ({ req }) => {
		// do something here to get user creds
	},
	resolvers: [simplyretsAPIResolvers],
	healthCheckPath: null,
	debug: true
});

server.listen().then(() => {
	console.log(`
		Server is running!
		Listening on port 4000
		Explore at https://studio.apollographql.com/sandbox
	`);
});

module.exports = server;