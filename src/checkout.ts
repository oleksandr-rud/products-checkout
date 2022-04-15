import Product from "./product";
import PricingRules from "./pricing-rules";

// Checkout class
export default class Checkout {
    private products: Product[] = [];
    constructor(protected readonly pricingRules: PricingRules){}

    scan(product: Product): void {
        this.products.push(product);
    }

    total(): number {
        const productsBySCU = this.products.reduce((acc, product) => {
            if (acc.has(product.sku)) {
                acc.get(product.sku).push(product)
            } else {
                acc.set(product.sku, [product]);
            }

            return acc;
        }, new Map<string, Product[]>());

        return Array.from(productsBySCU.entries()).reduce((acc, [sku, products]) => {         
            if (this.pricingRules.hasDiscount(sku)) {
                return acc + this.pricingRules.calculateProductsPrice(products) + this.pricingRules.getDiscount(sku, products);;    
            } else {
                return acc + this.pricingRules.calculateProductsPrice(products);
            }
         }, 0);;
    }
}