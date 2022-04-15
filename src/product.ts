// Product class
export default class Product {
    sku: string;
    name: string;
    price: number;

    constructor(name: string, sku: string, price: number) {
        this.name = name;
        this.sku = sku;
        this.price = price;
    }
}