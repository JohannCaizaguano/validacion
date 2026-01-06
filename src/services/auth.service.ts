import { User } from '@/types';
import { LoginFormValues } from '@/schemas/login.schema';

// Mock user database
const MOCK_USER: User = {
    id: 'user-123',
    email: 'usuario@test.com',
    name: 'Usuario Demo'
};

export const authService = {
    async login(credentials: LoginFormValues): Promise<User> {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        if (credentials.email === 'usuario@test.com' && credentials.password === 'password123') {
            return MOCK_USER;
        }

        // For testing/mvp: allow any valid email if password is 'password123'
        if (credentials.password === 'password123') {
            return {
                id: 'user-' + Math.random().toString(36).substr(2, 9),
                email: credentials.email,
                name: credentials.email.split('@')[0]
            };
        }

        throw new Error('Credenciales inválidas');
    },

    getCurrentUser(): User | null {
        if (typeof window !== 'undefined') {
            const stored = localStorage.getItem('user');
            return stored ? JSON.parse(stored) : null;
        }
        return null;
    }
};
