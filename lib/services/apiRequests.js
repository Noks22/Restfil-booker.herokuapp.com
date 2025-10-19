import { request } from '@playwright/test';
import { createToken } from '../../lib/services/authService.js';

class ApiRequests {

    constructor() {

    }



    async postRequest(endpoint, theData) {
        try {
            const apiRequestContext = await request.newContext();
            const header = {
                'Content-Type': "application/json"
            };
            const response = await apiRequestContext.post(endpoint, {
                data: JSON.stringify(theData, null, 2),
                headers: header
            });
            const status = response.status();
            const responseBody = await response.json();
            return { status, responseBody };
        } catch (error) {
            console.error('Error making POST request:', error);
            return { status: null, responseBody: null, error: error.message }

        }


    }
    async getRequest(endpoint) {
        try {
            const apiRequestContext = await request.newContext();

            const response = await apiRequestContext.get(endpoint);
            const status = response.status();
            const responseBody = await response.json();
            return { status, responseBody };
        } catch (error) {
            console.error('Error making POST request:', error);
            return { status: null, responseBody: null, error: error.message }

        }


    }

    async putRequest(endpoint, theData) {
        try {
            const api = await request.newContext();
            const { tokenData, tokenStatus } = await createToken();
            const token = tokenData.token
            const res = await api.put(endpoint, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Cookie': `token=${token}`, // token required for updates
                },
                data: theData,
            });

            const status = res.status();
            const responseBody = await res.json();
            return { status, responseBody };
        } catch (error) {
            console.error('Error making PUT request:', error);
            return { status: null, responseBody: null, error: error.message };
        }
    }

    async deleteRequest(endpoint) {
        try {
            const api = await request.newContext();
            const { tokenData, tokenStatus } = await createToken();
            const token = await tokenData.token;
            const responseBody = await api.delete(endpoint, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Cookie': `token=${token}`,
                }
            });

            const status = responseBody.status();
            const responseText = await responseBody.text();
            return { status, responseBody };
        } catch (error) {
            console.error('Error making DELETE request:', error);
            return { status: null, responseText: null, error: error.message };
        }
    }


}
module.exports = { ApiRequests }