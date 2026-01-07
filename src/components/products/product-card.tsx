"use client"

import { Product } from '@/types';
import { useCart } from '@/hooks/use-cart';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

interface ProductCardProps {
    product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
    const { addToCart } = useCart();

    const handleAddToCart = () => {
        addToCart(product);
        toast.success("Producto agregado", {
            description: `${product.name} se añadió al carrito`
        });
    };

    const isLowStock = product.stock === 'low-stock';
    const isOutOfStock = product.stock === 'out-of-stock';

    return (
        <div className={`group bg-white dark:bg-slate-900 rounded-xl overflow-hidden border border-slate-100 dark:border-slate-800 hover:shadow-xl hover:border-primary/20 dark:hover:border-primary/20 transition-all duration-300 flex flex-col ${isOutOfStock ? 'opacity-80 hover:opacity-100 bg-slate-50' : ''}`}>
            <div className={`relative w-full aspect-square bg-slate-100 dark:bg-slate-800 overflow-hidden ${isOutOfStock ? 'grayscale' : ''}`}>
                {product.image ? (
                    <div className="relative w-full h-full">
                        <img
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            src={product.image}
                            onError={(e) => {
                                e.currentTarget.style.display = 'none';
                                e.currentTarget.parentNode?.querySelector('.fallback')?.classList.remove('hidden');
                            }}
                        />
                        {/* Fallback shown on error */}
                        <div className="fallback invisible absolute inset-0 flex items-center justify-center text-slate-400 bg-slate-100 dark:bg-slate-800">
                            <span className="material-symbols-outlined text-4xl">image_not_supported</span>
                        </div>
                    </div>
                ) : (
                    <div className="flex h-full items-center justify-center text-slate-400">
                        <span className="material-symbols-outlined text-4xl">image_not_supported</span>
                    </div>
                )}

                {isOutOfStock && (
                    <div className="absolute inset-0 bg-slate-900/10 flex items-center justify-center">
                        <span className="bg-red-500 text-white px-3 py-1.5 rounded-lg text-sm font-bold shadow-md">Agotado</span>
                    </div>
                )}

                {!isOutOfStock && (
                    <div className="absolute top-3 left-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm px-2.5 py-1 rounded-md shadow-sm">
                        <span className="text-xs font-bold text-slate-900 dark:text-white">Producto</span>
                    </div>
                )}
            </div>

            <div className="p-4 flex flex-col flex-1 gap-2">
                <div className="flex justify-between items-start">
                    <h3 className={`text-lg font-bold leading-tight transition-colors ${isOutOfStock ? 'text-slate-500' : 'text-slate-900 dark:text-white group-hover:text-primary'}`}>
                        {product.name}
                    </h3>
                    <span className={`text-lg font-extrabold ${isOutOfStock ? 'text-slate-400' : 'text-primary'}`}>
                        ${product.price.toFixed(2)}
                    </span>
                </div>

                <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2">
                    {product.description}
                </p>

                <div className="mt-auto pt-4 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                        <div className={`w-2 h-2 rounded-full ${isOutOfStock ? 'bg-red-500' : isLowStock ? 'bg-orange-400' : 'bg-green-500'}`}></div>
                        <span className={`text-xs font-semibold ${isOutOfStock ? 'text-red-600' : isLowStock ? 'text-orange-600' : 'text-slate-700 dark:text-slate-300'}`}>
                            {isOutOfStock ? 'Sin stock' : isLowStock ? 'Poco stock' : 'En stock'}
                        </span>
                    </div>

                    <button
                        onClick={handleAddToCart}
                        disabled={isOutOfStock}
                        className={`flex items-center justify-center size-9 rounded-lg transition-colors ${isOutOfStock
                            ? 'bg-slate-100 dark:bg-slate-800 text-slate-300 cursor-not-allowed'
                            : 'bg-slate-100 dark:bg-slate-800 text-primary hover:bg-primary hover:text-white'
                            }`}
                    >
                        <span className="material-symbols-outlined text-[20px]">
                            {isOutOfStock ? 'block' : 'add'}
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
}
