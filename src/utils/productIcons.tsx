import {
    Shirt, HeartPulse, GraduationCap, Hammer, Sparkles, Scissors, Layers, ShieldAlert,
    type LucideIcon,
} from 'lucide-react';

export const PRODUCT_ICONS: Record<string, LucideIcon> = {
    Shirt,
    HeartPulse,
    GraduationCap,
    Hammer,
    Sparkles,
    Scissors,
    Layers,
    ShieldAlert,
};

export const getProductIcon = (iconName: string): LucideIcon => {
    return PRODUCT_ICONS[iconName] ?? Shirt;
};

export const formatPrice = (value: number): string => {
    return new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        maximumFractionDigits: 0,
    }).format(value);
};