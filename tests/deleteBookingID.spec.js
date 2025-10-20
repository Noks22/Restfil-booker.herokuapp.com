import { test, expect, request } from '@playwright/test';
import { createToken } from '../lib/services/authService.js';
import {ApiRequests} from '../lib/services/apiRequests.js';

// test('Delete Already Deleted Booking by ID', async () => {

//     const apiReq = new ApiRequests();

//     const { tokenData, tokenStatus } = await createToken();
//     const token = await tokenData.token;

//     console.log('Using token:', token);


//     const { status, responseBody } = await apiReq.deleteRequest(`${process.env.API_AUTH_ENDPOINT}/booking/99`, {
//         headers: {
//             'Content-Type': 'application/json',
//             'Cookie': `token=${token}`, // required
//             // 'Accept': 'application/json'
//         }
//     });

//     console.log('responseBody:', responseBody);
//     console.log('Status:', status);
//     const body = await responseBody.text();

//     // assert success
//     expect(responseBody.status()).toBe(201);
//     expect(body).toBe('Created'); // API responds "Created" on successful delete

//     console.log('Booking deleted successfully');



// });




test.describe("Delete booking by ID API tests", () => {
    let id = 0;
    test.beforeAll(async () => {
        console.log("------------------------------------Create Booking ID--------------------------------");
        const payload = (
            {
                firstname: 'James',
                lastname: 'Bond',
                totalprice: 294,
                depositpaid: '357',
                bookingdates: { checkin: '2025-10-19', checkout: '2026-10-02' },
                additionalneeds: 'None'
            }
        );

        console.log('Payload:', payload);

        const apiReq = new ApiRequests();

        const { status, responseBody } = await apiReq.postRequest(`${process.env.API_AUTH_ENDPOINT}/booking/`, payload);

        console.log(JSON.stringify(responseBody, null, 2),);

        expect(responseBody).toHaveProperty('bookingid');
        expect(typeof responseBody.bookingid).toBe('number');

        expect(responseBody).toHaveProperty('booking');
        expect(responseBody.booking).toMatchObject({
            firstname: payload.firstname,
            lastname: payload.lastname,
            totalprice: payload.totalprice,
            depositpaid: true,
            additionalneeds: payload.additionalneeds,
            bookingdates: {
                checkin: payload.bookingdates.checkin,
                checkout: payload.bookingdates.checkout
            }
        });
        id = responseBody.bookingid;
        console.log(' booking id:', id);
    });

    test('Delete by Booking ID', async () => {
        
         const apiReq = new ApiRequests();

    const { tokenData, tokenStatus } = await createToken();
    const token = await tokenData.token;

    console.log('Using token:', token);


    const { status, responseBody } = await apiReq.deleteRequest(`${process.env.API_AUTH_ENDPOINT}/booking/${id}`, {
        headers: {
            'Content-Type': 'application/json',
            'Cookie': `token=${token}`, 
            // 'Accept': 'application/json'
        }
    });

    console.log('responseBody:', responseBody);
    console.log('Status:', status);
    const body = await responseBody.text();

    // assert success
    expect(responseBody.status()).toBe(201);
    expect(body).toBe('Created'); // API responds "Created" on successful delete

    console.log('Booking deleted successfully');


       

    });

});
