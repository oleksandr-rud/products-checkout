import { Discount } from "./discount";
import Product from "./product";

export default class PricingRules {
    private readonly discountsMap: Map<string, Discount>;

    constructor(
        discounts: Discount[]
    ) {
        this.discountsMap = new Map<string, Discount>();
        discounts.forEach(discount => this.discountsMap.set(discount.productSKU, discount));
    }


    hasDiscount(sku: string): boolean { 
        return this.discountsMap.has(sku);
    }

    getDiscount(sku: string, products: Product[]): number {
        const discount = this.discountsMap.get(sku).calculateDiscount(products);
        console.log('sku', sku);
        console.log('products', products);
        console.log('discount', discount);
        return this.discountsMap.get(sku).calculateDiscount(products);
    }

    calculateProductsPrice(products: Product[]): number {
        return products.reduce((acc, product) => acc + product.price, 0);
    }
}