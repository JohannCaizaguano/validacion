"use client"

import { useAuth } from '@/hooks/use-auth';
import { useCart } from '@/hooks/use-cart';
import { Product } from '@/types';
import { ProductCard } from '@/components/products/product-card';
import { Header } from '@/components/layout/header';
import { Sidebar } from '@/components/layout/sidebar';
import { motion } from 'framer-motion';

// Mock Data matching the design reference details
const PRODUCTS: Product[] = [
    {
        id: '1',
        name: 'Manzanas Rojas',
        price: 1.50,
        description: 'Manzanas frescas de temporada, ideales para jugos y postres. Precio por kg.',
        stock: 'in-stock',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC90vNjnvHMbIu7aC7hTBkEs7hzVqV_UbIRX9FZKm7nH6AKyXts1-xNYiQjkSvYlrB8CYJxGZ2pefjmpDPUbC8aT6iGg6sRFYfa-NoEb7qvjKN5XiVYtZmBQNbRtcWEwa-068FXAESz2G0C8mYoJ0BwO8GrEFUTPs5bhi6LuoKcJn-IPqlpHL1NutUxm09PiSvZQgqSH5tNxpvLlJ7Jg4aMmjVZws6baS4wLDlUMqV4U2oVWQrzRaTqHM1xqpQmtEWkRhJhaEOmYuvg'
    },
    {
        id: '2',
        name: 'Brócoli Orgánico',
        price: 2.10,
        description: 'Cultivado sin pesticidas. Excelente fuente de vitaminas y fibra.',
        stock: 'in-stock',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDRQZdnCKmfc87iDqx-ZXYQ8ajMNS7ZW4-nKyGjSaR9RPuwTGWo_GoEdXuwPFpUfynFNPYFDFm6UnAJKcCfF5rYPbL1snGZWlt9RDreEjCGgQRJlL4WN6HVbm5vC7YuIR8tV3qgm_SZH9Y4DPjMLHdnlG7FnB5QzfNu2qHtdgfKAFsYTzt0We1iQU92fzjVw0ioKFsmcIvCgmN0Fi1Ss2kz-zEm-rcnshPK3eRcN2Ut8aFbX3t6pZOfGEXRO_bEwSCNPkhIqR3T25gS'
    },
    {
        id: '3',
        name: 'Leche Entera 1L',
        price: 1.20,
        description: 'Leche fresca pasteurizada, botella de vidrio retornable.',
        stock: 'low-stock',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCbj9foHZ3fvlJS0S-3DXor1Mgid6ZBYzcYAWGl-Ac9l_UV0E4ZWsIYqcrtb6Ti9XOKEUAtFzF3NOC3b0niY_Qn7gJWOM-QLuk7kyANBecjIasSdhsM3FsFp5RCOB9uwDx6mAlYgGqZKrgDQlEGQFKuejLweeFwd-vBd0kke1HUtgczA-IpFNoVDkBLzVUReWUl2Vb3rUmqzBbi_BGMHPI7PzmQiuYEI5UqHsFFVHxCBr8cBEJZApqUprN6NVgqRW7GZyWYSMQ5zAvI'
    },
    {
        id: '4',
        name: 'Papas Fritas Clásicas',
        price: 0.99,
        description: 'Bolsa de 150g, con sal marina.',
        stock: 'in-stock',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDsZ_7MktAQK0jSdJ3G2r1Q_nn6RZ3-f-0S52PtEMUNI0mKqm7bVTm63hY2-etSQk9TPCNzjOff4QloMQkWxf3ijWKtmAyEBVjkbw6laT8WTF3S4EivbtyO31VIGt2Tgw4DRxeoQeD6P15NXIu9poeKo1ouD0gKl9PgWL2D98il6Y5Fqw7vH4X8h6KLnU1AWXzkYBhr_iRGWdZMTx6R2IDgcbTukKk_lslVKrWqDq_vQYGzhNzvoxXBcIDlpUVnVC2Q9H2b1L8s4yw_'
    },
    {
        id: '5',
        name: 'Pan Artesanal',
        price: 3.50,
        description: 'Masa madre, fermentación de 24 horas.',
        stock: 'out-of-stock',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCEz1MRtHHH2Y4AaDFSAswRt7XWD8bXU1ODttRsnAt-Z3CPLcul30gFhos7ke01lX5mvdCvkQ9PJNp5H-UA8I8QkZ73vQ9segkunrc3NtZMh-ZNXKicd8Ss1j8uWDYVoQ4Tsc8MtqORjTIaMXdIEFUvCZwOYgrmPBuv9rTsu0RiCXJbsxc6YYKCzCqOqPdrLgYDl3O0frf28VG5ohrW2zJrRJSYue_4NOr5RMCJ3JOVYxX6ZkNsuucDYfHWRk8EEbWs5unFZ4YJH7aP'
    },
    {
        id: '6',
        name: 'Zanahorias Frescas',
        price: 0.80,
        description: 'Zanahorias dulces, ideales para ensaladas o guisos. Precio por atado.',
        stock: 'in-stock',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAepUJALXNHIrup98oV8VL1x1RlrY3daSzQJZin5CXi3nmINvYgEbm47d6hlJmKz80uhxn_MzjBf6UyGC4i_5dmNOSCXKvEX5-pGkY7cLoiWDcKrpxhkApAZF2rRKGyxL0UmmUXT5U3gnCDeFAIUKbtZbwiYdfG5CK7_QbroqyruGeVQkCq0rH7fIOl3_324N7_vP7UJn1A2paXcSEVkjulRAzCzCq4hecQTJ2pqpmWEOFVUm_8coGypOuKAj8VIrCnhZFBlxyZCdgS'
    },
    {
        id: '7',
        name: 'Uvas Verdes',
        price: 2.50,
        description: 'Sin semillas, dulces y crujientes. Precio por kg.',
        stock: 'in-stock',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAGaU1jeRbRLw5ms0nmdYuazjiwCglKsNTgjk8FIqiqtlS8wjH5N6I68e3B4At2nysHZl1dlaN1Mkh7cSVC6zmhXBh617EWqYF_DEoySkpuHp97lY8QKBEwp4EgIKOE1jNmyWgnpSemO_fbFRRjmH5mumodN0vgC6Njsw84_ytSw9OoF7o1D0GR7cwCZc6ZI3V9Zbr8r7hzllMnmQrM88HDtpO041hjP-cbFb_80t_H8-DZkZBOuRHGxae72Tm25b85xkYICR9pRxwJ'
    },
    {
        id: '8',
        name: 'Queso Cheddar',
        price: 4.20,
        description: 'Bloque de 250g, maduración media.',
        stock: 'in-stock',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCUSbIMIydB18nnxkFypka-CtmOW-9Dtk-2jlymFUCYG_LaUxH9FsdC5S9omyN6jE2EswTyb3bBtwUpwDKIaYj7U3-AoKtF_EsuEJycJcd-KXM2E3qiI4E1FKwe-eqmC_5T_qAjrEXAiZT8ukdSSTcuW4kgmw82eisIUgiNzsMpym8B-suTR5AyfeTSQZhdmGq7-qLUOjJDVVl5RrGukcdjk2eX_Jd2GfbmxGAr5Wjvy5_lvj51LQkgwVA9IONmlNKMMyxGE0gxoH4P'
    }
];

export default function HomePage() {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) return null;

    return (
        <div className="flex flex-col h-screen bg-background-light dark:bg-background-dark overflow-hidden">
            <Header />

            <div className="flex flex-1 overflow-hidden">
                <Sidebar />

                <main className="flex-1 flex flex-col overflow-y-auto relative scroll-smooth">
                    <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-8 h-full">

                        {/* Page Heading */}
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                            <div className="flex flex-col gap-1">
                                <h1 className="text-slate-900 dark:text-white text-3xl font-extrabold tracking-tight">Catálogo de Productos</h1>
                                <p className="text-slate-500 dark:text-slate-400 text-base font-normal">Gestiona y visualiza el inventario actual de la tienda.</p>
                            </div>
                            <div className="flex items-center gap-3 w-full md:w-auto">
                                <button className="flex-1 md:flex-none flex items-center justify-center gap-2 rounded-lg h-10 px-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-sm font-bold hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                                    <span className="material-symbols-outlined text-[20px]">tune</span>
                                    <span>Filtros</span>
                                </button>
                                <button className="flex-1 md:flex-none flex items-center justify-center gap-2 rounded-lg h-10 px-6 bg-primary hover:bg-blue-600 text-white text-sm font-bold transition-colors shadow-lg shadow-blue-500/20">
                                    <span className="material-symbols-outlined text-[20px]">add</span>
                                    <span>Nuevo Producto</span>
                                </button>
                            </div>
                        </div>

                        {/* Status Chips */}
                        <div className="flex items-center gap-2 overflow-x-auto p-1 pb-2 no-scrollbar">
                            <button className="whitespace-nowrap flex h-9 items-center justify-center gap-2 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-4 transition-transform active:scale-95">
                                <span className="text-sm font-bold">Todos</span>
                            </button>
                            <button className="whitespace-nowrap flex h-9 items-center justify-center gap-2 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-slate-700 dark:text-slate-300 px-4 transition-all hover:shadow-sm">
                                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                                <span className="text-sm font-medium">En stock</span>
                            </button>
                            <button className="whitespace-nowrap flex h-9 items-center justify-center gap-2 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-slate-700 dark:text-slate-300 px-4 transition-all hover:shadow-sm">
                                <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
                                <span className="text-sm font-medium">Poco stock</span>
                            </button>
                            <button className="whitespace-nowrap flex h-9 items-center justify-center gap-2 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-slate-700 dark:text-slate-300 px-4 transition-all hover:shadow-sm">
                                <span className="w-2 h-2 rounded-full bg-red-500"></span>
                                <span className="text-sm font-medium">Agotado</span>
                            </button>
                            <button className="whitespace-nowrap flex h-9 items-center justify-center gap-2 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-slate-700 dark:text-slate-300 px-4 transition-all hover:shadow-sm">
                                <span className="material-symbols-outlined text-base">local_offer</span>
                                <span className="text-sm font-medium">Ofertas</span>
                            </button>
                        </div>

                        {/* Product Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-20">
                            {PRODUCTS.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>

                        {/* Pagination */}
                        <div className="flex items-center justify-between border-t border-slate-200 dark:border-slate-800 pt-4 pb-8">
                            <div className="text-sm text-slate-500 dark:text-slate-400">
                                Mostrando <span className="font-bold text-slate-900 dark:text-white">1-8</span> de <span className="font-bold text-slate-900 dark:text-white">240</span> productos
                            </div>
                            <div className="flex gap-2">
                                <button className="flex items-center justify-center size-9 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-50">
                                    <span className="material-symbols-outlined text-[20px]">chevron_left</span>
                                </button>
                                <button className="flex items-center justify-center size-9 rounded-lg bg-primary text-white font-bold">1</button>
                                <button className="flex items-center justify-center size-9 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 font-medium">2</button>
                                <button className="flex items-center justify-center size-9 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 font-medium hidden sm:flex">3</button>
                                <button className="flex items-center justify-center size-9 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 font-medium">...</button>
                                <button className="flex items-center justify-center size-9 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700">
                                    <span className="material-symbols-outlined text-[20px]">chevron_right</span>
                                </button>
                            </div>
                        </div>

                    </div>
                </main>
            </div>
        </div>
    );
}
