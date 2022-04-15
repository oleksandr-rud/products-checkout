import Product from './product';
import PricingRules from './pricing-rules';
import Checkout from './checkout';
import { AppleTVDiscount, IPadDiscount } from './discount';

const item1 = new Product('Apple TV', 'atv', 109.50);
const item2 = new Product('Apple TV', 'atv', 109.50);
const item3 = new Product('Apple TV', 'atv', 109.50);
const item4 = new Product('Apple TV', 'atv', 109.50);
const item5 = new Product('Super iPad', 'ipd', 549.99);
const item6 = new Product('Super iPad', 'ipd', 549.99);
const item7 = new Product('Super iPad', 'ipd', 549.99);
const item8 = new Product('Super iPad', 'ipd', 549.99);

const pricingRules = new PricingRules([new AppleTVDiscount, new IPadDiscount]);

const co = new Checkout(pricingRules);

co.scan(item1);
co.scan(item2);
co.scan(item3);
co.scan(item4);
co.scan(item5);
co.scan(item6);
co.scan(item7);
co.scan(item8);


console.log(co.total())