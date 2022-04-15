import Product from "./product";

export interface Discount {
    productSKU: string;
    calculateDiscount(products: Product[]): number;
}

export class AppleTVDiscount implements Discount {
    productSKU = "atv";
    calculateDiscount = (products: Product[]): number => {
        const [{price: productPrice}] = products
        if (products.length >= 3) {
            return productPrice * -1;
        }
        return 0;
    }
}

export class IPadDiscount implements Discount {
    productSKU = "ipd";
    private readonly priceWithDiscount = 499.99;

    calculateDiscount = (products: Product[]): number => {
        const [{price: productPrice}] = products
        if (products.length >= 4) {
            return (productPrice - this.priceWithDiscount) * products.length * -1;
        }
        return 0;
    }
}