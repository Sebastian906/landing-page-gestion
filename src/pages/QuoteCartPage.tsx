import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Minus, Plus, ShoppingBag, ArrowLeft, CheckCircle2, FileText } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { formatPrice } from '../utils/productIcons';
import { submitOrder } from '../lib/ordersService';

export const QuoteCartPage: React.FC = () => {
    const { quoteItems, removeFromQuote, updateQuoteItem, clearQuote, user } = useApp();
    const [submitted, setSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState('');
    const [formData, setFormData] = useState({
        name: user?.name ?? '',
        company: user?.company ?? '',
        email: user?.email ?? '',
        phone: '',
    });

    const totals = useMemo(() => {
        const min = quoteItems.reduce((sum, item) => sum + item.product.priceFrom * item.quantity, 0);
        const max = quoteItems.reduce((sum, item) => sum + item.product.priceTo * item.quantity, 0);
        const totalUnits = quoteItems.reduce((sum, item) => sum + item.quantity, 0);
        return { min, max, totalUnits };
    }, [quoteItems]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitError('');
        setIsSubmitting(true);

        let ok = false;

        if (user) {
            // Authenticated: persist to Supabase
            ok = await submitOrder(quoteItems, formData, user.id);
        } else {
            // Guest: simulate a short delay (no persistence without auth)
            await new Promise((r) => setTimeout(r, 900));
            ok = true;
        };

        setIsSubmitting(false);

        if (ok) {
            clearQuote();
            setSubmitted(true);
        } else {
            setSubmitError('Hubo un problema al enviar tu solicitud. Por favor intenta de nuevo o contáctanos directamente.')};
    };

    // Success screen
    if (submitted) {
        return (
            <div className="bg-background min-h-screen flex items-center justify-center py-24 px-gutter">
                <div className="max-w-lg w-full text-center">
                    <div className="w-16 h-16 rounded-full bg-green-50 border border-green-200 flex items-center justify-center mx-auto mb-6">
                        <CheckCircle2 className="w-8 h-8 text-green-600" />
                    </div>
                    <h1 className="font-display text-2xl md:text-3xl text-primary font-bold mb-4">
                        ¡Solicitud de cotización enviada!
                    </h1>
                    <p className="font-body text-base text-on-surface-variant mb-8">
                        Hemos recibido tu solicitud. Un asesor especializado se comunicará con tu empresa en menos de 24 horas hábiles con una propuesta estructurada.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            to="/catalogo"
                            className="inline-flex items-center justify-center gap-2 border border-outline text-primary font-body text-sm font-bold px-6 py-3 rounded-default hover:border-primary hover:bg-surface-container transition-colors h-12"
                        >
                            Seguir explorando
                        </Link>
                        <Link
                            to="/"
                            className="inline-flex items-center justify-center gap-2 bg-accent text-primary font-body text-sm font-bold px-6 py-3 rounded-default hover:bg-yellow-500 transition-all h-12"
                        >
                            Volver al inicio
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    // Empty cart
    if (quoteItems.length === 0) {
        return (
            <div className="bg-background min-h-screen flex items-center justify-center py-24 px-gutter">
                <div className="max-w-lg w-full text-center">
                    <div className="w-16 h-16 rounded-full bg-surface-container flex items-center justify-center mx-auto mb-6 text-outline-variant">
                        <ShoppingBag className="w-8 h-8" />
                    </div>
                    <h1 className="font-display text-2xl md:text-3xl text-primary font-bold mb-4">
                        Tu cotización está vacía
                    </h1>
                    <p className="font-body text-base text-on-surface-variant mb-8">
                        Explora nuestro catálogo y agrega las prendas que necesitas para tu organización. Podrás revisarlas y enviarlas como una solicitud estructurada.
                    </p>
                    <Link
                        to="/catalogo"
                        className="inline-flex items-center justify-center gap-2 bg-accent text-primary font-body text-sm font-bold px-8 py-3 rounded-default hover:bg-yellow-500 hover:shadow-ambient transition-all h-12"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Ir al catálogo
                    </Link>
                </div>
            </div>
        );
    }

    // Main cart view
    return (
        <div className="bg-background min-h-screen">
            {/* Header */}
            <section className="py-12 bg-surface-bright border-b border-outline-variant/20">
                <div className="max-w-container-max mx-auto px-gutter">
                    <span className="text-secondary font-body text-sm font-semibold tracking-widest uppercase mb-3 block">
                        Solicitud de cotización
                    </span>
                    <h1 className="font-display text-3xl md:text-4xl text-primary font-bold mb-2">
                        Tu cotización
                    </h1>
                    <p className="font-body text-base text-on-surface-variant">
                        Revisa los productos seleccionados, ajusta las cantidades y envía tu solicitud para recibir una propuesta personalizada.
                    </p>
                </div>
            </section>

            <section className="py-12">
                <div className="max-w-container-max mx-auto px-gutter">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

                        {/* Items list */}
                        <div className="lg:col-span-2 space-y-4">
                            {quoteItems.map((item) => {
                                // const Icon = getProductIcon(item.product.iconName)
                                return (
                                    <div
                                        key={item.product.id}
                                        className="bg-surface-container-lowest rounded-xl premium-border shadow-ambient p-5 flex flex-col sm:flex-row gap-5"
                                    >
                                        {/* Product image */}
                                        <div className="w-full sm:w-24 h-24 shrink-0 bg-surface-container rounded-lg overflow-hidden">
                                            <img
                                                src={item.product.image}
                                                alt={item.product.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>

                                        {/* Details */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-start justify-between gap-4 mb-2">
                                                <div>
                                                    <Link
                                                        to={`/catalogo/${item.product.id}`}
                                                        className="font-display text-base text-primary font-bold hover:text-secondary transition-colors"
                                                    >
                                                        {item.product.name}
                                                    </Link>
                                                    <p className="font-body text-xs text-on-surface-variant mt-0.5">
                                                        {item.product.sector} · {item.product.category} · Color:{' '}
                                                        <span className="font-semibold text-on-surface">{item.selectedColor}</span>
                                                    </p>
                                                </div>
                                                <button
                                                    onClick={() => removeFromQuote(item.product.id)}
                                                    className="text-on-surface-variant hover:text-error transition-colors p-1 shrink-0 cursor-pointer"
                                                    aria-label="Eliminar producto"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>

                                            <div className="flex flex-wrap items-end justify-between gap-4 mt-3">
                                                {/* Quantity */}
                                                <div>
                                                    <label className="block font-body text-xs text-on-surface-variant mb-1.5 font-bold uppercase tracking-wider">
                                                        Cantidad
                                                    </label>
                                                    <div className="flex items-center border border-outline-variant rounded-default h-10 overflow-hidden">
                                                        <button
                                                            onClick={() =>
                                                                updateQuoteItem(item.product.id, {
                                                                    quantity: Math.max(item.product.minOrder, item.quantity - 10),
                                                                })
                                                            }
                                                            className="w-9 h-full flex items-center justify-center text-primary hover:bg-surface-container transition-colors cursor-pointer"
                                                        >
                                                            <Minus className="w-3.5 h-3.5" />
                                                        </button>
                                                        <input
                                                            type="number"
                                                            value={item.quantity}
                                                            min={item.product.minOrder}
                                                            onChange={(e) =>
                                                                updateQuoteItem(item.product.id, {
                                                                    quantity: Math.max(
                                                                        item.product.minOrder,
                                                                        Number(e.target.value) || item.product.minOrder
                                                                    ),
                                                                })
                                                            }
                                                            className="w-16 h-full text-center font-body text-sm font-bold text-primary focus:outline-none border-x border-outline-variant"
                                                        />
                                                        <button
                                                            onClick={() =>
                                                                updateQuoteItem(item.product.id, { quantity: item.quantity + 10 })
                                                            }
                                                            className="w-9 h-full flex items-center justify-center text-primary hover:bg-surface-container transition-colors cursor-pointer"
                                                        >
                                                            <Plus className="w-3.5 h-3.5" />
                                                        </button>
                                                    </div>
                                                </div>

                                                {/* Subtotal */}
                                                <div className="text-right">
                                                    <span className="block font-body text-xs text-on-surface-variant uppercase tracking-wider font-semibold mb-1">
                                                        Subtotal estimado
                                                    </span>
                                                    <span className="font-display text-base text-primary font-bold">
                                                        {formatPrice(item.product.priceFrom * item.quantity)} –{' '}
                                                        {formatPrice(item.product.priceTo * item.quantity)}
                                                    </span>
                                                </div>
                                            </div>

                                            {item.notes && (
                                                <p className="font-body text-xs text-on-surface-variant mt-3 pt-3 border-t border-outline-variant/20 italic">
                                                    Nota: {item.notes}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                )
                            })}

                            <div className="flex justify-between items-center pt-2">
                                <Link
                                    to="/catalogo"
                                    className="inline-flex items-center gap-2 text-secondary font-body text-sm font-semibold hover:text-primary transition-colors"
                                >
                                    <ArrowLeft className="w-4 h-4" />
                                    Seguir agregando productos
                                </Link>
                                <button
                                    onClick={clearQuote}
                                    className="font-body text-sm font-semibold text-on-surface-variant hover:text-error transition-colors cursor-pointer"
                                >
                                    Vaciar cotización
                                </button>
                            </div>
                        </div>

                        {/* Summary + form */}
                        <div className="lg:col-span-1">
                            <div className="bg-surface-container-lowest rounded-xl premium-border shadow-ambient p-6 sticky top-28">
                                <h3 className="font-display text-xl text-primary font-bold mb-6 flex items-center gap-2">
                                    <FileText className="w-5 h-5 text-secondary" />
                                    Resumen
                                </h3>

                                <div className="space-y-3 mb-6 pb-6 border-b border-outline-variant/20">
                                    <div className="flex justify-between font-body text-sm">
                                        <span className="text-on-surface-variant">Productos</span>
                                        <span className="font-semibold text-primary">{quoteItems.length}</span>
                                    </div>
                                    <div className="flex justify-between font-body text-sm">
                                        <span className="text-on-surface-variant">Unidades totales</span>
                                        <span className="font-semibold text-primary">{totals.totalUnits}</span>
                                    </div>
                                    <div className="flex justify-between font-body text-sm">
                                        <span className="text-on-surface-variant">Estimado total</span>
                                        <span className="font-bold text-primary text-right">
                                            {formatPrice(totals.min)}
                                            <br />– {formatPrice(totals.max)}
                                        </span>
                                    </div>
                                    <p className="font-body text-xs text-on-surface-variant opacity-70 pt-1">
                                        Los precios finales pueden variar según personalización, volumen y acabados especiales.
                                    </p>
                                </div>

                                {/* Contact form */}
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <h4 className="font-display text-sm text-primary font-bold uppercase tracking-wider">
                                        Datos de contacto
                                    </h4>

                                    {submitError && (
                                        <div className="bg-error-container border border-error/20 text-on-error-container p-3 rounded-lg font-body text-xs">
                                            {submitError}
                                        </div>
                                    )}

                                    <div>
                                        <label className="block font-body text-xs text-on-surface-variant mb-1.5 font-bold uppercase tracking-wider">
                                            Nombre completo
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.name}
                                            onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                                            placeholder="Ej. Juan Pérez"
                                            className="w-full h-11 px-4 border border-outline-variant rounded-default focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/10 transition-all font-body text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="block font-body text-xs text-on-surface-variant mb-1.5 font-bold uppercase tracking-wider">
                                            Empresa
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.company}
                                            onChange={(e) => setFormData((p) => ({ ...p, company: e.target.value }))}
                                            placeholder="Nombre de la empresa"
                                            className="w-full h-11 px-4 border border-outline-variant rounded-default focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/10 transition-all font-body text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="block font-body text-xs text-on-surface-variant mb-1.5 font-bold uppercase tracking-wider">
                                            Correo electrónico
                                        </label>
                                        <input
                                            type="email"
                                            required
                                            value={formData.email}
                                            onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                                            placeholder="ejemplo@empresa.com"
                                            className="w-full h-11 px-4 border border-outline-variant rounded-default focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/10 transition-all font-body text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="block font-body text-xs text-on-surface-variant mb-1.5 font-bold uppercase tracking-wider">
                                            Teléfono
                                        </label>
                                        <input
                                            type="tel"
                                            required
                                            value={formData.phone}
                                            onChange={(e) => setFormData((p) => ({ ...p, phone: e.target.value }))}
                                            placeholder="Ej. 3001234567"
                                            className="w-full h-11 px-4 border border-outline-variant rounded-default focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/10 transition-all font-body text-sm"
                                        />
                                    </div>

                                    {!user && (
                                        <p className="font-body text-xs text-on-surface-variant bg-surface-container-low p-3 rounded-lg">
                                            Tu solicitud se enviará como invitado.{' '}
                                            <Link to="/auth" className="text-secondary font-semibold hover:text-primary">
                                                Inicia sesión
                                            </Link>{' '}
                                            para dar seguimiento a tus cotizaciones desde tu cuenta.
                                        </p>
                                    )}

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full bg-accent text-primary font-body text-base font-bold py-3 rounded-default hover:bg-yellow-500 hover:shadow-ambient active:scale-95 transition-all h-12 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer mt-2"
                                    >
                                        {isSubmitting ? (
                                            <span className="inline-block w-4 h-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                                        ) : (
                                            'Enviar solicitud de cotización'
                                        )}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};