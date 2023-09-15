require("dotenv").config();

const supertest = require("supertest");

// Can be accessed without token
async function getListofBooks() {
	try {
		return await supertest(process.env.BASE_URL)
			.get(process.env.BOOKSTORE);    
	} catch (error) {
		console.log(error);
	}
}

async function getIsbnList(){
	let isbnList = [];
	try {
		const res = await getListofBooks();

		for (let i = 0; i < res.body.books.length; i++) {
			const isbn = res.body.books[i].isbn;
			isbnList.push(isbn);
		}

		return isbnList;
	} catch (error) {
		console.log(error);
	}
}

module.exports = {
	getListofBooks,
	getIsbnList,

};