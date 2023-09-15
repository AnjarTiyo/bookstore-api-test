const supertest = require("supertest");

require("dotenv").config();

async function getListAccountsBook(basicToken, userId) {
	const headers = {
		"authorization": "Basic " + basicToken
	};

	try {
		return await supertest(process.env.BASE_URL)
			.get(process.env.USERACCOUNT + userId)
			.set(headers);
	} catch (error) {
		console.log(error);
	}
}

module.exports = {
	getListAccountsBook
};