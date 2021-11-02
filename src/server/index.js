require('dotenv').config();
const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const { ApolloServer } = require('apollo-server');

const typeDefs = require('./schema');
const SimplyretsAPI = require('./datasources/simplyrets');
const simplyretsAPIResolvers = require('./datasources/simplyrets_resolvers');
const { users, acl } = require('./users/__mocks__/users');
const auth = require('./auth');

app.use(express.json());

// development tokens, ensure prod tokens are placed into the .env
const username = 'simplyrets';
const password = 'simplyrets';
const authToken =  { authToken: Buffer.from(`${username}:${password}`).toString('base64') }

let accessToken;
app.get('/login', (req, res) => {
	// Authenticate User (static for assignment)
	if (!process.env.ACCESS_TOKEN_SECRET)
		throw 'INVALID_TOKEN: Generate a new token by calling "npm run setup"';

	accessToken = jwt.sign(users[0], process.env.ACCESS_TOKEN_SECRET);	
	res.json({ accessToken: accessToken });
});

const server = new ApolloServer({
	typeDefs,
	dataSources: () => ({
		simplyretsAPI: new SimplyretsAPI(authToken)
	}),
	context: auth,
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

app.listen(3000);
module.exports = server;