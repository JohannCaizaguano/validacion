import { expect, test, describe } from "bun:test";
import { productsService } from "@/services/products.service";

describe("Products Service", () => {
    test("should fetch products info", async () => {
        const products = await productsService.getProducts();
        expect(products.length).toBeGreaterThan(0);
        
        const firstProduct = products[0];
        expect(firstProduct).toHaveProperty('id');
        expect(firstProduct).toHaveProperty('name');
        expect(firstProduct).toHaveProperty('price');
        expect(firstProduct).toHaveProperty('stock');
    });

    test("should have valid stock statuses", async () => {
        const products = await productsService.getProducts();
        const validStatuses = ['in-stock', 'low-stock', 'out-of-stock'];
        
        products.forEach(product => {
            expect(validStatuses).toContain(product.stock);
            expect(product.price).toBeGreaterThan(0);
        });
    });
});
