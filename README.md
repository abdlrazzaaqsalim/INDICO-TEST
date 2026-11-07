# Saucedemo Playwright Automation

Automation test (Playwright + JavaScript, Page Object Model)

## API Test (Saucedemo)
1. **Login** — berhasil (`standard_user`) dan gagal (`locked_out_user`)
2. **E2E Checkout Flow**
   - Login
   - Add item `Sauce Labs Onesie` ke cart
   - Go to Cart
   - Proceed Checkout (isi info: juan / test / 112)
   - Finish dan pastikan checkout selesai ("Thank you for your order!")
  
## REPORT Test (Saucedemo)
![Alt text](assets-report/saucedemo/Screenshot 2026-11-07 162209.png)

## API Test (Petstore)
`tests/api/pet.api.spec.js` — `POST https://petstore.swagger.io/v2/pet`
- Cek status 200 dan content-type JSON
- Cek body respons (id ter-generate, name, status, category, photoUrls, tags)
- Data yang dibuat dihapus lagi (cleanup) setelah test

`tests/api/pet-find-by-status.api.spec.js` — `GET https://petstore.swagger.io/v2/pet/findByStatus?status=pending`
- Cek status 200 dan content-type JSON
- Cek respons berupa array dan semua pet berstatus `pending`

`tests/api/pet-delete.api.spec.js` — `DELETE https://petstore.swagger.io/v2/pet/1794027640`
- Sebelum test, pet dengan id tersebut dibuat dulu (agar test tidak bergantung pada data yang mungkin sudah hilang)
- Cek status 200 dan `message` berisi id pet yang dihapus
- Verifikasi `GET /pet/{id}` sesudahnya mengembalikan 404

## REPORT Test (Petstore)


## Menjalankan
```bash
npm install
npx playwright install chromium
npm run test:api       # hanya API test
npm run test:ui-e2e    # hanya UI test saucedemo
npm run test:headed   # lihat browser
npm run report        # buka HTML report
```

