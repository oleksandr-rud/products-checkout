import Product from '../src/product';

test('Product class', () => { 
    const product = new Product('Apple TV', 'atv', 109.50);
    expect(product.name).toBe('Apple TV');
    expect(product.sku).toBe('atv');
    expect(product.price).toBe(109.50);
})