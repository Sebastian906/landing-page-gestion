import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import type { Product } from '../context/AppContext';
import { getProductIcon, formatPrice } from '../utils/productIcons';

interface ProductCardProps {
    product: Product;
    index?: number;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, index = 0 }) => {
    const Icon = getProductIcon(product.iconName);

    return (
        <Link
            to={`/catalogo/${product.id}`}
            className="group bg-surface-container-lowest rounded-xl premium-border shadow-ambient overflow-hidden flex flex-col reveal active transition-all duration-300"
            style={{ transitionDelay: `${index * 40}ms` }}
        >
            {/* Image placeholder using icon */}
            <div className="aspect-square w-full bg-surface-container flex items-center justify-center text-outline-variant group-hover:bg-surface-container-high transition-colors relative overflow-hidden">
                <div className="group-hover:scale-110 group-hover:text-secondary transition-all duration-300">
                    <Icon className="w-12 h-12" strokeWidth={1.5} />
                </div>
                <span className="absolute top-3 left-3 bg-surface-container-lowest/90 backdrop-blur-sm text-on-surface-variant font-body text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-default">
                    {product.sector}
                </span>
            </div>

            {/* Content */}
            <div className="p-5 flex flex-col grow">
                <span className="font-body text-xs text-on-surface-variant uppercase tracking-wider font-semibold mb-1">
                    {product.category}
                </span>
                <h4 className="font-display text-base text-primary font-bold mb-2 leading-snug group-hover:text-secondary transition-colors">
                    {product.name}
                </h4>
                <p className="font-body text-xs text-on-surface-variant leading-relaxed mb-4 line-clamp-2 grow">
                    {product.description}
                </p>

                <div className="flex items-center justify-between pt-3 border-t border-outline-variant/20">
                    <div>
                        <span className="font-display text-sm text-primary font-bold">
                            {formatPrice(product.priceFrom)}
                        </span>
                        <span className="font-body text-xs text-on-surface-variant"> – {formatPrice(product.priceTo)}</span>
                    </div>
                    <span className="inline-flex items-center text-secondary font-body text-xs font-bold gap-1 group-hover:gap-2 transition-all">
                        Ver
                        <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                </div>
            </div>
        </Link>
    );
};