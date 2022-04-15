import { CheckoutItem } from "./checkout";
import { Discount } from "./discount";

export default class PricingRules {
    private readonly discountsMap: Map<string, Discount>;

    constructor(
        discounts: Discount[]
    ) {
        this.discountsMap = new Map<string, Discount>();
        discounts.forEach(discount => this.discountsMap.set(discount.productSKU, discount));
    }

    applyDiscount(sku: string, checkoutItem: CheckoutItem): void {
        const discount = this.discountsMap.get(sku);
        if (discount.checkDiscountRules(checkoutItem)) {
            checkoutItem.setDiscount(discount.calculateDiscount(checkoutItem));
        }
        console.log('checkoutItem', checkoutItem)
    }
}