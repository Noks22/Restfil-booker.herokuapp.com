import { test, expect } from '@playwright/test';
import { BookingPayloads } from '../lib/builders/BookingPayloads.js';
import { createToken } from '../lib/services/authService.js';
import {ApiRequests} from '../lib/services/apiRequests.js';

test('Update Existing Booking', async () => {
    // 1) Create a booking first (so we have an ID)

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

    const id = responseBody.bookingid;
    console.log(' booking id:', id);

    // 2) Full update (PUT replaces the entire booking object)
    const updatePayload = {
        firstname: 'Jane',
        lastname: 'Doe',
        totalprice: 500,
        depositpaid: false,
        bookingdates: { checkin: '2025-12-01', checkout: '2025-12-10' },
        additionalneeds: 'Late checkout'
    };
    console.log({updatePayload});
    const { status: putStatus, responseBody: updated } =
        await apiReq.putRequest(`${process.env.API_AUTH_ENDPOINT}/booking/${id}`, updatePayload);

    // 3) Assertions 
    expect(putStatus).toBe(200);
    expect(updated.firstname).toBe(updatePayload.firstname);
    expect(updated.lastname).toBe(updatePayload.lastname);
    expect(updated.totalprice).toBe(updatePayload.totalprice);
    expect(updated.depositpaid).toBe(updatePayload.depositpaid);
    expect(updated.bookingdates.checkin).toBe(updatePayload.bookingdates.checkin);
    expect(updated.bookingdates.checkout).toBe(updatePayload.bookingdates.checkout);
    expect(updated.additionalneeds).toBe(updatePayload.additionalneeds);

    console.log('Updated booking:', updated);

});