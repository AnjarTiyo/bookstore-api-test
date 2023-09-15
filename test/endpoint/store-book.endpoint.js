import supertest from "supertest";
import { deleteBookCollection } from "./delete-book.endpoint";

import dotenv from 'dotenv';
dotenv.config();

export async function storeBook(basicToken, userId, isbn, safeMode = false) {
    const headers = {
        "Content-Type": "application/json",
        "accept": "application/json",
        "authorization": "Basic " + basicToken
    };

    const payload = {
        "userId": userId,
        "collectionOfIsbns": [
            {
                "isbn": isbn
            }
        ]
    };

    try {
        if (safeMode) await deleteBookCollection(basicToken, userId);
        return await supertest(process.env.BASE_URL)
            .post(process.env.BOOKSTORE)
            .set(headers)
            .send(payload);

    } catch (error) {
        console.error(error);
    }
}