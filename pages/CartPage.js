class CartPage {
  constructor(page) {
    this.page = page;
    this.title = page.locator('[data-test="title"]');
    this.cartItems = page.locator('[data-test="inventory-item"]');
    this.checkoutButton = page.locator('[data-test="checkout"]');
  }

  itemByName(name) {

    return this.page.locator('[data-test="inventory-item"]', { hasText: name });
  }

  async proceedToCheckout() {
    
    await this.checkoutButton.click();
  }
}

module.exports = { CartPage };
