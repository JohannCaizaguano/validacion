
import prisma from '@/lib/prisma';
import { Product } from '@/types';

// Category priority order (lower = shown first)
const categoryPriority: Record<string, number> = {
    'snacks': 1,
    'frutas': 2,
    'verduras': 3,
    'lacteos': 4,
    'panaderia': 5,
    'tecnologia': 6,
};

type MappedProduct = Product & { name: string };

export const productsService = {
    async getProducts(categorySlug?: string): Promise<Product[]> {
        const where = categorySlug ? { category: { slug: categorySlug } } : {};

        const products = await prisma.product.findMany({
            where,
            include: { category: true }
        });

        // Map Prisma Decimal to number and imageUrl to image for frontend compatibility
        const mapped: MappedProduct[] = products.map((p: typeof products[number]) => ({
            ...p,
            price: Number(p.price),
            stock: p.stock > 10 ? 'in-stock' as const : p.stock > 0 ? 'low-stock' as const : 'out-of-stock' as const,
            image: p.imageUrl,
            category: p.category,
            id: p.id
        }));

        // Sort by category priority (snacks first), then by name
        return mapped.sort((a: MappedProduct, b: MappedProduct) => {
            const priorityA = categoryPriority[a.category?.slug ?? ''] ?? 99;
            const priorityB = categoryPriority[b.category?.slug ?? ''] ?? 99;
            if (priorityA !== priorityB) return priorityA - priorityB;
            return a.name.localeCompare(b.name);
        });
    }
};
