
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function check() {
    const products = await prisma.product.findMany({ take: 5 });
    console.log('Sample Products:');
    products.forEach(p => {
        console.log(`- ${p.name}: [${p.imageUrl}]`);
    });
}

check()
    .catch(e => console.error(e))
    .finally(async () => await prisma.$disconnect());
