const supertest = require("supertest");

require("dotenv").config();

async function generateToken(username, password) {
	const headers = {
		"Content-Type": "application/json"
	};

	const payload = {
		"userName": username,
		"password": password
	};

	try {
		const res = await supertest(process.env.BASE_URL)
			.post(process.env.GENERATE_TOKEN)
			.set(headers)
			.send(payload);

		return res.body.token;
	} catch (error) {
		console.log(error);
	}
}

module.exports = {
	generateToken
};