import { CheckoutItem } from "../src/checkout";
import PricingRules from "../src/pricing-rules";
import { DiscountMock } from "./mocks";

const checkoutItemMock = new CheckoutItem(0);

describe('PricingRules test', () => {

    test('PricingRules methods tests', () => {
        const discount = new DiscountMock();
        const checkDiscountRules = jest.spyOn(discount, 'checkDiscountRules');
        const calculateDiscount = jest.spyOn(discount, 'calculateDiscount');
        const setDiscount = jest.spyOn(checkoutItemMock, 'setDiscount');

        const pricingRules = new PricingRules([discount]);

        pricingRules.applyDiscount('sku', checkoutItemMock);
        
        expect(checkDiscountRules).toBeCalledWith(checkoutItemMock);
        expect(calculateDiscount).toBeCalledWith(checkoutItemMock);
        expect(setDiscount).toBeCalledWith(0);
    })
});