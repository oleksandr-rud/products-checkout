type Discounts = Map<string, (products: Product[]) => number>;

// Class for pricing rules
export class PricingRules {
    constructor(
        private discounts: Discounts = new Map()
    ) {}


    hasDiscount(sku: string): boolean { 
        return this.discounts.has(sku);
    }

    calculateProductsPriceWithDiscount(sku: string, products: Product[]): number {
        return this.discounts.get(sku)(products);
    }

    calculateProductsPrice(products: Product[]): number {
        return products.reduce((acc, product) => acc + product.price, 0);
    }
}

// Product class
export class Product {
    sku: string;
    name: string;
    price: number;

    constructor(name: string, sku: string, price: number) {
        this.name = name;
        this.sku = sku;
        this.price = price;
    }
}

// Checkout class
export class Checkout {
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

        console.log(productsBySCU);

        return Array.from(productsBySCU.entries()).reduce((acc, [sku, products]) => {         
            if (this.pricingRules.hasDiscount(sku)) {
                return acc + this.pricingRules.calculateProductsPriceWithDiscount(sku, products);    
            } else {
                return acc + this.pricingRules.calculateProductsPrice(products);
            }
         }, 0);;
    }
}

const discounts: Discounts = new Map([
    ['atv', (products: Product[]) => {
        const [{price: productPrice}] = products;

        if (products.length >= 3) {
            return productPrice * 2 + (products.length - 3) * productPrice;
        } else {
            return productPrice * products.length;
        }
    }],
    ['ipd', (products: Product[]) => {
        const [{price: productPrice}] = products;
        const productPriceWithDiscount = 499.99;

        if (products.length >= 4) {
            return productPriceWithDiscount * products.length;
        } else {
            return productPrice * products.length;
        }
    }]
]);

const item1 = new Product('Apple TV', 'atv', 109.50);
const item2 = new Product('Apple TV', 'atv', 109.50);
const item3 = new Product('Apple TV', 'atv', 109.50);
const item4 = new Product('Apple TV', 'atv', 109.50);
const item5 = new Product('Super iPad', 'ipd', 549.99);
const item6 = new Product('Super iPad', 'ipd', 549.99);
const item7 = new Product('Super iPad', 'ipd', 549.99);
const item8 = new Product('Super iPad', 'ipd', 549.99);

const pricingRules = new PricingRules(discounts);

const co = new Checkout(pricingRules);

co.scan(item1);
co.scan(item2);
co.scan(item3);
co.scan(item4);
co.scan(item5);
co.scan(item6);
co.scan(item7);
co.scan(item8);

co.total();

console.log(co.total())