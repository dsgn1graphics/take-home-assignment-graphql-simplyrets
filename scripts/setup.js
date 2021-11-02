#!/usr/env/node
/**
 * Setup.js
 * This file should be called once prior to starting
 * the server for the first time. It will generate 
 * required tokens for access. To reset tokens, delete .env
 * file and rerun this script. 
 * Caution: regenerating the .env file will also kill all 
 * active user sessions.
 */
 require('dotenv').config();
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');

const generateToken = () => {
	return crypto.randomBytes(64).toString('hex');
}

if (!fs.existsSync(path.join(root, '.env'))) {
	const fd = fs.openSync(path.join(root, '.env'), 'w+');
	const envVar = 'ACCESS_TOKEN_SECRET=' 
		+ generateToken() + "\n"
		+ 'REFRESH_TOKEN_SECRET=' + generateToken() + "\n";
	fs.writeSync(fd, envVar, 0, 'utf-8');
	fs.closeSync(fd);
}
