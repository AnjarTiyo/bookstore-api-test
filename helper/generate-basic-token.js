async function generateBasicToken(username, password) {
    try {
        return Buffer.from(`${username}:${password}`).toString('base64');
    } catch (error) {
        console.error(error);
    }
}

module.exports = {
    generateBasicToken
}