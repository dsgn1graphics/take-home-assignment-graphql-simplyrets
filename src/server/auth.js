require('dotenv').config();
const jwt = require('jsonwebtoken');

module.exports = async ({ req: { headers } }) => {
	const header = headers.authorization;
	if (!header)
		return { isAuth: false, user: null }

	const token = header.split(' ');
	if (!token)
		return { isAuth: false, user: null }
		
	let decodeToken;
	try {
		decodeToken = jwt.verify(token[1], process.env.ACCESS_TOKEN_SECRET);
	} catch (e) {
		return { isAuth: false, user: null }
	}

	if (!decodeToken)
		return { isAuth: false, user: null }

	return { isAuth: true, user: decodeToken }
}