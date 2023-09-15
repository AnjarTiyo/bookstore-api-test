import dotenv from 'dotenv';
dotenv.config();

import { generateBasicToken } from '../helpers/generate-basic-token';
import { storeBook } from '../endpoint/store-book.endpoint';
import { deleteBookCollection } from '../endpoint/delete-book.endpoint';
import { getListofBooks } from '../endpoint/list-of-book.endpoint.cjs';

describe("Feature: Delete account's recorded books data", () => {
	let basicToken, userId;

	before(async () => {
		basicToken = await generateBasicToken(process.env.USERNAME, process.env.PASSWORD);
		userId = process.env.UUID;
	});

	afterEach(async () => {
		await storeBook(basicToken, userId, await getListofBooks()[1]);
	});

	it("Delete valid stored book", async () => {
		const res = await deleteBookCollection(basicToken, userId);

		expect(res.status).toBe(204);
	});

	it("Delete already deleted stored book", async () => {
		await deleteBookCollection(basicToken, userId);

		const res = await deleteBookCollection(basicToken, userId);

		expect(res.status).toBe(400);
		expect(res.body.message).toBe("Book data already empty!");
	});

	it("Delete stored book with invalid token", async () => {
		const res = await deleteBookCollection("invalid-token", userId);

		expect(res.status).toBe(401);
		expect(res.body.code).toBe("1200");
		expect(res.body.message).toBe("User not authorized!");
	});

	it("Delete stored book of invalid/unexisting user", async () => {
		const res = await deleteBookCollection(basicToken, "invalid-user");

		expect(res.status).toBe(401);
		expect(res.body.code).toBe("1207");
		expect(res.body.message).toBe("User Id not correct!");
	});

});