"use client"

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/layout/header';
import { ProductGrid } from '@/components/products/product-grid';
import { useAuth } from '@/hooks/use-auth';
import { productsService } from '@/services/products.service';
import { Product } from '@/types';
import { Loader2 } from 'lucide-react';

export default function ProductsPage() {
    const { user, isLoading: isAuthLoading } = useAuth();
    const router = useRouter();
    const [products, setProducts] = useState<Product[]>([]);
    const [isProductsLoading, setIsProductsLoading] = useState(true);

    useEffect(() => {
        if (!isAuthLoading && !user) {
            router.push('/login');
        }
    }, [user, isAuthLoading, router]);

    useEffect(() => {
        const loadProducts = async () => {
            try {
                const data = await productsService.getProducts();
                setProducts(data);
            } catch (error) {
                console.error('Error loading products:', error);
            } finally {
                setIsProductsLoading(false);
            }
        };

        if (user) {
            loadProducts();
        }
    }, [user]);

    if (isAuthLoading || (!user && !isProductsLoading)) {
        return (
            <div className="flex h-screen items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    // Prevent flash of content before redirect
    if (!user) return null;

    return (
        <div className="min-h-screen bg-gray-50/50">
            <Header />
            <main className="container py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold tracking-tight">Catálogo de Productos</h1>
                    <p className="text-muted-foreground mt-2">
                        Explora nuestra selección exclusiva de artículos tecnológicos.
                    </p>
                </div>
                <ProductGrid products={products} isLoading={isProductsLoading} />
            </main>
        </div>
    );
}
