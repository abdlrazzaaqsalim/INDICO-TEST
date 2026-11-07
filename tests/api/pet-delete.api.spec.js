const { test, expect } = require('@playwright/test');

const BASE_URL = 'https://petstore.swagger.io/v2';
const PET_ID = 1794027640; // id yang sama dengan contoh curl

test.describe('Petstore API - DELETE /pet/{petId}', () => {
  test.beforeAll(async ({ request }) => {
    
    const res = await request.post(`${BASE_URL}/pet`, { // Siapkan data: pastikan pet dengan PET_ID ada sebelum dihapus
      headers: { accept: 'application/json', 'Content-Type': 'application/json' },
      data: {
        id: PET_ID,
        category: { id: 0, name: 'string' },
        name: 'doggie',
        photoUrls: ['string'],
        tags: [{ id: 0, name: 'string' }],
        status: 'available',
      },
    });
    expect(res.status()).toBe(200);
  });

  test('Delete an existing pet', async ({ request }) => {
    const response = await request.delete(`${BASE_URL}/pet/${PET_ID}`, {
      headers: { accept: 'application/json' },
    });

    expect(response.status()).toBe(200); // Status code

    const body = await response.json(); // Petstore mengembalikan id pet yang dihapus pada field "message"
    expect(body.code).toBe(200);
    expect(body.message).toBe(String(PET_ID));

    const getResponse = await request.get(`${BASE_URL}/pet/${PET_ID}`, { // Verifikasi: pet sudah tidak ditemukan
      headers: { accept: 'application/json' },
    });
    expect(getResponse.status()).toBe(404);
  });
});
