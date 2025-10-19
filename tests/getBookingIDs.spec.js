import { test, expect } from '@playwright/test';
import { BookingPayloads } from '../lib/builders/BookingPayloads.js';
const { ApiRequests } = require('../lib/services/apiRequests.js');

test('Get all Booking IDs', async () => {

  const apiReq = new ApiRequests();

  const {status,responseBody} = await apiReq.getRequest(`${process.env.API_AUTH_ENDPOINT}/booking`);
  console.log({ responseBody });

});

