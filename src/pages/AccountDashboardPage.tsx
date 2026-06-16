import React from 'react';
import { Link } from 'react-router-dom';
import {
    User, Building2, Mail, Calendar, FileText, Package,
    ArrowRight, Clock, CheckCircle2, AlertCircle, ShoppingBag,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { formatPrice } from '../utils/productIcons';

interface QuoteRecord {
    id: string;
    date: string;
    items: number;
    units: number;
    estimate: number;
    status: 'pendiente' | 'en_revision' | 'aprobada' | 'completada';
}

const MOCK_QUOTES: QuoteRecord[] = [
    { id: 'COT-2026-0148', date: '2026-06-08', items: 3, units: 250, estimate: 14500000, status: 'en_revision' },
    { id: 'COT-2026-0112', date: '2026-05-22', items: 1, units: 100, estimate: 7800000, status: 'aprobada' },
    { id: 'COT-2026-0087', date: '2026-04-30', items: 2, units: 180, estimate: 11200000, status: 'completada' },
    { id: 'COT-2026-0061', date: '2026-04-02', items: 4, units: 400, estimate: 26500000, status: 'completada' },
];

const STATUS_CONFIG: Record<QuoteRecord['status'], { label: string; icon: React.ReactNode; className: string }> = {
    pendiente: {
        label: 'Pendiente',
        icon: <Clock className="w-3.5 h-3.5" />,
        className: 'bg-surface-container text-on-surface-variant',
    },
    en_revision: {
        label: 'En revisión',
        icon: <AlertCircle className="w-3.5 h-3.5" />,
        className: 'bg-secondary-container text-on-secondary-container',
    },
    aprobada: {
        label: 'Aprobada',
        icon: <CheckCircle2 className="w-3.5 h-3.5" />,
        className: 'bg-green-100 text-green-800',
    },
    completada: {
        label: 'Completada',
        icon: <CheckCircle2 className="w-3.5 h-3.5" />,
        className: 'bg-primary-container text-on-primary',
    },
};

const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('es-CO', { day: 'numeric', month: 'long', year: 'numeric' });
};

export const AccountDashboardPage: React.FC = () => {
    const { user, quoteCount } = useApp();

    if (!user) return null; // ProtectedRoute handles redirect

    const stats = [
        {
            label: 'Cotizaciones enviadas',
            value: MOCK_QUOTES.length,
            icon: <FileText className="w-5 h-5" />,
        },
        {
            label: 'Pedidos completados',
            value: MOCK_QUOTES.filter(q => q.status === 'completada').length,
            icon: <CheckCircle2 className="w-5 h-5" />,
        },
        {
            label: 'En tu cotización actual',
            value: quoteCount,
            icon: <ShoppingBag className="w-5 h-5" />,
        },
    ];

    return (
        <div className="bg-background min-h-screen">
            {/* Header */}
            <section className="py-12 bg-surface-bright border-b border-outline-variant/20">
                <div className="max-w-container-max mx-auto px-gutter">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center text-on-secondary text-2xl font-display font-bold shrink-0">
                                {user.name.charAt(0)}
                            </div>
                            <div>
                                <span className="text-secondary font-body text-sm font-semibold tracking-widest uppercase mb-1 block">
                                    Mi cuenta
                                </span>
                                <h1 className="font-display text-2xl md:text-3xl text-primary font-bold">
                                    Hola, {user.name.split(' ')[0]}
                                </h1>
                            </div>
                        </div>
                        <Link
                            to="/catalogo"
                            className="inline-flex items-center justify-center gap-2 bg-accent text-primary font-body text-sm font-bold px-6 py-3 rounded-default hover:bg-yellow-500 hover:shadow-ambient active:scale-95 transition-all h-12"
                        >
                            Explorar catálogo
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </section>

            <section className="py-12">
                <div className="max-w-container-max mx-auto px-gutter">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

                        {/* Main column */}
                        <div className="lg:col-span-2 space-y-8">

                            {/* Stats */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                {stats.map((stat, i) => (
                                    <div key={i} className="bg-surface-container-lowest rounded-xl premium-border shadow-ambient p-6">
                                        <div className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center mb-4 text-secondary">
                                            {stat.icon}
                                        </div>
                                        <div className="font-display text-2xl md:text-3xl text-primary font-bold mb-1">
                                            {stat.value}
                                        </div>
                                        <div className="font-body text-xs text-on-surface-variant uppercase tracking-wider font-semibold">
                                            {stat.label}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Quote history */}
                            <div className="bg-surface-container-lowest rounded-xl premium-border shadow-ambient overflow-hidden">
                                <div className="p-6 border-b border-outline-variant/20">
                                    <h2 className="font-display text-xl text-primary font-bold flex items-center gap-2">
                                        <FileText className="w-5 h-5 text-secondary" />
                                        Historial de cotizaciones
                                    </h2>
                                </div>

                                {/* Desktop table */}
                                <div className="hidden md:block overflow-x-auto">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="border-b border-outline-variant/20">
                                                <th className="text-left font-body text-xs text-on-surface-variant uppercase tracking-wider font-bold px-6 py-3">Solicitud</th>
                                                <th className="text-left font-body text-xs text-on-surface-variant uppercase tracking-wider font-bold px-6 py-3">Fecha</th>
                                                <th className="text-left font-body text-xs text-on-surface-variant uppercase tracking-wider font-bold px-6 py-3">Productos</th>
                                                <th className="text-left font-body text-xs text-on-surface-variant uppercase tracking-wider font-bold px-6 py-3">Unidades</th>
                                                <th className="text-left font-body text-xs text-on-surface-variant uppercase tracking-wider font-bold px-6 py-3">Estimado</th>
                                                <th className="text-left font-body text-xs text-on-surface-variant uppercase tracking-wider font-bold px-6 py-3">Estado</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {MOCK_QUOTES.map(quote => {
                                                const status = STATUS_CONFIG[quote.status];
                                                return (
                                                    <tr key={quote.id} className="border-b border-outline-variant/10 last:border-0 hover:bg-surface-container-low/50 transition-colors">
                                                        <td className="px-6 py-4 font-body text-sm font-bold text-primary">{quote.id}</td>
                                                        <td className="px-6 py-4 font-body text-sm text-on-surface-variant">{formatDate(quote.date)}</td>
                                                        <td className="px-6 py-4 font-body text-sm text-on-surface-variant">{quote.items}</td>
                                                        <td className="px-6 py-4 font-body text-sm text-on-surface-variant">{quote.units}</td>
                                                        <td className="px-6 py-4 font-body text-sm font-semibold text-primary">{formatPrice(quote.estimate)}</td>
                                                        <td className="px-6 py-4">
                                                            <span className={`inline-flex items-center gap-1.5 font-body text-xs font-bold px-3 py-1.5 rounded-full ${status.className}`}>
                                                                {status.icon}
                                                                {status.label}
                                                            </span>
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>

                                {/* Mobile cards */}
                                <div className="md:hidden divide-y divide-outline-variant/10">
                                    {MOCK_QUOTES.map(quote => {
                                        const status = STATUS_CONFIG[quote.status];
                                        return (
                                            <div key={quote.id} className="p-5">
                                                <div className="flex justify-between items-start mb-3">
                                                    <div>
                                                        <p className="font-body text-sm font-bold text-primary">{quote.id}</p>
                                                        <p className="font-body text-xs text-on-surface-variant">{formatDate(quote.date)}</p>
                                                    </div>
                                                    <span className={`inline-flex items-center gap-1.5 font-body text-xs font-bold px-3 py-1.5 rounded-full ${status.className}`}>
                                                        {status.icon}
                                                        {status.label}
                                                    </span>
                                                </div>
                                                <div className="flex justify-between font-body text-sm">
                                                    <span className="text-on-surface-variant">{quote.items} productos · {quote.units} unidades</span>
                                                    <span className="font-bold text-primary">{formatPrice(quote.estimate)}</span>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        {/* Sidebar - Account info */}
                        <div className="lg:col-span-1">
                            <div className="bg-surface-container-lowest rounded-xl premium-border shadow-ambient p-6 sticky top-28">
                                <h2 className="font-display text-xl text-primary font-bold mb-6 flex items-center gap-2">
                                    <User className="w-5 h-5 text-secondary" />
                                    Datos de la cuenta
                                </h2>

                                <div className="space-y-5">
                                    <div className="flex items-start gap-3">
                                        <User className="w-4 h-4 text-on-surface-variant mt-1 shrink-0" />
                                        <div>
                                            <p className="font-body text-xs text-on-surface-variant uppercase tracking-wider font-semibold mb-0.5">Nombre</p>
                                            <p className="font-body text-sm font-semibold text-primary">{user.name}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <Mail className="w-4 h-4 text-on-surface-variant mt-1 shrink-0" />
                                        <div>
                                            <p className="font-body text-xs text-on-surface-variant uppercase tracking-wider font-semibold mb-0.5">Correo</p>
                                            <p className="font-body text-sm font-semibold text-primary break-all">{user.email}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <Building2 className="w-4 h-4 text-on-surface-variant mt-1 shrink-0" />
                                        <div>
                                            <p className="font-body text-xs text-on-surface-variant uppercase tracking-wider font-semibold mb-0.5">Empresa</p>
                                            <p className="font-body text-sm font-semibold text-primary">{user.company}</p>
                                        </div>
                                    </div>

                                    {user.sector && (
                                        <div className="flex items-start gap-3">
                                            <Package className="w-4 h-4 text-on-surface-variant mt-1 shrink-0" />
                                            <div>
                                                <p className="font-body text-xs text-on-surface-variant uppercase tracking-wider font-semibold mb-0.5">Sector</p>
                                                <p className="font-body text-sm font-semibold text-primary">{user.sector}</p>
                                            </div>
                                        </div>
                                    )}

                                    <div className="flex items-start gap-3">
                                        <Calendar className="w-4 h-4 text-on-surface-variant mt-1 shrink-0" />
                                        <div>
                                            <p className="font-body text-xs text-on-surface-variant uppercase tracking-wider font-semibold mb-0.5">Cliente desde</p>
                                            <p className="font-body text-sm font-semibold text-primary">{formatDate(user.joinedAt)}</p>
                                        </div>
                                    </div>
                                </div>

                                <Link
                                    to="/cotizacion"
                                    className="w-full mt-6 inline-flex items-center justify-center gap-2 border border-outline text-primary font-body text-sm font-bold py-3 rounded-default hover:border-primary hover:bg-surface-container transition-colors h-12"
                                >
                                    <ShoppingBag className="w-4 h-4" />
                                    Ver cotización actual
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};