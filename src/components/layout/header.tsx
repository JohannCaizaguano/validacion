"use client"

import { useAuth } from "@/hooks/use-auth";
import { useCart } from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Header() {
    const { user, logout } = useAuth();
    const { itemCount } = useCart();

    return (
        <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-6 py-3 z-20 shadow-sm sticky top-0">
            <div className="flex items-center gap-8">
                <div className="flex items-center gap-3 text-slate-900 dark:text-white">
                    <div className="flex items-center justify-center bg-primary/10 p-2 rounded-lg text-primary">
                        <span className="material-symbols-outlined text-2xl">storefront</span>
                    </div>
                    <h2 className="text-xl font-bold leading-tight tracking-tight">Mi Tienda</h2>
                </div>

                {/* Search Bar */}
                <label className="hidden md:flex flex-col min-w-40 !h-10 w-96">
                    <div className="flex w-full flex-1 items-stretch rounded-lg h-full bg-slate-100 dark:bg-slate-800 border border-transparent focus-within:border-primary transition-colors">
                        <div className="text-slate-400 flex items-center justify-center pl-3 rounded-l-lg border-r-0">
                            <span className="material-symbols-outlined text-[20px]">search</span>
                        </div>
                        <input
                            className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-slate-900 dark:text-white focus:outline-0 focus:ring-0 border-none bg-transparent focus:border-none h-full placeholder:text-slate-400 px-3 rounded-l-none border-l-0 pl-2 text-sm font-normal leading-normal"
                            placeholder="Buscar productos, SKU..."
                        />
                    </div>
                </label>
            </div>

            <div className="flex items-center gap-6">
                <div className="hidden lg:flex items-center gap-6">
                    <Link href="/" className="text-slate-700 dark:text-slate-300 hover:text-primary dark:hover:text-primary transition-colors text-sm font-semibold leading-normal">Inicio</Link>
                    <Link href="/" className="text-slate-900 dark:text-white text-sm font-bold leading-normal">Catálogo</Link>
                    <Link href="/orders" className="text-slate-700 dark:text-slate-300 hover:text-primary dark:hover:text-primary transition-colors text-sm font-semibold leading-normal">Pedidos</Link>
                </div>

                <div className="h-6 w-px bg-slate-200 dark:bg-slate-700 hidden lg:block"></div>

                <Link href="/checkout">
                    <button className="relative flex items-center justify-center size-10 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition-colors">
                        <span className="material-symbols-outlined">shopping_cart</span>
                        {itemCount > 0 && (
                            <span className="absolute top-1 right-1 flex h-2.5 w-2.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
                            </span>
                        )}
                    </button>
                </Link>

                <div
                    className="bg-center bg-no-repeat bg-cover rounded-full size-10 ring-2 ring-white dark:ring-slate-800 cursor-pointer"
                    style={{ backgroundImage: `url("https://ui-avatars.com/api/?name=${user?.name || 'User'}&background=136dec&color=fff")` }}
                    onClick={logout}
                    title="Cerrar Sesión"
                ></div>
            </div>
        </header>
    );
}
