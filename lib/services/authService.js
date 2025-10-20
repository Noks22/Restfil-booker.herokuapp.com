import { request } from '@playwright/test';

async function createToken() {

    let contextRequest;

    try {
        contextRequest = await request.newContext();
        const BASE_URL = process.env.API_AUTH_ENDPOINT;
        const AUTH_URL = `${BASE_URL.replace(/\/+$/, '')}/auth`;

        const USERNAME = process.env.API_AUTH_CLIENT_USERNAME;
        const PASSWORD = process.env.API_AUTH_CLIENT_PASSWORD;


        const tokenResponse = await contextRequest.post(AUTH_URL, {
            headers: {

                'Content-Type': 'application/json',
            },

            data: {
                username: USERNAME,
                password: PASSWORD,
            }
        });

        const tokenData = await tokenResponse.json()
        const tokenStatus =  tokenResponse.status()
        console.log({ tokenStatus });

        return {tokenData,tokenStatus};
    }
    catch (error) {
        console.error('An error occurred:', error);
        throw error;
    }
    finally {

    }
}

module.exports = { createToken }