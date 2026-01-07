import { productsService } from '@/services/products.service';
import { ProductCard } from '@/components/products/product-card';
import { Header } from '@/components/layout/header';
import { Sidebar } from '@/components/layout/sidebar';

interface HomePageProps {
    searchParams: Promise<{ category?: string }>;
}

export default async function HomePage({ searchParams }: HomePageProps) {
    const params = await searchParams;
    // Fetch data directly on the server, filtered by category if provided
    const products = await productsService.getProducts(params.category);

    return (
        <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark">
            <Header />

            <div className="flex flex-1 overflow-hidden">
                <Sidebar />

                <main className="flex-1 flex flex-col overflow-y-auto">
                    <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 flex flex-col gap-6">

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
                        {products.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-20 bg-white dark:bg-slate-800 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700">
                                <span className="material-symbols-outlined text-6xl text-slate-300 dark:text-slate-600 mb-4">inventory_2</span>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">No hay productos</h3>
                                <p className="text-slate-500 dark:text-slate-400 text-center max-w-sm mb-6">Empieza agregando items a tu inventario para verlos aquí.</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-20">
                                {products.map((product) => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        )}

                        {/* Pagination */}
                        <div className="flex items-center justify-between border-t border-slate-200 dark:border-slate-800 pt-4 pb-8">
                            <div className="text-sm text-slate-500 dark:text-slate-400">
                                Mostrando <span className="font-bold text-slate-900 dark:text-white">{products.length}</span> productos
                            </div>
                            {/* Pagination controls can be implemented later with query params */}
                        </div>

                    </div>
                </main>
            </div>
        </div>
    );
}
