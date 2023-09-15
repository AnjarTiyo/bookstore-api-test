import dotenv from 'dotenv';
dotenv.config();

import supertest from "supertest";

export async function deleteBookCollection(token, userId) {
	const headers = {
		"authorization": "Basic " + token,
		"accept": "application/json"
	};

	const query = {
		"UserId": userId
	};

	try {
		return await supertest(process.env.BASE_URL)
			.delete(process.env.BOOKSTORE)
			.set(headers)
			.query(query);
	} catch (error) {
		console.log(error);
	}
}

