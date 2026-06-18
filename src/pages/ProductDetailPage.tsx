import React, { useState, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ChevronRight, ArrowLeft, Minus, Plus, ShoppingBag, CheckCircle2, Package, Ruler, Layers as LayersIcon } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { formatPrice } from '../utils/productIcons';
import { useApp } from '../context/AppContext';
import { ProductCard } from '../components/ProductCard';

export const ProductDetailPage: React.FC = () => {
    const { productId } = useParams<{ productId: string }>();
    const navigate = useNavigate();
    const { addToQuote, user } = useApp();

    const product = useMemo(() => PRODUCTS.find(p => p.id === productId), [productId]);

    const [selectedColor, setSelectedColor] = useState(product?.colors[0] ?? '');
    const [quantity, setQuantity] = useState(product?.minOrder ?? 50);
    const [notes, setNotes] = useState('');
    const [added, setAdded] = useState(false);

    if (!product) {
        return (
            <div className="bg-background min-h-screen flex items-center justify-center py-24">
                <div className="text-center">
                    <h1 className="font-display text-2xl text-primary font-bold mb-4">Producto no encontrado</h1>
                    <p className="font-body text-sm text-on-surface-variant mb-6">
                        El producto que buscas no existe o ha sido removido del catálogo.
                    </p>
                    <Link to="/catalogo" className="inline-flex items-center gap-2 bg-accent text-primary font-body text-sm font-bold px-6 py-3 rounded-default hover:bg-yellow-500 transition-all">
                        <ArrowLeft className="w-4 h-4" />
                        Volver al catálogo
                    </Link>
                </div>
            </div>
        );
    }

    // const Icon = getProductIcon(product.iconName);

    const relatedProducts = PRODUCTS
        .filter(p => p.id !== product.id && (p.sector === product.sector || p.category === product.category))
        .slice(0, 3);

    const handleQuantityChange = (delta: number) => {
        setQuantity(prev => Math.max(product.minOrder, prev + delta));
    };

    const handleAddToQuote = () => {
        addToQuote({
            product,
            quantity,
            selectedColor,
            sizes: [],
            notes,
        });
        setAdded(true);
        setTimeout(() => setAdded(false), 2500);
    };

    return (
        <div className="bg-background min-h-screen">
            {/* Breadcrumb */}
            <div className="border-b border-outline-variant/20 bg-surface-bright">
                <div className="max-w-container-max mx-auto px-gutter py-4">
                    <nav className="flex items-center gap-2 font-body text-sm text-on-surface-variant">
                        <Link to="/" className="hover:text-primary transition-colors">Inicio</Link>
                        <ChevronRight className="w-3.5 h-3.5" />
                        <Link to="/catalogo" className="hover:text-primary transition-colors">Catálogo</Link>
                        <ChevronRight className="w-3.5 h-3.5" />
                        <span className="text-primary font-semibold">{product.name}</span>
                    </nav>
                </div>
            </div>

            {/* Main content */}
            <section className="py-12 md:py-16">
                <div className="max-w-container-max mx-auto px-gutter">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">

                        {/* Image side */}
                        <div className="reveal active">
                            <div className="aspect-square w-full bg-surface-container rounded-xl relative overflow-hidden premium-border">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-cover"
                                />
                                <span className="absolute top-4 left-4 bg-surface-container-lowest/90 backdrop-blur-sm text-on-surface-variant font-body text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-default">
                                    {product.sector}
                                </span>
                            </div>
                            <p className="font-body text-xs text-on-surface-variant text-center mt-3 opacity-70">
                                Imagen ilustrativa. Producto final sujeto a personalización aprobada.
                            </p>
                        </div>

                        {/* Info side */}
                        <div className="reveal active flex flex-col">
                            <span className="font-body text-xs text-secondary uppercase tracking-widest font-bold mb-2">
                                {product.category}
                            </span>
                            <h1 className="font-display text-3xl md:text-4xl text-primary font-bold mb-4 leading-tight">
                                {product.name}
                            </h1>
                            <p className="font-body text-base text-on-surface-variant leading-relaxed mb-6">
                                {product.description}
                            </p>

                            {/* Price */}
                            <div className="flex items-baseline gap-2 mb-6 pb-6 border-b border-outline-variant/20">
                                <span className="font-display text-2xl md:text-3xl text-primary font-bold">
                                    {formatPrice(product.priceFrom)}
                                </span>
                                <span className="font-body text-sm text-on-surface-variant">– {formatPrice(product.priceTo)} / unidad</span>
                            </div>

                            {/* Materials */}
                            <div className="mb-6">
                                <h3 className="font-display text-sm text-primary font-bold uppercase tracking-wider mb-3 flex items-center gap-2">
                                    <LayersIcon className="w-4 h-4 text-secondary" />
                                    Materiales
                                </h3>
                                <ul className="space-y-1.5">
                                    {product.materials.map((m, i) => (
                                        <li key={i} className="font-body text-sm text-on-surface-variant flex items-start gap-2">
                                            <span className="text-secondary mt-1.5 block w-1 h-1 rounded-full bg-secondary shrink-0" />
                                            {m}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Colors */}
                            <div className="mb-6">
                                <h3 className="font-display text-sm text-primary font-bold uppercase tracking-wider mb-3">
                                    Color
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {product.colors.map(color => (
                                        <button
                                            key={color}
                                            onClick={() => setSelectedColor(color)}
                                            className={`font-body text-sm font-semibold px-4 py-2 rounded-default border transition-all cursor-pointer ${selectedColor === color
                                                    ? 'border-secondary bg-secondary text-on-secondary'
                                                    : 'border-outline-variant text-on-surface-variant hover:border-secondary hover:text-primary'
                                                }`}
                                        >
                                            {color}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Sizes available */}
                            <div className="mb-6">
                                <h3 className="font-display text-sm text-primary font-bold uppercase tracking-wider mb-3 flex items-center gap-2">
                                    <Ruler className="w-4 h-4 text-secondary" />
                                    Tallas disponibles
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {product.sizes.map(size => (
                                        <span
                                            key={size}
                                            className="font-body text-xs font-bold px-3 py-1.5 rounded-default bg-surface-container text-on-surface-variant border border-outline-variant/30"
                                        >
                                            {size}
                                        </span>
                                    ))}
                                </div>
                                <p className="font-body text-xs text-on-surface-variant mt-2 opacity-70">
                                    La distribución exacta de tallas se define al confirmar la cotización.
                                </p>
                            </div>

                            {/* Quantity + Min order */}
                            <div className="mb-6">
                                <h3 className="font-display text-sm text-primary font-bold uppercase tracking-wider mb-3 flex items-center gap-2">
                                    <Package className="w-4 h-4 text-secondary" />
                                    Cantidad estimada
                                </h3>
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center border border-outline-variant rounded-default h-12 overflow-hidden">
                                        <button
                                            onClick={() => handleQuantityChange(-10)}
                                            className="w-12 h-full flex items-center justify-center text-primary hover:bg-surface-container transition-colors cursor-pointer"
                                            aria-label="Disminuir cantidad"
                                        >
                                            <Minus className="w-4 h-4" />
                                        </button>
                                        <input
                                            type="number"
                                            value={quantity}
                                            min={product.minOrder}
                                            onChange={e => setQuantity(Math.max(product.minOrder, Number(e.target.value) || product.minOrder))}
                                            className="w-20 h-full text-center font-body text-sm font-bold text-primary focus:outline-none border-x border-outline-variant"
                                        />
                                        <button
                                            onClick={() => handleQuantityChange(10)}
                                            className="w-12 h-full flex items-center justify-center text-primary hover:bg-surface-container transition-colors cursor-pointer"
                                            aria-label="Aumentar cantidad"
                                        >
                                            <Plus className="w-4 h-4" />
                                        </button>
                                    </div>
                                    <span className="font-body text-xs text-on-surface-variant">
                                        Pedido mínimo: <span className="font-bold text-primary">{product.minOrder} unidades</span>
                                    </span>
                                </div>
                            </div>

                            {/* Notes */}
                            <div className="mb-8">
                                <label className="block font-body text-xs text-on-surface-variant mb-1.5 font-bold uppercase tracking-wider">
                                    Notas de personalización (opcional)
                                </label>
                                <textarea
                                    value={notes}
                                    onChange={e => setNotes(e.target.value)}
                                    placeholder="Ej. Bordado de logo en pecho izquierdo, tallas especiales, etc."
                                    rows={3}
                                    className="w-full px-4 py-3 border border-outline-variant rounded-default focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/10 transition-all font-body text-sm resize-none bg-surface-container-lowest"
                                />
                            </div>

                            {/* CTA */}
                            <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                                <button
                                    onClick={handleAddToQuote}
                                    className="flex-1 bg-accent text-primary font-body text-base font-bold px-8 py-3 rounded-default hover:bg-yellow-500 hover:shadow-ambient active:scale-95 transition-all flex items-center justify-center gap-2 h-12 cursor-pointer"
                                >
                                    {added ? (
                                        <>
                                            <CheckCircle2 className="w-5 h-5" />
                                            Agregado a cotización
                                        </>
                                    ) : (
                                        <>
                                            <ShoppingBag className="w-5 h-5" />
                                            Agregar a cotización
                                        </>
                                    )}
                                </button>
                                {added && (
                                    <button
                                        onClick={() => navigate('/cotizacion')}
                                        className="border border-outline text-primary font-body text-base font-bold px-8 py-3 rounded-default hover:border-primary hover:bg-surface-container transition-colors flex items-center justify-center h-12 cursor-pointer"
                                    >
                                        Ver cotización
                                    </button>
                                )}
                            </div>
                            {!user && (
                                <p className="font-body text-xs text-on-surface-variant mt-3 opacity-70">
                                    Podrás revisar y enviar tu cotización sin necesidad de iniciar sesión, pero te recomendamos{' '}
                                    <Link to="/auth" className="text-secondary font-semibold hover:text-primary">crear una cuenta</Link>{' '}
                                    para dar seguimiento a tus pedidos.
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Related products */}
            {relatedProducts.length > 0 && (
                <section className="py-16 bg-surface-bright border-t border-outline-variant/20">
                    <div className="max-w-container-max mx-auto px-gutter">
                        <h2 className="font-display text-2xl md:text-3xl text-primary font-bold mb-8">
                            Productos relacionados
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {relatedProducts.map((p, i) => (
                                <ProductCard key={p.id} product={p} index={i} />
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
};