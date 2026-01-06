"use client"

import React, { useState } from 'react';
import { useCart } from '@/hooks/use-cart';
import { useAuth } from '@/hooks/use-auth';
import { OrdersService } from '@/services/orders.service';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Loader2, ShoppingBag } from 'lucide-react';
import { toast } from 'sonner';

export function CheckoutDialog({ children }: { children: React.ReactNode }) {
    const { items, total, clearCart } = useCart();
    const { user } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);

    const handleConfirmOrder = async () => {
        if (!user) {
            toast.error("Debes iniciar sesión para comprar");
            return;
        }

        setIsProcessing(true);
        try {
            await OrdersService.createOrder(items, total);
            // Note: createOrder is synchronous in mock, so no await needed really but async ok
            toast.success("Pedido Creado", { description: "Tu orden ha sido procesada exitosamente." });
            clearCart();
            setIsOpen(false);
        } catch (error) {
            toast.error("Error al procesar", {
                description: error instanceof Error ? error.message : "Intenta nuevamente"
            });
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Confirmar Pedido</DialogTitle>
                    <DialogDescription>
                        Revisa los detalles de tu compra antes de finalizar.
                    </DialogDescription>
                </DialogHeader>

                <div className="py-4">
                    <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
                        {items.map((item) => (
                            <div key={item.id} className="flex justify-between items-center text-sm">
                                <div className="flex flex-col">
                                    <span className="font-medium">{item.name}</span>
                                    <span className="text-xs text-muted-foreground">x{item.quantity}</span>
                                </div>
                                <span>${(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                        ))}
                    </div>
                    <div className="border-t mt-4 pt-4 flex justify-between items-center font-bold text-lg">
                        <span>Total:</span>
                        <span>${total.toFixed(2)}</span>
                    </div>
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={() => setIsOpen(false)} disabled={isProcessing}>
                        Cancelar
                    </Button>
                    <Button onClick={handleConfirmOrder} disabled={isProcessing}>
                        {isProcessing ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Procesando...
                            </>
                        ) : (
                            <>
                                <ShoppingBag className="mr-2 h-4 w-4" />
                                Confirmar Compra
                            </>
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
