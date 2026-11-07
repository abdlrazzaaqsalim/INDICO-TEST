class InventoryPage {
  constructor(page) {
    this.page = page;
    this.title = page.locator('[data-test="title"]');
    this.cartLink = page.locator('[data-test="shopping-cart-link"]');
    this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
  }

  
  async addItemToCart(itemName) { // Klik "Add to cart" pada produk berdasarkan nama, mis. 'Sauce Labs Onesie'

    const item = this.page.locator('[data-test="inventory-item"]', { hasText: itemName });
    await item.getByRole('button', { name: 'Add to cart' }).click();
    
  }

  async goToCart() {
    await this.cartLink.click();
  }
}

module.exports = { InventoryPage };
