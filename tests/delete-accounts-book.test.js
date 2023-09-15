require("dotenv").config();

const { deleteBookCollection } = require("../endpoint/delete-book.endpoint");
const { getListofBooks } = require("../endpoint/list-of-book.endpoint");
const storeBook = require("../endpoint/store-book.endpoint");
const { generateBasicToken } = require("../helper/generate-basic-token");

describe("Feature: Delete account's recorded books data", () => {
	let basicToken, userId;

	beforeAll(async () => {
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