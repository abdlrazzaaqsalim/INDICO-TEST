const { test, expect } = require('@playwright/test');

const BASE_URL = 'https://petstore.swagger.io/v2';

test.describe('Petstore API - GET /pet/findByStatus', () => {
  test('Find pets by status = pending', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/pet/findByStatus`, {
      headers: { accept: 'application/json' },
      params: { status: 'pending' },
    });

    expect(response.status()).toBe(200); // Status code
    expect(response.headers()['content-type']).toContain('application/json');

    // Response body harus berupa array
    const pets = await response.json();
    expect(Array.isArray(pets)).toBe(true);

    for (const pet of pets) { // Semua pet yang dikembalikan harus berstatus 'pending'
      expect(pet.status).toBe('pending');
      expect(pet).toHaveProperty('id');
      expect(pet).toHaveProperty('photoUrls');
    }
  });
});
