import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ShoppingBag } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
    return (
        <div className="bg-background min-h-screen flex items-center justify-center py-24 px-gutter">
            <div className="max-w-lg w-full text-center">
                <span className="font-display text-7xl md:text-8xl text-primary font-bold block mb-4">
                    404
                </span>
                <h1 className="font-display text-2xl md:text-3xl text-primary font-bold mb-4">
                    Página no encontrada
                </h1>
                <p className="font-body text-base text-on-surface-variant mb-8">
                    La página que buscas no existe o ha sido movida. Verifica la dirección o regresa al inicio.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link to="/" className="inline-flex items-center justify-center gap-2 border border-outline text-primary font-body text-sm font-bold px-6 py-3 rounded-default hover:border-primary hover:bg-surface-container transition-colors h-12">
                        <ArrowLeft className="w-4 h-4" />
                        Volver al inicio
                    </Link>
                    <Link to="/catalogo" className="inline-flex items-center justify-center gap-2 bg-accent text-primary font-body text-sm font-bold px-6 py-3 rounded-default hover:bg-yellow-500 hover:shadow-ambient transition-all h-12">
                        <ShoppingBag className="w-4 h-4" />
                        Ir al catálogo
                    </Link>
                </div>
            </div>
        </div>
    );
};