import { Product } from '@/types';

const MOCK_PRODUCTS: Product[] = [
    {
        id: '1',
        name: 'Auriculares Inalámbricos Premium',
        price: 129.99,
        stock: 'in-stock',
        description: 'Sonido de alta fidelidad con cancelación de ruido.',
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60'
    },
    {
        id: '2',
        name: 'Reloj Inteligente Series 5',
        price: 249.50,
        stock: 'low-stock',
        description: 'Monitoreo de salud avanzado y batería de larga duración.',
        image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=500&auto=format&fit=crop&q=60'
    },
    {
        id: '3',
        name: 'Cámara Mirrorless 4K',
        price: 899.00,
        stock: 'out-of-stock',
        description: 'Captura momentos increíbles con resolución ultra 4K.',
        image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&auto=format&fit=crop&q=60'
    },
    {
        id: '4',
        name: 'Teclado Mecánico RGB',
        price: 89.99,
        stock: 'in-stock',
        description: 'Switches táctiles y retroiluminación personalizable.',
        image: 'https://images.unsplash.com/photo-1587829741301-dc798b91a603?w=500&auto=format&fit=crop&q=60'
    },
    {
        id: '5',
        name: 'Monitor UltraWide 34"',
        price: 459.99,
        stock: 'in-stock',
        description: 'Inmersión total para trabajo y juegos.',
        image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&auto=format&fit=crop&q=60'
    },
    {
        id: '6',
        name: 'Mouse Ergonómico Vertical',
        price: 45.00,
        stock: 'low-stock',
        description: 'Diseñado para reducir la fatiga en la muñeca.',
        image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&auto=format&fit=crop&q=60'
    }
];

export const productsService = {
    async getProducts(): Promise<Product[]> {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 800));
        return MOCK_PRODUCTS;
    }
};
