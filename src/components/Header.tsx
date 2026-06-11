import React, { useState } from 'react';
import { Menu, X, Download } from 'lucide-react';

export const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-surface/90 backdrop-blur-md sticky top-0 z-50 border-b border-outline-variant/30 transition-all duration-300">
      <div className="max-w-container-max mx-auto flex justify-between items-center h-20 px-gutter">
        {/* Logo */}
        <div className="flex items-center">
          <a href="#" className="font-display text-2xl font-bold tracking-tighter text-primary hover:opacity-95 transition-opacity">
            Cotexcal Manufacturing
          </a>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          <a href="#sectores" className="text-on-surface-variant hover:text-primary transition-colors font-body text-sm font-semibold">
            Sectores
          </a>
          <a href="#proceso" className="text-on-surface-variant hover:text-primary transition-colors font-body text-sm font-semibold">
            Proceso
          </a>
          <a href="#calidad" className="text-on-surface-variant hover:text-primary transition-colors font-body text-sm font-semibold">
            Calidad
          </a>
          <a href="#galeria" className="text-on-surface-variant hover:text-primary transition-colors font-body text-sm font-semibold">
            Galería
          </a>
          <a href="#faq" className="text-on-surface-variant hover:text-primary transition-colors font-body text-sm font-semibold">
            FAQ
          </a>
        </nav>

        {/* Desktop Call to Actions */}
        <div className="hidden md:flex items-center space-x-6">
          <a
            href="#galeria"
            className="text-primary hover:text-secondary font-body text-sm font-semibold transition-colors flex items-center gap-1.5"
          >
            <Download className="w-4 h-4" />
            Ver Catálogo
          </a>
          <a
            href="#contacto"
            className="bg-accent text-primary font-body text-sm font-bold px-6 py-3 rounded-default hover:bg-yellow-500 hover:shadow-ambient active:scale-95 transition-all duration-200 flex items-center justify-center h-12"
          >
            Solicitar Cotización
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMobileMenu}
          className="md:hidden text-primary p-2 focus:outline-none"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
        </button>
      </div>

      {/* Mobile Navigation Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-surface border-b border-outline-variant/30 py-4 px-gutter flex flex-col space-y-4 shadow-ambient transition-all duration-300">
          <a
            href="#sectores"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-on-surface-variant hover:text-primary transition-colors font-body text-base font-semibold py-2"
          >
            Sectores
          </a>
          <a
            href="#proceso"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-on-surface-variant hover:text-primary transition-colors font-body text-base font-semibold py-2"
          >
            Proceso
          </a>
          <a
            href="#calidad"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-on-surface-variant hover:text-primary transition-colors font-body text-base font-semibold py-2"
          >
            Calidad
          </a>
          <a
            href="#galeria"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-on-surface-variant hover:text-primary transition-colors font-body text-base font-semibold py-2"
          >
            Galería
          </a>
          <a
            href="#faq"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-on-surface-variant hover:text-primary transition-colors font-body text-base font-semibold py-2"
          >
            FAQ
          </a>
          <div className="pt-4 border-t border-outline-variant/30 flex flex-col space-y-4">
            <a
              href="#galeria"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-primary hover:text-secondary font-body text-base font-semibold py-2 flex items-center justify-center gap-1.5"
            >
              <Download className="w-5 h-5" />
              Ver Catálogo
            </a>
            <a
              href="#contacto"
              onClick={() => setIsMobileMenuOpen(false)}
              className="bg-accent text-primary text-center font-body text-base font-bold py-3 rounded-default hover:bg-yellow-500 active:scale-95 transition-all"
            >
              Solicitar Cotización
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
