"use client"

import { useCart } from '@/hooks/use-cart';
import { useAuth } from '@/hooks/use-auth';
import { Header } from '@/components/layout/header';
import Link from 'next/link';
import { formatPrice } from '@/lib/utils';
import { Toaster, toast } from 'sonner';

export default function CheckoutPage() {
    const { items, removeFromCart: removeItem, updateQuantity, total: cartTotal, clearCart } = useCart();
    const { user } = useAuth();

    const handleCheckout = () => {
        // Save order to history
        import("@/services/orders.service").then(({ OrdersService }) => {
            OrdersService.createOrder(items, cartTotal * 1.16);
        });

        toast.success("¡Pedido confirmado!", {
            description: "Tu pedido ha sido procesado exitosamente"
        });

        setTimeout(() => clearCart(), 2000);
    };

    const tax = cartTotal * 0.16;
    const total = cartTotal + tax;

    return (
        <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-white min-h-screen flex flex-col">
            <Header />

            <main className="flex-1 w-full max-w-[1440px] mx-auto p-4 md:px-10 md:py-8 lg:px-20">
                {/* Breadcrumb & Page Heading */}
                <div className="mb-8">
                    <nav className="flex text-sm text-slate-500 mb-4">
                        <Link href="/" className="hover:text-primary">Pedidos</Link>
                        <span className="mx-2">/</span>
                        <span className="text-slate-900 dark:text-slate-200 font-medium">Nuevo Pedido</span>
                    </nav>
                    <div className="flex flex-wrap justify-between items-end gap-4">
                        <div className="flex flex-col gap-2">
                            <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight">Creación de Pedido</h1>
                            <p className="text-slate-500 dark:text-slate-400 text-base">Revisa los productos seleccionados antes de confirmar.</p>
                        </div>
                        <div className="flex gap-3">
                            <Link href="/" className="text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 font-bold py-2 px-4 rounded-lg text-sm flex items-center gap-2 transition-colors">
                                <span className="material-symbols-outlined !text-lg">arrow_back</span>
                                Volver al Catálogo
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8 items-start">
                    {/* Left Column: Product List */}
                    <div className="lg:col-span-8 w-full flex flex-col gap-6">
                        {/* Items List Container */}
                        <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
                            <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/50">
                                <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                                    <span className="material-symbols-outlined text-primary">shopping_cart</span>
                                    Productos Seleccionados <span className="text-slate-400 text-sm font-normal ml-1">({items.length} items)</span>
                                </h3>
                                <button
                                    onClick={clearCart}
                                    className="text-red-500 hover:text-red-600 text-sm font-semibold flex items-center gap-1"
                                >
                                    <span className="material-symbols-outlined !text-base">delete_sweep</span> Vaciar
                                </button>
                            </div>

                            {items.length === 0 ? (
                                <div className="p-12 text-center text-slate-500">
                                    <span className="material-symbols-outlined text-6xl mb-4 text-slate-300">shopping_cart_off</span>
                                    <p className="text-lg font-medium">Tu carrito está vacío</p>
                                </div>
                            ) : (
                                items.map((item) => (
                                    <div key={item.id} className="group p-4 md:p-6 border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                        <div className="flex flex-col sm:flex-row gap-4 justify-between">
                                            <div className="flex items-start gap-4 flex-1">
                                                <div
                                                    className="shrink-0 bg-slate-100 dark:bg-slate-700 rounded-lg w-20 h-20 md:w-24 md:h-24 bg-center bg-cover border border-slate-200 dark:border-slate-600"
                                                    style={{ backgroundImage: `url("${item.image || ''}")` }}
                                                ></div>
                                                <div className="flex flex-col justify-between h-full py-1">
                                                    <div>
                                                        <h4 className="text-slate-900 dark:text-white text-base md:text-lg font-bold leading-tight mb-1">{item.name}</h4>
                                                        <p className="text-slate-500 text-xs md:text-sm font-medium mb-1">{item.description}</p>
                                                        <p className="text-slate-400 text-xs md:text-sm">ID: {item.id}</p>
                                                    </div>
                                                    <div className="mt-2 sm:hidden font-bold text-primary">{formatPrice(item.price * item.quantity)}</div>
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-between sm:justify-end gap-6 sm:gap-12 mt-4 sm:mt-0">
                                                {/* Quantity Control */}
                                                <div className="flex items-center rounded-lg border border-slate-200 dark:border-slate-700 p-1 bg-white dark:bg-slate-900 shadow-sm">
                                                    <button
                                                        onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                                                        className="size-8 flex items-center justify-center rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors"
                                                    >
                                                        <span className="material-symbols-outlined !text-lg">remove</span>
                                                    </button>
                                                    <input
                                                        className="w-10 text-center bg-transparent border-none p-0 text-slate-900 dark:text-white font-bold text-sm focus:ring-0"
                                                        type="text"
                                                        readOnly
                                                        value={item.quantity}
                                                    />
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                        className="size-8 flex items-center justify-center rounded-md bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                                                    >
                                                        <span className="material-symbols-outlined !text-lg">add</span>
                                                    </button>
                                                </div>
                                                <div className="text-right min-w-[80px] hidden sm:block">
                                                    <p className="text-slate-900 dark:text-white font-bold text-lg">{formatPrice(item.price * item.quantity)}</p>
                                                    <p className="text-slate-400 text-xs">{formatPrice(item.price)} c/u</p>
                                                </div>
                                                <button
                                                    onClick={() => removeItem(item.id)}
                                                    className="text-slate-400 hover:text-red-500 transition-colors p-2 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20"
                                                >
                                                    <span className="material-symbols-outlined">delete</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Add more products link */}
                        <Link href="/" className="flex items-center justify-center gap-2 p-4 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl text-slate-500 hover:text-primary hover:border-primary hover:bg-primary/5 transition-all group">
                            <span className="material-symbols-outlined group-hover:scale-110 transition-transform">add_circle</span>
                            <span className="font-bold">Agregar otro producto desde catálogo</span>
                        </Link>
                    </div>

                    {/* Right Column: Order Summary (Sticky) */}
                    <div className="lg:col-span-4 w-full lg:sticky lg:top-24">
                        <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 flex flex-col gap-6">
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-700 pb-4">Resumen del Pedido</h3>
                            <div className="flex flex-col gap-3">
                                <div className="flex justify-between items-center text-slate-600 dark:text-slate-400 text-sm">
                                    <span>Subtotal</span>
                                    <span className="font-bold text-slate-900 dark:text-white">{formatPrice(cartTotal)}</span>
                                </div>
                                <div className="flex justify-between items-center text-slate-600 dark:text-slate-400 text-sm">
                                    <span>Descuento</span>
                                    <span className="text-green-600 font-medium">- $0.00</span>
                                </div>
                                <div className="flex justify-between items-center text-slate-600 dark:text-slate-400 text-sm">
                                    <span>Impuestos (16%)</span>
                                    <span className="font-bold text-slate-900 dark:text-white">{formatPrice(tax)}</span>
                                </div>
                            </div>

                            {/* Discount Code */}
                            <div className="flex gap-2">
                                <input
                                    className="flex-1 rounded-lg border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm focus:border-primary focus:ring-primary pl-3 h-10"
                                    placeholder="Código cupón"
                                    type="text"
                                />
                                <button className="px-4 py-2 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 rounded-lg text-sm font-bold transition-colors">
                                    Aplicar
                                </button>
                            </div>

                            <div className="h-px bg-slate-200 dark:bg-slate-700 my-2"></div>

                            <div className="flex justify-between items-end">
                                <span className="text-slate-500 font-medium">Total</span>
                                <span className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">{formatPrice(total)}</span>
                            </div>

                            <button
                                onClick={handleCheckout}
                                disabled={items.length === 0}
                                className="w-full bg-primary hover:bg-blue-600 text-white py-4 px-6 rounded-xl font-bold text-base shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all transform active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Proceder al Pago
                                <span className="material-symbols-outlined">arrow_forward</span>
                            </button>

                            <div className="flex items-center justify-center gap-2 text-xs text-slate-400 mt-2">
                                <span className="material-symbols-outlined !text-sm">lock</span>
                                Pago seguro SSL encriptado
                            </div>
                        </div>

                        {/* Customer Info Card */}
                        <div className="mt-6 bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">Cliente</h4>
                                <a href="#" className="text-primary text-xs font-bold hover:underline">Cambiar</a>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="size-10 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-500 font-bold overflow-hidden">
                                    {user?.name ? (
                                        <img
                                            src={`https://ui-avatars.com/api/?name=${user.name}&background=random`}
                                            alt={user.name}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <span>CL</span>
                                    )}
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-slate-900 dark:text-white">{user?.name || 'Invitado'}</p>
                                    <p className="text-xs text-slate-500">{user?.email || 'email@ejemplo.com'}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
