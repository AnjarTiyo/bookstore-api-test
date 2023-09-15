require('dotenv').config();

const { generateToken } = require("./endpoint/generate-token.endpoint");

const config = {
    validToken: async () => {
        return await generateToken(process.env.USERNAME, process.env.PASSWORD) 
    }
}

module.exports = config;