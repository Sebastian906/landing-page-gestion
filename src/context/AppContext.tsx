import React, { createContext, useContext, useState, useCallback, useEffect } from 'react'
import { signIn, signUp, signOut, getSession } from '../lib/authService'
import type { RegisterData } from '../lib/authService'

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
    authLoading: boolean;
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

// Re-export so callers don't need to import from two places
export type { RegisterData }

// Context
const AppContext = createContext<AppContextType | null>(null);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [authLoading, setAuthLoading] = useState(true) // true while restoring session
    const [quoteItems, setQuoteItems] = useState<QuoteItem[]>([]);

    // Restore session on mount (handles page refresh)
    useEffect(() => {
        getSession().then((restored) => {
            setUser(restored)
            setAuthLoading(false)
        });
    }, []);

    // Auth
    const login = useCallback(async (email: string, password: string): Promise<boolean> => {
        const result = await signIn(email, password);
        if (result) {
            setUser(result);
            return true;
        }
        return false;
    }, []);

    const register = useCallback(async (data: RegisterData): Promise<boolean> => {
        const result = await signUp(data)
        if (result) {
            setUser(result);
            return true;
        }
        return false;
    }, []);

    const logout = useCallback(async () => {
        await signOut();
        setUser(null);
        setQuoteItems([]);
    }, []);

    // Quote Cart (kept in memory — persisted to Supabase on submit)
    const addToQuote = useCallback((item: QuoteItem) => {
        setQuoteItems((prev) => {
            const exists = prev.find((i) => i.product.id === item.product.id)
            if (exists) {
                return prev.map((i) =>
                    i.product.id === item.product.id
                        ? { ...i, quantity: i.quantity + item.quantity }
                        : i
                );
            }
            return [...prev, item];
        });
    }, []);

    const removeFromQuote = useCallback((productId: string) => {
        setQuoteItems((prev) => prev.filter((i) => i.product.id !== productId))
    }, []);

    const updateQuoteItem = useCallback((productId: string, updates: Partial<QuoteItem>) => {
        setQuoteItems((prev) =>
            prev.map((i) => (i.product.id === productId ? { ...i, ...updates } : i))
        );
    }, []);

    const clearQuote = useCallback(() => setQuoteItems([]), [])

    const quoteCount = quoteItems.reduce((sum, i) => sum + i.quantity, 0)

    return (
        <AppContext.Provider value={{
                user, authLoading, login, register, logout, quoteItems, addToQuote, removeFromQuote, updateQuoteItem, clearQuote, quoteCount,
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