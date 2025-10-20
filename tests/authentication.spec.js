import { test, expect } from '@playwright/test';
import { BookingPayloads } from '../lib/builders/BookingPayloads.js';
import { createToken } from '../lib/services/authService.js';
import {ApiRequests} from '../lib/services/apiRequests.js';

test('test Token', async () => {
    console.log('Testing token');
    const { tokenData, tokenStatus } = await createToken();
    console.log(tokenData);

    // Assert the status
    expect(tokenStatus).toBe(200);

    // Assert token exists and is a string
    expect(tokenData).toHaveProperty('token');
    expect(typeof tokenData.token).toBe('string');
    expect(tokenData.token.length).toBeGreaterThan(0);

    console.log(' Token and status assertions passed');
});