import { CheckoutItem } from "../src/checkout";
import { AppleTVDiscount, IPadDiscount } from "../src/discount";

const appleTVPrice = 109.50;
const iPadPrice = 549.99;
const iPadPriceWithDiscount = 499.99;

describe('Discount test', () => {

    test('AppleTVDiscount checkRules test', () => {
        const discount = new AppleTVDiscount();
        const checkoutItem = new CheckoutItem(appleTVPrice);

        checkoutItem.addItem();
        checkoutItem.addItem();
        
        expect(discount.checkDiscountRules(checkoutItem)).toBe(false);
        
        checkoutItem.addItem();

        expect(discount.checkDiscountRules(checkoutItem)).toBe(true);
    })

    test('AppleTVDiscount calculate discount test', () => {
        const discount = new AppleTVDiscount();
        const checkoutItem = new CheckoutItem(appleTVPrice);

        checkoutItem.addItem();
        checkoutItem.addItem();
        checkoutItem.addItem();        
        
        expect(discount.checkDiscountRules(checkoutItem)).toBe(true);

        expect(discount.calculateDiscount(checkoutItem)).toBe(appleTVPrice);
    })


    test('IPadDiscount checkRules test', () => {
        const discount = new IPadDiscount();
        const checkoutItem = new CheckoutItem(iPadPrice);

        checkoutItem.addItem();
        checkoutItem.addItem();
        checkoutItem.addItem();

        expect(discount.checkDiscountRules(checkoutItem)).toBe(false);
        
        checkoutItem.addItem();

        expect(discount.checkDiscountRules(checkoutItem)).toBe(true);
    })

    test('IPadDiscount calculate discount test', () => {
        const discountAmountPerItem = iPadPrice - iPadPriceWithDiscount;
        const discount = new IPadDiscount();
        const checkoutItem = new CheckoutItem(iPadPrice);

        checkoutItem.addItem();
        checkoutItem.addItem();
        checkoutItem.addItem();
        checkoutItem.addItem();
        
        expect(discount.checkDiscountRules(checkoutItem)).toBe(true);

        expect(discount.calculateDiscount(checkoutItem)).toBe(discountAmountPerItem * 4);
    })
});