import React, { createContext, useContext, useState, useCallback } from 'react';

// Types 
export interface User {
    id: string;
    name: string;
    email: string;
    company: string;
    role: 'admin' | 'client';
    sector?: string;
    joinedAt: string;
}

export interface Product {
    id: string;
    name: string;
    sector: string;
    category: string;
    priceFrom: number;
    priceTo: number;
    colors: string[];
    description: string;
    materials: string[];
    sizes: string[];
    minOrder: number;
    iconName: string;
}

export interface QuoteItem {
    product: Product;
    quantity: number;
    selectedColor: string;
    sizes: { size: string; qty: number }[];
    notes: string;
}

interface AppContextType {
    // Auth
    user: User | null;
    login: (email: string, password: string) => Promise<boolean>;
    register: (data: RegisterData) => Promise<boolean>;
    logout: () => void;
    // Quote Cart
    quoteItems: QuoteItem[];
    addToQuote: (item: QuoteItem) => void;
    removeFromQuote: (productId: string) => void;
    updateQuoteItem: (productId: string, updates: Partial<QuoteItem>) => void;
    clearQuote: () => void;
    quoteCount: number;
}

interface RegisterData {
    name: string;
    email: string;
    password: string;
    company: string;
    sector: string;
}

// Mock Data 
const MOCK_USER: User = {
    id: 'usr_001',
    name: 'Carlos Mendoza',
    email: 'carlos@empresa.com',
    company: 'Grupo Empresarial Andino S.A.',
    role: 'client',
    sector: 'Empresarial',
    joinedAt: '2024-03-15',
};

// Context 
const AppContext = createContext<AppContextType | null>(null);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [quoteItems, setQuoteItems] = useState<QuoteItem[]>([]);

    // Auth
    const login = useCallback(async (email: string, _password: string): Promise<boolean> => {
        await new Promise(r => setTimeout(r, 800)); // Simulate API
        if (email && _password.length >= 6) {
            setUser({ ...MOCK_USER, email });
            return true;
        }
        return false;
    }, []);

    const register = useCallback(async (data: RegisterData): Promise<boolean> => {
        await new Promise(r => setTimeout(r, 1000));
        if (data.email && data.password.length >= 6) {
            setUser({
                id: 'usr_new',
                name: data.name,
                email: data.email,
                company: data.company,
                role: 'client',
                sector: data.sector,
                joinedAt: new Date().toISOString().split('T')[0],
            });
            return true;
        }
        return false;
    }, []);

    const logout = useCallback(() => {
        setUser(null);
        setQuoteItems([]);
    }, []);

    // Quote Cart
    const addToQuote = useCallback((item: QuoteItem) => {
        setQuoteItems(prev => {
            const exists = prev.find(i => i.product.id === item.product.id);
            if (exists) {
                return prev.map(i =>
                    i.product.id === item.product.id
                        ? { ...i, quantity: i.quantity + item.quantity }
                        : i
                );
            }
            return [...prev, item];
        });
    }, []);

    const removeFromQuote = useCallback((productId: string) => {
        setQuoteItems(prev => prev.filter(i => i.product.id !== productId));
    }, []);

    const updateQuoteItem = useCallback((productId: string, updates: Partial<QuoteItem>) => {
        setQuoteItems(prev =>
            prev.map(i => i.product.id === productId ? { ...i, ...updates } : i)
        );
    }, []);

    const clearQuote = useCallback(() => setQuoteItems([]), []);

    const quoteCount = quoteItems.reduce((sum, i) => sum + i.quantity, 0);

    return (
        <AppContext.Provider value={{
            user, login, register, logout,
            quoteItems, addToQuote, removeFromQuote, updateQuoteItem, clearQuote, quoteCount,
        }}>
            {children}
        </AppContext.Provider>
    );
};

export const useApp = () => {
    const ctx = useContext(AppContext);
    if (!ctx) throw new Error('useApp must be used within AppProvider');
    return ctx;
};