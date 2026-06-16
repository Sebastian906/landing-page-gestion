import React, { useState, useMemo } from 'react';
import { SlidersHorizontal, X, Search } from 'lucide-react';
import { ProductCard } from '../components/ProductCard';
import { PRODUCTS, SECTORS, CATEGORIES, PRICE_RANGES } from '../data/products';

export const CatalogPage: React.FC = () => {
    const [selectedSector, setSelectedSector] = useState('Todos');
    const [selectedCategory, setSelectedCategory] = useState('Todos');
    const [selectedPriceRange, setSelectedPriceRange] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

    const filteredProducts = useMemo(() => {
        return PRODUCTS.filter(p => {
            const matchesSector = selectedSector === 'Todos' || p.sector === selectedSector;
            const matchesCategory = selectedCategory === 'Todos' || p.category === selectedCategory;
            const range = PRICE_RANGES[selectedPriceRange];
            const matchesPrice = p.priceFrom <= range.max && p.priceTo >= range.min;
            const matchesSearch = searchTerm.trim() === '' ||
                p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                p.description.toLowerCase().includes(searchTerm.toLowerCase());
            return matchesSector && matchesCategory && matchesPrice && matchesSearch;
        });
    }, [selectedSector, selectedCategory, selectedPriceRange, searchTerm]);

    const hasActiveFilters = selectedSector !== 'Todos' || selectedCategory !== 'Todos' || selectedPriceRange !== 0 || searchTerm !== '';

    const resetFilters = () => {
        setSelectedSector('Todos');
        setSelectedCategory('Todos');
        setSelectedPriceRange(0);
        setSearchTerm('');
    };

    const FilterContent = () => (
        <div className="space-y-8">
            {/* Search */}
            <div>
                <h4 className="font-display text-sm text-primary font-bold uppercase tracking-wider mb-3">
                    Buscar
                </h4>
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant" />
                    <input
                        type="text"
                        placeholder="Nombre del producto..."
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        className="w-full h-11 pl-10 pr-4 border border-outline-variant rounded-default focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/10 transition-all font-body text-sm bg-surface-container-lowest"
                    />
                </div>
            </div>

            {/* Sector */}
            <div>
                <h4 className="font-display text-sm text-primary font-bold uppercase tracking-wider mb-3">
                    Sector
                </h4>
                <div className="space-y-2">
                    {SECTORS.map(sector => (
                        <label key={sector} className="flex items-center gap-3 cursor-pointer group">
                            <div className="relative shrink-0">
                                <input
                                    type="radio"
                                    name="sector"
                                    checked={selectedSector === sector}
                                    onChange={() => setSelectedSector(sector)}
                                    className="sr-only"
                                />
                                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors ${selectedSector === sector ? 'border-secondary' : 'border-outline-variant group-hover:border-secondary'
                                    }`}>
                                    {selectedSector === sector && <div className="w-2 h-2 bg-secondary rounded-full" />}
                                </div>
                            </div>
                            <span className={`font-body text-sm transition-colors ${selectedSector === sector ? 'text-primary font-semibold' : 'text-on-surface-variant group-hover:text-primary'
                                }`}>
                                {sector}
                            </span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Category */}
            <div>
                <h4 className="font-display text-sm text-primary font-bold uppercase tracking-wider mb-3">
                    Tipo de Prenda
                </h4>
                <div className="space-y-2">
                    {CATEGORIES.map(cat => (
                        <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                            <div className="relative shrink-0">
                                <input
                                    type="radio"
                                    name="category"
                                    checked={selectedCategory === cat}
                                    onChange={() => setSelectedCategory(cat)}
                                    className="sr-only"
                                />
                                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors ${selectedCategory === cat ? 'border-secondary' : 'border-outline-variant group-hover:border-secondary'
                                    }`}>
                                    {selectedCategory === cat && <div className="w-2 h-2 bg-secondary rounded-full" />}
                                </div>
                            </div>
                            <span className={`font-body text-sm transition-colors ${selectedCategory === cat ? 'text-primary font-semibold' : 'text-on-surface-variant group-hover:text-primary'
                                }`}>
                                {cat}
                            </span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Price range */}
            <div>
                <h4 className="font-display text-sm text-primary font-bold uppercase tracking-wider mb-3">
                    Rango de Precios
                </h4>
                <div className="space-y-2">
                    {PRICE_RANGES.map((range, i) => (
                        <label key={range.label} className="flex items-center gap-3 cursor-pointer group">
                            <div className="relative shrink-0">
                                <input
                                    type="radio"
                                    name="priceRange"
                                    checked={selectedPriceRange === i}
                                    onChange={() => setSelectedPriceRange(i)}
                                    className="sr-only"
                                />
                                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors ${selectedPriceRange === i ? 'border-secondary' : 'border-outline-variant group-hover:border-secondary'
                                    }`}>
                                    {selectedPriceRange === i && <div className="w-2 h-2 bg-secondary rounded-full" />}
                                </div>
                            </div>
                            <span className={`font-body text-sm transition-colors ${selectedPriceRange === i ? 'text-primary font-semibold' : 'text-on-surface-variant group-hover:text-primary'
                                }`}>
                                {range.label}
                            </span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Reset */}
            {hasActiveFilters && (
                <button
                    onClick={resetFilters}
                    className="w-full flex items-center justify-center gap-2 border border-outline-variant text-on-surface-variant font-body text-sm font-semibold py-2.5 rounded-default hover:border-primary hover:text-primary transition-colors cursor-pointer"
                >
                    <X className="w-4 h-4" />
                    Limpiar filtros
                </button>
            )}
        </div>
    );

    return (
        <div className="bg-background min-h-screen">
            {/* Page Header */}
            <section className="py-16 bg-surface-bright border-b border-outline-variant/20">
                <div className="max-w-container-max mx-auto px-gutter">
                    <span className="text-secondary font-body text-sm font-semibold tracking-widest uppercase mb-3 block">
                        Catálogo de productos
                    </span>
                    <h1 className="font-display text-3xl md:text-4xl text-primary font-bold mb-4">
                        Explora nuestra dotación disponible
                    </h1>
                    <p className="font-body text-base text-on-surface-variant max-w-2xl">
                        Filtra por sector, tipo de prenda y rango de precios para encontrar las soluciones textiles ideales para tu organización. Todas las referencias son personalizables y disponibles para cotización.
                    </p>
                </div>
            </section>

            {/* Body */}
            <section className="py-12">
                <div className="max-w-container-max mx-auto px-gutter">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

                        {/* Sidebar - Desktop */}
                        <aside className="hidden lg:block lg:col-span-3">
                            <div className="bg-surface-container-lowest rounded-xl premium-border shadow-ambient p-6 sticky top-28">
                                <h3 className="font-display text-lg text-primary font-bold mb-6 flex items-center gap-2">
                                    <SlidersHorizontal className="w-5 h-5 text-secondary" />
                                    Filtros
                                </h3>
                                <FilterContent />
                            </div>
                        </aside>

                        {/* Mobile filter button */}
                        <div className="lg:hidden col-span-1">
                            <button
                                onClick={() => setMobileFiltersOpen(true)}
                                className="w-full flex items-center justify-center gap-2 border border-outline-variant text-primary font-body text-sm font-bold py-3 rounded-default hover:border-primary transition-colors cursor-pointer"
                            >
                                <SlidersHorizontal className="w-4 h-4" />
                                Filtros
                                {hasActiveFilters && <span className="bg-accent text-primary text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">!</span>}
                            </button>
                        </div>

                        {/* Mobile filter drawer */}
                        {mobileFiltersOpen && (
                            <div className="lg:hidden fixed inset-0 z-50 flex">
                                <div
                                    className="absolute inset-0 bg-primary/40 backdrop-blur-sm"
                                    onClick={() => setMobileFiltersOpen(false)}
                                />
                                <div className="relative bg-surface-container-lowest w-full max-w-sm h-full overflow-y-auto p-6 ml-auto shadow-ambient animate-in">
                                    <div className="flex justify-between items-center mb-6">
                                        <h3 className="font-display text-lg text-primary font-bold flex items-center gap-2">
                                            <SlidersHorizontal className="w-5 h-5 text-secondary" />
                                            Filtros
                                        </h3>
                                        <button onClick={() => setMobileFiltersOpen(false)} className="text-on-surface-variant hover:text-primary">
                                            <X className="w-5 h-5" />
                                        </button>
                                    </div>
                                    <FilterContent />
                                    <button
                                        onClick={() => setMobileFiltersOpen(false)}
                                        className="w-full mt-6 bg-primary text-on-primary font-body text-sm font-bold py-3 rounded-default hover:bg-primary-container transition-all cursor-pointer"
                                    >
                                        Ver {filteredProducts.length} resultados
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Products Grid */}
                        <div className="col-span-1 lg:col-span-9">
                            <div className="flex items-center justify-between mb-6">
                                <p className="font-body text-sm text-on-surface-variant">
                                    Mostrando <span className="font-bold text-primary">{filteredProducts.length}</span> de {PRODUCTS.length} productos
                                </p>
                            </div>

                            {filteredProducts.length > 0 ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                                    {filteredProducts.map((product, index) => (
                                        <ProductCard key={product.id} product={product} index={index} />
                                    ))}
                                </div>
                            ) : (
                                <div className="bg-surface-container-lowest rounded-xl premium-border p-16 text-center">
                                    <p className="font-display text-lg text-primary font-bold mb-2">
                                        No encontramos productos con estos filtros
                                    </p>
                                    <p className="font-body text-sm text-on-surface-variant mb-6">
                                        Intenta ajustar los filtros de búsqueda para ver más resultados.
                                    </p>
                                    <button
                                        onClick={resetFilters}
                                        className="inline-flex items-center gap-2 bg-accent text-primary font-body text-sm font-bold px-6 py-3 rounded-default hover:bg-yellow-500 transition-all cursor-pointer"
                                    >
                                        <X className="w-4 h-4" />
                                        Limpiar filtros
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};