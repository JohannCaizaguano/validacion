import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/hooks/use-auth";
import { CartProvider } from "@/hooks/use-cart";
import { cn } from "@/lib/utils";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope" });

export const metadata: Metadata = {
    title: "Order Management MVP",
    description: "Sistema de gestión de pedidos",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="es" suppressHydrationWarning>
            <head>
                <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
            </head>
            <body className={cn(manrope.className, "min-h-screen bg-background-light dark:bg-background-dark antialiased font-display")}>
                <AuthProvider>
                    <CartProvider>
                        {children}
                        <Toaster position="top-right" richColors closeButton />
                    </CartProvider>
                </AuthProvider>
            </body>
        </html>
    );
}
