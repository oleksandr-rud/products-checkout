import { CheckoutItem } from "../src/checkout";
import { Discount } from "../src/discount";

export class DiscountMock implements Discount {
    productSKU = 'sku';
    checkDiscountRules(checkoutItem: CheckoutItem): boolean {
        return true;
    }
    calculateDiscount(checkoutItem: CheckoutItem): number {
        return 0;
    }
}

