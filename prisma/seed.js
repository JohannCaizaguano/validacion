
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
    console.log('🌱 Starting seed...')

    // 1. Clean existing data
    await prisma.orderItem.deleteMany()
    await prisma.order.deleteMany()
    await prisma.product.deleteMany()
    await prisma.category.deleteMany()

    // 2. Create Categories
    const categoriesData = [
        { name: 'Frutas', slug: 'frutas' },
        { name: 'Verduras', slug: 'verduras' },
        { name: 'Lácteos', slug: 'lacteos' },
        { name: 'Snacks', slug: 'snacks' },
        { name: 'Panadería', slug: 'panaderia' },
        { name: 'Tecnología', slug: 'tecnologia' },
    ]

    const categories = {}

    for (const cat of categoriesData) {
        const created = await prisma.category.create({
            data: cat,
        })
        categories[cat.slug] = created.id
        console.log(`Created category: ${cat.name}`)
    }

    // Helper to generate products
    const productsToAdd = []

    // --- FRUTAS (10 items with unique images) ---
    const frutas = [
        { name: 'Manzanas Rojas', image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400' },
        { name: 'Bananas', image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400' },
        { name: 'Naranjas', image: 'https://images.unsplash.com/photo-1547514701-42782101795e?w=400' },
        { name: 'Uvas Verdes', image: 'https://images.unsplash.com/photo-1537640538966-79f369143f8f?w=400' },
        { name: 'Fresas', image: 'https://images.pexels.com/photos/46174/strawberries-berries-fruit-freshness-46174.jpeg?w=400' },
        { name: 'Peras', image: 'https://images.unsplash.com/photo-1514756331096-242fdeb70d4a?w=400' },
        { name: 'Piña', image: 'https://images.unsplash.com/photo-1550258987-190a2d41a8ba?w=400' },
        { name: 'Sandía', image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400' },
        { name: 'Kiwi', image: 'https://images.unsplash.com/photo-1585059895524-72359e06133a?w=400' },
        { name: 'Mango', image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=400' },
    ]
    frutas.forEach(p => productsToAdd.push({ ...p, categoryId: categories['frutas'], price: 1.50, stock: 100, description: `Fresca y deliciosa ${p.name}` }))

    // --- VERDURAS (10 items with unique images) ---
    const verduras = [
        { name: 'Brócoli', image: 'https://images.pexels.com/photos/1359326/pexels-photo-1359326.jpeg?w=400' },
        { name: 'Zanahorias', image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400' },
        { name: 'Espinacas', image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400' },
        { name: 'Papas', image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400' },
        { name: 'Tomates', image: 'https://images.pexels.com/photos/1327838/pexels-photo-1327838.jpeg?w=400' },
        { name: 'Cebollas', image: 'https://images.unsplash.com/photo-1518977822534-7049a61ee0c2?w=400' },
        { name: 'Pepino', image: 'https://images.unsplash.com/photo-1449300079323-02e209d9d3a6?w=400' },
        { name: 'Pimientos', image: 'https://images.pexels.com/photos/128536/pexels-photo-128536.jpeg?w=400' },
        { name: 'Lechuga', image: 'https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?w=400' },
        { name: 'Ajo', image: 'https://images.pexels.com/photos/4197447/pexels-photo-4197447.jpeg?w=400' },
    ]
    verduras.forEach(p => productsToAdd.push({ ...p, categoryId: categories['verduras'], price: 0.80, stock: 50, description: `Orgánico ${p.name}` }))

    // --- LÁCTEOS (10 items with unique images) ---
    const lacteos = [
        { name: 'Leche Entera', image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400' },
        { name: 'Queso Cheddar', image: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=400' },
        { name: 'Yogurt Natural', image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400' },
        { name: 'Mantequilla', image: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=400' },
        { name: 'Crema de Leche', image: 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=400' },
        { name: 'Queso Mozzarella', image: 'https://images.unsplash.com/photo-1634487359989-3e90c9432133?w=400' },
        { name: 'Leche Descremada', image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400' },
        { name: 'Queso Crema', image: 'https://images.unsplash.com/photo-1559561853-08451507cbe7?w=400' },
        { name: 'Yogurt Griego', image: 'https://images.unsplash.com/photo-1571212515416-fef01fc43637?w=400' },
        { name: 'Helado de Vainilla', image: 'https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=400' },
    ]
    lacteos.forEach(p => productsToAdd.push({ ...p, categoryId: categories['lacteos'], price: 3.50, stock: 20, description: `Producto lácteo fresco: ${p.name}` }))

    // --- SNACKS (10 items with unique images) ---
    const snacks = [
        { name: 'Papas Fritas', image: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=400' },
        { name: 'Maní Salado', image: 'https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg?w=400' },
        { name: 'Nachos', image: 'https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?w=400' },
        { name: 'Galletas de Chocolate', image: 'https://images.pexels.com/photos/230325/pexels-photo-230325.jpeg?w=400' },
        { name: 'Barra de Cereal', image: 'https://images.unsplash.com/photo-1606787503066-794bb59c64bc?w=400' },
        { name: 'Palomitas de Maíz', image: 'https://images.unsplash.com/photo-1578849278619-e73505e9610f?w=400' },
        { name: 'Chocolate Negro', image: 'https://images.pexels.com/photos/918327/pexels-photo-918327.jpeg?w=400' },
        { name: 'Gomitas', image: 'https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?w=400' },
        { name: 'Almendras', image: 'https://images.unsplash.com/photo-1508061253366-f7da158b6d46?w=400' },
    ]
    snacks.forEach(p => productsToAdd.push({ ...p, categoryId: categories['snacks'], price: 1.50, stock: 100, description: `Snack delicioso: ${p.name}` }))

    // --- PANADERÍA (10 items with unique images) ---
    const panaderia = [
        { name: 'Pan de Molde', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400' },
        { name: 'Croissant', image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400' },
        { name: 'Baguette', image: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=400' },
        { name: 'Donas', image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=400' },
        { name: 'Pastel de Chocolate', image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400' },
        { name: 'Muffins', image: 'https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=400' },
        { name: 'Pan Integral', image: 'https://images.unsplash.com/photo-1598373182133-52452f7691ef?w=400' },
        { name: 'Empanadas', image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=400' },
        { name: 'Tarta de Manzana', image: 'https://images.unsplash.com/photo-1568571780765-9276ac8b75a2?w=400' },
        { name: 'Galletas de Avena', image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400' },
    ]
    panaderia.forEach(p => productsToAdd.push({ ...p, categoryId: categories['panaderia'], price: 2.00, stock: 30, description: `Recién horneado: ${p.name}` }))

    // --- TECNOLOGÍA (10 items with unique images) ---
    const tecnologia = [
        { name: 'Auriculares', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400' },
        { name: 'Smartwatch', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400' },
        { name: 'Teclado Gamer', image: 'https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg?w=400' },
        { name: 'Mouse Inalámbrico', image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400' },
        { name: 'Cámara 4K', image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400' },
        { name: 'Monitor 24"', image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400' },
        { name: 'Laptop Stand', image: 'https://images.pexels.com/photos/4195325/pexels-photo-4195325.jpeg?w=400' },
        { name: 'USB-C Cable', image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400' },
        { name: 'Power Bank', image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400' },
        { name: 'Funda Laptop', image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400' },
    ]
    tecnologia.forEach(p => productsToAdd.push({ ...p, categoryId: categories['tecnologia'], price: 29.99, stock: 15, description: `Accesorio tech: ${p.name}` }))


    // Bulk insert all products
    for (const product of productsToAdd) {
        await prisma.product.create({
            data: {
                name: product.name,
                description: product.description,
                price: product.price,
                stock: product.stock,
                imageUrl: product.image,
                categoryId: product.categoryId
            }
        })
    }

    console.log(`✅ Seed completed. Inserted ${productsToAdd.length} products with unique images.`)
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
