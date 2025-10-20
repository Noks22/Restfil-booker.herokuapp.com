import { test, expect } from '@playwright/test';
import { BookingPayloads } from '../lib/builders/BookingPayloads.js';
import { createToken } from '../lib/services/authService.js';
import {ApiRequests} from '../lib/services/apiRequests.js';

test('Create Booking Automatically', async () => {
    const payload = new BookingPayloads().createBookingPayload();

    console.log('Payload:', payload);

    const apiReq = new ApiRequests();

    const { status, responseBody } = await apiReq.postRequest(`${process.env.API_AUTH_ENDPOINT}/booking/`, payload);

    console.log(JSON.stringify(responseBody, null, 2),);

});
test('Create Booking by passing data', async () => {
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


});