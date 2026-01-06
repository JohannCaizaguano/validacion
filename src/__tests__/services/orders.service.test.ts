import { expect, test, describe } from "bun:test";
import { ordersService } from "@/services/orders.service";
import { CartItem } from "@/types";

describe("Orders Service", () => {
    const mockItems: CartItem[] = [
        {
            id: "1",
            name: "Product 1",
            price: 100,
            quantity: 2,
            stock: "in-stock"
        },
        {
            id: "2",
            name: "Product 2",
            price: 50,
            quantity: 1,
            stock: "in-stock"
        }
    ];

    test("should calculate total correctly", () => {
        const total = ordersService.calculateTotal(mockItems);
        // (100 * 2) + (50 * 1) = 250
        expect(total).toBe(250);
    });

    test("should calculate total for empty cart", () => {
        const total = ordersService.calculateTotal([]);
        expect(total).toBe(0);
    });

    test("should create order successfully", async () => {
        const order = await ordersService.createOrder("user-1", mockItems);
        expect(order.total).toBe(250);
        expect(order.items.length).toBe(2);
        expect(order.status).toBe("confirmed");
    });

    test("should throw error for empty order", async () => {
        try {
            await ordersService.createOrder("user-1", []);
        } catch (e: any) {
            expect(e.message).toBe("El pedido debe contener al menos un producto");
        }
    });
});
