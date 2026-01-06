"use client"

import { Product } from '@/types';
import { ProductCard } from './product-card';
import { motion } from 'framer-motion';
import { PackageOpen } from 'lucide-react';

interface ProductGridProps {
    products: Product[];
    isLoading: boolean;
}

export function ProductGrid({ products, isLoading }: ProductGridProps) {
    if (isLoading) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {[...Array(8)].map((_, i) => (
                    <div key={i} className="h-[350px] rounded-lg bg-gray-100 animate-pulse" />
                ))}
            </div>
        );
    }

    if (products.length === 0) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-20 text-center"
            >
                <div className="bg-muted rounded-full p-6 mb-4">
                    <PackageOpen className="h-12 w-12 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold">No hay productos disponibles</h3>
                <p className="text-muted-foreground mt-2 max-w-sm">
                    El inventario está vacío en este momento. Intenta verificar más tarde.
                </p>
            </motion.div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pb-20">
            {products.map((product, index) => (
                <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                    <ProductCard product={product} />
                </motion.div>
            ))}
        </div>
    );
}
