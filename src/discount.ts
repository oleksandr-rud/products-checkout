import { CheckoutItem } from "./checkout";

export interface Discount {
    productSKU: string;
    checkDiscountRules(checkoutItem: CheckoutItem): boolean;
    calculateDiscount(checkoutItem: CheckoutItem): number;
}

export class AppleTVDiscount implements Discount {
    productSKU = "atv";
    checkDiscountRules(checkoutItem: CheckoutItem): boolean {
        return checkoutItem.quantity >= 3;
    }
    calculateDiscount(checkoutItem: CheckoutItem): number {
        return checkoutItem.itemPrice;
    }
}

export class IPadDiscount implements Discount {
    productSKU = "ipd";
    private readonly priceWithDiscount = 499.99;

    checkDiscountRules(checkoutItem: CheckoutItem): boolean {
        return checkoutItem.quantity >= 4;
    }
    calculateDiscount(checkoutItem: CheckoutItem): number {
        return (checkoutItem.itemPrice - this.priceWithDiscount) * checkoutItem.quantity;
    }
}