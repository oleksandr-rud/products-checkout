import Product from "./product";
import PricingRules from "./pricing-rules";

export class CheckoutItem {
    public quantity: number
    public itemPrice: number
    public discount: number

    constructor(
        itemPrice: number
    ) {
        this.itemPrice = itemPrice;
        this.quantity = 0;
        this.discount = 0;
    }

    addItem(): void {
        this.quantity = this.quantity + 1;
    }

    getTotalPrice(): number {
        return (this.quantity * this.itemPrice) - this.discount;
    }

    setDiscount(discount: number): void {
        this.discount = discount;
    }
}

// Checkout class
export default class Checkout {
    private products: Product[] = [];
    private checkoutProductsMap: Map<string, CheckoutItem>;

    constructor(protected readonly pricingRules: PricingRules) {
        this.checkoutProductsMap = new Map();
    }

    private addCheckoutItem(product: Product): void {
        if (!this.checkoutProductsMap.has(product.sku)) {
            this.checkoutProductsMap.set(product.sku, new CheckoutItem(product.price));
        }
        this.getCheckoutItem(product.sku).addItem();
    }

    private getCheckoutItem(sku: string): CheckoutItem {
        return this.checkoutProductsMap.get(sku);
    }

    scan(product: Product): void {
        this.addCheckoutItem(product);
        this.pricingRules.applyDiscount(product.sku, this.getCheckoutItem(product.sku));
        this.products.push(product);
    }

    total(): number {
        let total = 0;
        for (const checkoutItem of this.checkoutProductsMap.values()) { 
            total += checkoutItem.getTotalPrice();
        }
        return total;
    }
}