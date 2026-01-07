import { categoriesService } from "@/services/categories.service";
import Link from "next/link";

export async function Sidebar() {
    const categories = await categoriesService.getCategories();

    return (
        <aside className="hidden md:flex w-64 flex-col border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-y-auto no-scrollbar h-full">
            <div className="p-4 flex flex-col h-full">
                <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-1 px-2">
                        <h1 className="text-slate-900 dark:text-white text-base font-bold leading-normal">Categorías</h1>
                        <p className="text-slate-500 dark:text-slate-400 text-xs font-normal leading-normal">Filtrar catálogo por tipo</p>
                    </div>
                    <div className="flex flex-col gap-1">
                        <Link href="/" className="group flex items-center gap-3 px-3 py-2.5 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-all text-left">
                            <span className="material-symbols-outlined icon-fill">grid_view</span>
                            <span className="text-sm font-bold leading-normal">Todos</span>
                        </Link>
                        {categories.map((category) => (
                            <Link key={category.id} href={`/?category=${category.slug}`} className="group flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 transition-all text-left">
                                <span className="material-symbols-outlined">label</span>
                                <span className="text-sm font-medium leading-normal">{category.name}</span>
                            </Link>
                        ))}
                    </div>
                </div>
                <div className="mt-auto border-t border-slate-200 dark:border-slate-800 pt-6">
                    <div className="bg-primary/5 dark:bg-primary/10 rounded-xl p-4 flex flex-col gap-3">
                        <div className="flex items-center gap-2 text-primary">
                            <span className="material-symbols-outlined">inventory_2</span>
                            <span className="font-bold text-sm">Resumen de Stock</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-slate-500 dark:text-slate-400">Total Items</span>
                            <span className="font-bold text-slate-900 dark:text-white">-</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-slate-500 dark:text-slate-400">Bajo Stock</span>
                            <span className="font-bold text-orange-500">-</span>
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    );
}
