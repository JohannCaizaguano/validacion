"use client"

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { Loader2, LogIn, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

import { loginSchema, LoginFormValues } from '@/schemas/login.schema';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function LoginPage() {
    const { login } = useAuth();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const form = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: ''
        },
        mode: "onChange"
    });

    const { register, handleSubmit, formState: { errors } } = form;

    const onSubmit = async (data: LoginFormValues) => {
        setIsSubmitting(true);
        try {
            await login(data);
            toast.success("¡Bienvenido!", { description: "Inicio de sesión exitoso" });
        } catch (error) {
            toast.error("Error de acceso", {
                description: error instanceof Error ? error.message : "Credenciales inválidas"
            });
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-[#f6f7f8] dark:bg-[#101822]">
            {/* Navbar */}
            <header className="w-full bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center gap-4">
                            <div className="w-8 h-8 flex items-center justify-center text-primary">
                                {/* Abstract Logo */}
                                <svg className="w-full h-full" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8.57829 8.57829C5.52816 11.6284 3.451 15.5145 2.60947 19.7452C1.76794 23.9758 2.19984 28.361 3.85056 32.3462C5.50128 36.3314 8.29667 39.7376 11.8832 42.134C15.4698 44.5305 19.6865 45.8096 24 45.8096C28.3135 45.8096 32.5302 44.5305 36.1168 42.134C39.7033 39.7375 42.4987 36.3314 44.1494 32.3462C45.8002 28.361 46.2321 23.9758 45.3905 19.7452C44.549 15.5145 42.4718 11.6284 39.4217 8.57829L24 24L8.57829 8.57829Z" fill="currentColor"></path>
                                </svg>
                            </div>
                            <h2 className="text-slate-900 dark:text-white text-lg font-bold tracking-tight">Gestión de Pedidos</h2>
                        </div>
                        <div className="hidden md:flex items-center gap-6">
                            <a href="#" className="text-slate-600 dark:text-slate-400 text-sm font-medium hover:text-primary transition-colors">Ayuda</a>
                            <a href="#" className="text-sm font-bold text-primary hover:text-blue-600 dark:hover:text-blue-400">
                                Registrarse
                            </a>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-grow flex items-center justify-center p-4 sm:p-6 lg:p-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full max-w-md"
                >
                    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
                        {/* Login Header */}
                        <div className="px-8 pt-10 pb-6 text-center">
                            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-3 tracking-tight">Bienvenido de nuevo</h1>
                            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                                Ingresa tus credenciales para acceder al panel de gestión.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)} className="px-8 pb-10 flex flex-col gap-5">

                            {/* Email Field */}
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="email" className="text-slate-900 dark:text-slate-200 text-sm font-bold">Correo electrónico</Label>
                                <div className="relative">
                                    <Input
                                        id="email"
                                        placeholder="nombre@tienda.com"
                                        type="email"
                                        {...register("email")}
                                        className={`h-12 px-4 rounded-lg bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 focus:border-primary focus:ring-primary/50 text-base ${errors.email ? 'border-red-500' : ''}`}
                                    />
                                    {errors.email && (
                                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                                            <AlertCircle className="h-5 w-5 text-red-500" />
                                        </div>
                                    )}
                                </div>
                                {errors.email && (
                                    <span className="text-xs text-red-500 font-medium">{errors.email.message}</span>
                                )}
                            </div>

                            {/* Password Field */}
                            <div className="flex flex-col gap-2">
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="password" className="text-slate-900 dark:text-slate-200 text-sm font-bold">Contraseña</Label>
                                    <a href="#" className="text-primary hover:text-blue-600 dark:hover:text-blue-400 text-sm font-medium hover:underline">
                                        ¿Olvidaste tu contraseña?
                                    </a>
                                </div>
                                <div className="relative">
                                    <Input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="••••••••"
                                        {...register("password")}
                                        className={`h-12 pl-4 pr-12 rounded-lg bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 focus:border-primary focus:ring-primary/50 text-base ${errors.password ? 'border-red-500' : ''}`}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-0 top-0 h-full px-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 flex items-center justify-center rounded-r-lg focus:outline-none"
                                    >
                                        {showPassword ? (
                                            <EyeOff className="h-5 w-5" />
                                        ) : (
                                            <Eye className="h-5 w-5" />
                                        )}
                                    </button>
                                </div>
                                {errors.password && (
                                    <span className="text-xs text-red-500 font-medium">{errors.password.message}</span>
                                )}
                            </div>

                            {/* Submit Button */}
                            <Button
                                type="submit"
                                className="mt-4 w-full h-12 bg-primary hover:bg-blue-600 text-white font-bold rounded-lg shadow-lg shadow-primary/30 text-base transition-all transform active:scale-[0.98]"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                                <span>Iniciar Sesión</span>
                                {!isSubmitting && <LogIn className="ml-2 h-4 w-4" />}
                            </Button>
                        </form>

                        {/* Footer / Register */}
                        <div className="px-8 py-4 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800 text-center">
                            <p className="text-slate-600 dark:text-slate-400 text-sm">
                                ¿No tienes una cuenta?
                                <a href="#" className="text-primary font-bold hover:underline ml-1">Regístrate aquí</a>
                            </p>
                        </div>
                    </div>

                    {/* Footer Meta */}
                    <div className="mt-8 text-center flex flex-col gap-2 opacity-60 hover:opacity-100 transition-opacity">
                        <div className="flex items-center justify-center gap-4 text-xs text-slate-500 dark:text-slate-500">
                            <a href="#" className="hover:text-slate-800 dark:hover:text-slate-300">Privacidad</a>
                            <span>•</span>
                            <a href="#" className="hover:text-slate-800 dark:hover:text-slate-300">Términos</a>
                            <span>•</span>
                            <a href="#" className="hover:text-slate-800 dark:hover:text-slate-300">Contacto</a>
                        </div>
                        <p className="text-xs text-slate-400 dark:text-slate-600">© 2026 Gestión de Pedidos Inc.</p>
                    </div>
                </motion.div>
            </main>
        </div>
    );
}
