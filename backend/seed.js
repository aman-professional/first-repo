const mongoose = require('mongoose');
const Product = require('./models/Product');

const MONGODB_URI = 'mongodb://localhost:27017/chocolate_shop';

const products = [
    {
        name: 'Dairy Milk Silk',
        description: 'Smooth and creamy milk chocolate with a silk texture.',
        price: 5.99,
        image: 'https://images.unsplash.com/photo-1626125345510-4603468bdb3a?q=80&w=400&auto=format&fit=crop',
        category: 'chocolate'
    },
    {
        name: 'KitKat 4 Finger',
        description: 'Crispy wafer fingers covered with smooth milk chocolate.',
        price: 3.50,
        image: 'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?q=80&w=400&auto=format&fit=crop',
        category: 'chocolate'
    },
    {
        name: 'Ferrero Rocher Box',
        description: 'Whole hazelnut dipped in smooth chocolaty cream with a crispy wafer.',
        price: 19.99,
        image: 'https://images.unsplash.com/photo-1544967082-d9d25d867d66?q=80&w=400&auto=format&fit=crop',
        category: 'chocolate'
    },
    {
        name: 'Snickers Bar',
        description: 'Milk chocolate, peanuts, caramel, and nougat.',
        price: 2.99,
        image: 'https://images.unsplash.com/photo-1590004953392-5aba2e72269a?q=80&w=400&auto=format&fit=crop',
        category: 'chocolate'
    },
    {
        name: 'Toblerone Swiss Milk',
        description: 'Swiss milk chocolate with honey and almond nougat.',
        price: 8.50,
        image: 'https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?q=80&w=400&auto=format&fit=crop',
        category: 'chocolate'
    },
    {
        name: 'Lindt Lindor Truffles',
        description: 'Exquisitely creamy chocolate truffles with a melting center.',
        price: 14.99,
        image: 'https://images.unsplash.com/photo-1548907040-4baa42d10919?q=80&w=400&auto=format&fit=crop',
        category: 'chocolate'
    },
    {
        name: 'Maltesers Sharing Bag',
        description: 'Crisp honeycombed centers covered in milk chocolate.',
        price: 6.75,
        image: 'https://images.unsplash.com/photo-1582176604445-21b173c35f5b?q=80&w=400&auto=format&fit=crop',
        category: 'chocolate'
    },
    {
        name: 'Galaxy Smooth Milk',
        description: 'Velvety smooth milk chocolate for a sheer moment of bliss.',
        price: 4.99,
        image: 'https://images.unsplash.com/photo-1549007994-cb92cf8a7a8d?q=80&w=400&auto=format&fit=crop',
        category: 'chocolate'
    }
];

mongoose.connect(MONGODB_URI)
    .then(async () => {
        console.log('Connected to MongoDB for seeding...');
        await Product.deleteMany({});
        const inserted = await Product.insertMany(products);
        console.log(`✓ Database seeded successfully! ${inserted.length} products added.`);
        process.exit();
    })
    .catch(err => {
        console.error('✗ Seeding error:', err.message);
        process.exit(1);
    });
