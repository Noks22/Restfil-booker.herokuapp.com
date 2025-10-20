import { test, expect } from '@playwright/test';
import { BookingPayloads } from '../lib/builders/BookingPayloads.js';
import {ApiRequests} from '../lib/services/apiRequests.js';

test.describe("Get booking by ID API tests", () => {
    let firstTenBookings = [];

    test.beforeAll(async () => {
        console.log("------------------------------------Get all the ID's and store in an array--------------------------------");
        const apiReq = new ApiRequests();

        const { status, responseBody } = await apiReq.getRequest(`${process.env.API_AUTH_ENDPOINT}/booking`);
        console.log({ responseBody });

        firstTenBookings = responseBody.slice(0, 10).map(b => b.bookingid);;
        console.log('First 10 bookings:', firstTenBookings);
    });

    test('Loop through first 10 booking IDs and GET each booking', async () => {
        console.log('Running GET by ID tests for first 10 bookings...');
        const apiReq = new ApiRequests();

        for (const id of firstTenBookings) {
            console.log({id});
            const { status, responseBody } = await apiReq.getRequest(`${process.env.API_AUTH_ENDPOINT}/booking/${id}`);
            console.log(`Booking ${id}:`, responseBody);

        }

    });

});

