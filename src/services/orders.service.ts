"use client"

import { CartItem } from "@/types";

export interface Order {
    id: string;
    items: CartItem[];
    total: number;
    date: string;
    status: 'completed' | 'pending' | 'cancelled';
}

const ORDERS_KEY = 'orders_history';

export const OrdersService = {
    getOrders: (): Order[] => {
        if (typeof window === 'undefined') return [];
        const stored = localStorage.getItem(ORDERS_KEY);
        try {
            return stored ? JSON.parse(stored) : [];
        } catch {
            return [];
        }
    },

    createOrder: (items: CartItem[], total: number) => {
        const newOrder: Order = {
            id: `ORD-${Date.now().toString().slice(-6)}`,
            items,
            total,
            date: new Date().toISOString(),
            status: 'completed'
        };

        const currentOrders = OrdersService.getOrders();
        const updatedOrders = [newOrder, ...currentOrders];
        localStorage.setItem(ORDERS_KEY, JSON.stringify(updatedOrders));
        return newOrder;
    }
};
