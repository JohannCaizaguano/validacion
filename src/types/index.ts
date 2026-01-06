export interface User {
    id: string;
    email: string;
    name: string;
}

export interface Product {
    id: string;
    name: string;
    price: number;
    stock: 'in-stock' | 'low-stock' | 'out-of-stock';
    description?: string;
    image?: string;
}

export interface CartItem extends Product {
    quantity: number;
}

export interface Order {
    id: string;
    userId: string;
    items: CartItem[];
    total: number;
    date: Date;
    status: 'pending' | 'confirmed';
}
