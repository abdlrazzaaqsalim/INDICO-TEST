const { test, expect } = require('@playwright/test');

const BASE_URL = 'https://petstore.swagger.io/v2';

test.describe('Petstore API - POST /pet', () => {
  let createdPetId;

  const payload = {
    id: 0,
    category: { id: 0, name: 'string' },
    name: 'doggie',
    photoUrls: ['string'],
    tags: [{ id: 0, name: 'string' }],
    status: 'available',
  };

  test('Add a new pet to the store', async ({ request }) => {
    const response = await request.post(`${BASE_URL}/pet`, {
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
      },
      data: payload,
    });

    expect(response.status()).toBe(200); // Status code
    expect(response.headers()['content-type']).toContain('application/json');

    const body = await response.json(); // Response body
    createdPetId = body.id;

    expect(body.id).toBeGreaterThan(0); // id 0 di-generate ulang oleh server
    expect(body.name).toBe(payload.name);
    expect(body.status).toBe(payload.status);
    expect(body.category).toEqual(payload.category);
    expect(body.photoUrls).toEqual(payload.photoUrls);
    expect(body.tags).toEqual(payload.tags);
  });

  test.afterAll(async ({ request }) => {
    if (createdPetId) { // Cleanup data yang dibuat test
      await request.delete(`${BASE_URL}/pet/${createdPetId}`);
    }
  });
});
