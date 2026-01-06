"use client"

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '@/types';
import { authService } from '@/services/auth.service';
import { LoginFormValues } from '@/schemas/login.schema';
import { useRouter } from 'next/navigation';

interface AuthContextType {
    user: User | null;
    login: (credentials: LoginFormValues) => Promise<void>;
    logout: () => void;
    isLoading: boolean;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        // Check for persisted user
        const currentUser = authService.getCurrentUser();
        if (currentUser) {
            setUser(currentUser);
        }
        setIsLoading(false);
    }, []);

    const login = async (credentials: LoginFormValues) => {
        try {
            const loggedUser = await authService.login(credentials);
            setUser(loggedUser);
            localStorage.setItem('user', JSON.stringify(loggedUser));
            router.push('/products');
        } catch (error) {
            throw error;
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
        router.push('/login');
    };

    return (
        <AuthContext.Provider value={{
            user,
            login,
            logout,
            isLoading,
            isAuthenticated: !!user
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
