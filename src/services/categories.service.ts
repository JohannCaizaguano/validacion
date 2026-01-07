
import prisma from '@/lib/prisma';

export const categoriesService = {
    async getCategories() {
        return await prisma.category.findMany({
            orderBy: { name: 'asc' }
        });
    }
};
