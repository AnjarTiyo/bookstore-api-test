const supertest = require('supertest');
const { deleteBookCollection } = require('./delete-book.endpoint');

require('dotenv').config();

async function storeBook(basicToken, UUID, isbn, safeMode = false) {
    const headers = {
        'Content-Type': 'application/json',
        'accept': 'application/json',
        'authorization': 'Basic ' + basicToken
    };

    const payload = {
        'userId': UUID,
        'collectionOfIsbns': [
            {
                "isbn": isbn
            }
        ]
    };

    try {
        if (safeMode) {
            console.log('Deleting data ...')
            await deleteBookCollection(basicToken, UUID);
        }

        return await supertest(process.env.BASE_URL)
            .post(process.env.BOOKSTORE)
            .set(headers)
            .send(payload);

    } catch (error) {
        console.log(error)
    }
}

module.exports = storeBook