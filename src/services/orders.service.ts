"use client"

import { CartItem, Order } from "@/types";

const ORDERS_KEY = 'orders_history';

export const ordersService = {
    getOrders: (): Order[] => {
        if (typeof window === 'undefined') return [];
        const stored = localStorage.getItem(ORDERS_KEY);
        try {
            return stored ? JSON.parse(stored) : [];
        } catch {
            return [];
        }
    },

    calculateTotal: (items: CartItem[]): number => {
        return items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    },

    createOrder: (userId: string, items: CartItem[]): Order => {
        if (items.length === 0) {
            throw new Error("El pedido debe contener al menos un producto");
        }

        const total = ordersService.calculateTotal(items);

        const newOrder: Order = {
            id: `ORD-${Date.now().toString().slice(-6)}`,
            userId,
            items,
            total,
            date: new Date(),
            status: 'confirmed'
        };

        const currentOrders = ordersService.getOrders();
        const updatedOrders = [newOrder, ...currentOrders];
        
        if (typeof window !== 'undefined') {
            localStorage.setItem(ORDERS_KEY, JSON.stringify(updatedOrders));
        }
        
        return newOrder;
    }
};
