import { expect, test, describe, beforeEach } from "bun:test";
import { ordersService } from "@/services/orders.service";
import { CartItem } from "@/types";

// Mock LocalStorage for Bun environment
const localStorageMock = (() => {
    let store: Record<string, string> = {};
    return {
        getItem: (key: string) => store[key] || null,
        setItem: (key: string, value: string) => { store[key] = value.toString(); },
        clear: () => { store = {}; },
        removeItem: (key: string) => { delete store[key]; }
    };
})();

// Inject mock into global scope
Object.defineProperty(global, 'window', { value: {} });
Object.defineProperty(global, 'localStorage', { value: localStorageMock });

describe("Orders Service", () => {
    beforeEach(() => {
        localStorage.clear();
    });

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

    // Integrated test with storage
    test("should create order successfully and persist", () => {
        const order = ordersService.createOrder("user-1", mockItems);
        
        // Assert returned object
        expect(order.total).toBe(250);
        expect(order.items.length).toBe(2);
        expect(order.status).toBe("confirmed");
        expect(order.userId).toBe("user-1");

        // Assert persistence
        const stored = JSON.parse(localStorage.getItem('orders_history') || '[]');
        expect(stored.length).toBe(1);
        expect(stored[0].id).toBe(order.id);
    });

    test("should throw error for empty order", () => {
        // Wrap in function to catch error
        expect(() => {
            ordersService.createOrder("user-1", []);
        }).toThrow("El pedido debe contener al menos un producto");
    });
});
