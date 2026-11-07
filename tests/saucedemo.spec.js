const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { InventoryPage } = require('../pages/InventoryPage');
const { CartPage } = require('../pages/CartPage');
const { CheckoutPage } = require('../pages/CheckoutPage');

const USERNAME = 'standard_user';
const PASSWORD = 'secret_sauce';
const ITEM = 'Sauce Labs Onesie';

test.describe('Saucedemo', () => {
  test('Login - berhasil dengan standard_user', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    await loginPage.goto();
    await loginPage.login(USERNAME, PASSWORD);

    await expect(page).toHaveURL(/inventory\.html/);
    await expect(inventoryPage.title).toHaveText('Products');
  });

  test('Login - gagal dengan locked_out_user', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login('locked_out_user', PASSWORD);

    await expect(loginPage.errorMessage).toContainText('this user has been locked out');
  });

  test('E2E Checkout Flow - Sauce Labs Onesie', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    await loginPage.goto(); // Login
    await loginPage.login(USERNAME, PASSWORD);
    await expect(inventoryPage.title).toHaveText('Products');

    await inventoryPage.addItemToCart(ITEM); // Add item 'Sauce Labs Onesie' to cart
    await expect(inventoryPage.cartBadge).toHaveText('1');

    await inventoryPage.goToCart(); // Go to cart
    await expect(page).toHaveURL(/cart\.html/);
    await expect(cartPage.title).toHaveText('Your Cart');
    await expect(cartPage.itemByName(ITEM)).toBeVisible();

    await cartPage.proceedToCheckout(); // Proceed checkout
    await expect(page).toHaveURL(/checkout-step-one\.html/);
    await checkoutPage.fillInformation('juan', 'test', '112');

    await expect(page).toHaveURL(/checkout-step-two\.html/);
    await expect(checkoutPage.title).toHaveText('Checkout: Overview');
    await checkoutPage.finish();

    await expect(page).toHaveURL(/checkout-complete\.html/); // Ensure that the checkout process is completed
    await expect(checkoutPage.title).toHaveText('Checkout: Complete!');
    await expect(checkoutPage.completeHeader).toHaveText('Thank you for your order!');
    await expect(checkoutPage.completeText).toContainText('Your order has been dispatched');
  });
});
