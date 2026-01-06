"use client"

import { useEffect, useState } from 'react';
import { Header } from '@/components/layout/header';
import Link from 'next/link';
import { formatPrice } from '@/lib/utils';
import { OrdersService, Order } from '@/services/orders.service';

export default function OrdersPage() {
    const [orders, setOrders] = useState<Order[]>([]);

    useEffect(() => {
        setOrders(OrdersService.getOrders());
    }, []);

    return (
        <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-white min-h-screen flex flex-col">
            <Header />

            <main className="flex-1 w-full max-w-[1440px] mx-auto p-4 md:px-10 md:py-8 lg:px-20">
                <div className="mb-8">
                    <nav className="flex text-sm text-slate-500 mb-4">
                        <Link href="/" className="hover:text-primary">Inicio</Link>
                        <span className="mx-2">/</span>
                        <span className="text-slate-900 dark:text-slate-200 font-medium">Mis Pedidos</span>
                    </nav>
                    <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight">Historial de Pedidos</h1>
                    <p className="text-slate-500 dark:text-slate-400 text-base mt-2">Revisa tus compras anteriores y su estado.</p>
                </div>

                <div className="flex flex-col gap-6">
                    {orders.length === 0 ? (
                        <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                            <span className="material-symbols-outlined text-6xl text-slate-300 mb-4">history</span>
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white">No tienes pedidos aún</h3>
                            <p className="text-slate-500 mb-6">Tus compras aparecerán aquí.</p>
                            <Link href="/" className="px-6 py-3 bg-primary text-white font-bold rounded-lg hover:bg-blue-600 transition-colors">
                                Ir al Catálogo
                            </Link>
                        </div>
                    ) : (
                        orders.map((order) => (
                            <div key={order.id} className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
                                <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex flex-wrap justify-between items-center gap-4 bg-slate-50/50 dark:bg-slate-800/50">
                                    <div className="flex flex-col">
                                        <span className="text-xs text-slate-500 uppercase font-bold tracking-wider">Pedido ID</span>
                                        <span className="font-bold text-slate-900 dark:text-white">{order.id}</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-xs text-slate-500 uppercase font-bold tracking-wider">Fecha</span>
                                        <span className="text-sm text-slate-700 dark:text-slate-300">
                                            {new Date(order.date).toLocaleDateString('es-ES', {
                                                year: 'numeric', month: 'long', day: 'numeric',
                                                hour: '2-digit', minute: '2-digit'
                                            })}
                                        </span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-xs text-slate-500 uppercase font-bold tracking-wider">Total</span>
                                        <span className="font-bold text-slate-900 dark:text-white">{formatPrice(order.total)}</span>
                                    </div>
                                    <div className="px-3 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-bold uppercase tracking-wide border border-green-200 dark:border-green-900">
                                        {order.status === 'completed' ? 'Completado' : order.status}
                                    </div>
                                </div>
                                <div className="p-6">
                                    <div className="flex flex-col gap-4">
                                        {order.items.map((item, index) => (
                                            <div key={`${order.id}-${item.id}-${index}`} className="flex items-center gap-4">
                                                <div
                                                    className="shrink-0 bg-slate-100 dark:bg-slate-700 rounded-md w-12 h-12 bg-center bg-cover border border-slate-200 dark:border-slate-600"
                                                    style={{ backgroundImage: `url("${item.image || ''}")` }}
                                                ></div>
                                                <div className="flex-1">
                                                    <h4 className="font-bold text-sm text-slate-900 dark:text-white">{item.name}</h4>
                                                    <p className="text-xs text-slate-500">Cantidad: {item.quantity} x {formatPrice(item.price)}</p>
                                                </div>
                                                <span className="font-medium text-slate-900 dark:text-white text-sm">
                                                    {formatPrice(item.price * item.quantity)}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </main>
        </div>
    );
}
