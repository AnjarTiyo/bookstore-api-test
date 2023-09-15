import dotenv from 'dotenv';
import supertest from 'supertest';
dotenv.config();

// Can be accessed without token
export async function getListofBooks() {
	try {
		return await supertest(process.env.BASE_URL)
			.get(process.env.BOOKSTORE);    
	} catch (error) {
		console.log(error);
	}
}

export async function getIsbnList(){
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