import Checkout, {CheckoutItem} from '../src/checkout';
import PricingRules from '../src/pricing-rules';
import Product from '../src/product';
import { DiscountMock } from './mocks';

const productMock1 = new Product('Product', 'sku', 100);
const productMock2 = new Product('Product', 'sku', 100);

describe('Checkout test', () => {

    test('Checkout methods test', () => {
        const pricingRules = new PricingRules([new DiscountMock()]);
        const applyDiscount = jest.spyOn(pricingRules, 'applyDiscount');

        const checkout = new Checkout(pricingRules);

        checkout.scan(productMock1);
        
        expect(applyDiscount).toBeCalled();
        
        checkout.scan(productMock2);

        expect(checkout.total()).toBe(200);
    })

    test('Checkout Item methods test', () => {
        const checkoutItem = new CheckoutItem(109.50);
        expect(checkoutItem.itemPrice).toBe(109.50);
        expect(checkoutItem.getTotalPrice()).toBe(0);
        expect(checkoutItem.quantity).toBe(0);
        expect(checkoutItem.discount).toBe(0);

        checkoutItem.addItem();
        expect(checkoutItem.quantity).toBe(1);
        expect(checkoutItem.getTotalPrice()).toBe(109.50);

        checkoutItem.setDiscount(10);
        expect(checkoutItem.discount).toBe(10);
        expect(checkoutItem.getTotalPrice()).toBe(99.50);
    })
});