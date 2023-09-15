require('dotenv').config();

const { generateToken } = require("../endpoint/generate-token.endpoint");
const { getIsbnList } = require("../endpoint/list-of-book.endpoint");
const storeBook = require("../endpoint/store-book.endpoint");
const { generateBasicToken } = require("../helper/generate-basic-token");

let validToken, listOfBook, basicToken, validUuid;

describe('Feature: POST Store Book to User', () => {
    beforeAll(async () => {
        // validToken = await generateToken(process.env.USERNAME, process.env.PASSWORD);
        basicToken = await generateBasicToken(process.env.USERNAME, process.env.PASSWORD);
        listOfBook = await getIsbnList();
        validUuid = process.env.UUID;
    });

    it('Store valid isbn book', async () => {
        const res = await storeBook(basicToken, validUuid, listOfBook[1], true);

        expect(res.status).toBe(201);
        expect(res.body.books[0].isbn).toEqual(listOfBook[1]);
    });

    it('Store already stored isbn', async () => {
        await storeBook(basicToken, validUuid, listOfBook[0], false);

        const res = await storeBook(basicToken, validUuid, listOfBook[0], false);

        expect(res.status).toBe(400);
        expect(res.body.code).toBe('1210');
        expect(res.body.message).toBe('ISBN already present in the User\'s Collection!');
    });

    it('Store unexisting isbn', async () => {
        const res = await storeBook(basicToken, validUuid, '0'.repeat(13));

        expect(res.status).toBe(400);
        expect(res.body.code).toBe('1205');
        expect(res.body.message).toBe('ISBN supplied is not available in Books Collection!')
    });

    it('Store a book to an invalid UUID', async () => {
        const res = await storeBook(basicToken, 'invalid-uuid', listOfBook[1]);

        expect(res.status).toBe(401);
        expect(res.body.code).toBe('1207');
        expect(res.body.message).toBe('User Id not correct!');
    });

    it('Store a book with invalid authorization', async () => {
        const res = await storeBook('invalid-token', validUuid, listOfBook[2]);

        expect(res.status).toBe(401);
        expect(res.body.code).toBe('1200');
        expect(res.body.message).toBe('User not authorized!');
    });
})