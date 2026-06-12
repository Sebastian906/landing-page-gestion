import React, { useState } from 'react';
import { Menu, X, LogIn, ShoppingBag, LogOut, LayoutDashboard } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout, quoteCount } = useApp();
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="bg-surface/90 backdrop-blur-md sticky top-0 z-50 border-b border-outline-variant/30 transition-all duration-300">
      <div className="max-w-container-max mx-auto flex justify-between items-center h-20 px-gutter">
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/" className="font-display text-2xl font-bold tracking-tighter text-primary hover:opacity-95 transition-opacity">
            Cotexcal Manufacturing
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          {isHome ? (
            <>
              <a href="#sectores" className="text-on-surface-variant hover:text-primary transition-colors font-body text-sm font-semibold">Sectores</a>
              <a href="#proceso" className="text-on-surface-variant hover:text-primary transition-colors font-body text-sm font-semibold">Proceso</a>
              <a href="#calidad" className="text-on-surface-variant hover:text-primary transition-colors font-body text-sm font-semibold">Calidad</a>
            </>
          ) : null}
          <Link
            to="/catalogo"
            className={`transition-colors font-body text-sm font-semibold ${location.pathname.startsWith('/catalogo') ? 'text-primary' : 'text-on-surface-variant hover:text-primary'}`}
          >
            Catálogo
          </Link>
          {isHome && (
            <a href="#faq" className="text-on-surface-variant hover:text-primary transition-colors font-body text-sm font-semibold">FAQ</a>
          )}
        </nav>

        {/* Desktop CTAs */}
        <div className="hidden md:flex items-center space-x-4">
          {/* Quote Cart */}
          <Link
            to="/cotizacion"
            className="relative text-primary hover:text-secondary transition-colors p-2 rounded-lg hover:bg-surface-container"
            title="Mi cotización"
          >
            <ShoppingBag className="w-5 h-5" />
            {quoteCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-accent text-primary text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center leading-none">
                {quoteCount > 9 ? '9+' : quoteCount}
              </span>
            )}
          </Link>

          {user ? (
            <div className="flex items-center space-x-3">
              <Link
                to="/cuenta"
                className="flex items-center gap-2 text-on-surface-variant hover:text-primary font-body text-sm font-semibold transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-on-secondary text-xs font-bold">
                  {user.name.charAt(0)}
                </div>
                <span className="hidden lg:inline">{user.name.split(' ')[0]}</span>
              </Link>
              <button
                onClick={handleLogout}
                className="text-on-surface-variant hover:text-primary transition-colors p-2 rounded-lg hover:bg-surface-container"
                title="Cerrar sesión"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <>
              <Link
                to="/auth"
                className="flex items-center gap-1.5 text-primary hover:text-secondary font-body text-sm font-semibold transition-colors"
              >
                <LogIn className="w-4 h-4" />
                Iniciar sesión
              </Link>
              <Link
                to="/contacto"
                className="bg-accent text-primary font-body text-sm font-bold px-6 py-3 rounded-default hover:bg-yellow-500 hover:shadow-ambient active:scale-95 transition-all duration-200 flex items-center justify-center h-12"
              >
                Solicitar Cotización
              </Link>
            </>
          )}
        </div>

        {/* Mobile: cart + burger */}
        <div className="md:hidden flex items-center gap-3">
          <Link to="/cotizacion" className="relative text-primary p-1">
            <ShoppingBag className="w-5 h-5" />
            {quoteCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-accent text-primary text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center leading-none">
                {quoteCount > 9 ? '9+' : quoteCount}
              </span>
            )}
          </Link>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-primary p-2 focus:outline-none"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-surface border-b border-outline-variant/30 py-4 px-gutter flex flex-col space-y-4 shadow-ambient">
          {isHome && (
            <>
              <a href="#sectores" onClick={() => setIsMobileMenuOpen(false)} className="text-on-surface-variant hover:text-primary transition-colors font-body text-base font-semibold py-2">Sectores</a>
              <a href="#proceso" onClick={() => setIsMobileMenuOpen(false)} className="text-on-surface-variant hover:text-primary transition-colors font-body text-base font-semibold py-2">Proceso</a>
              <a href="#calidad" onClick={() => setIsMobileMenuOpen(false)} className="text-on-surface-variant hover:text-primary transition-colors font-body text-base font-semibold py-2">Calidad</a>
            </>
          )}
          <Link to="/catalogo" onClick={() => setIsMobileMenuOpen(false)} className="text-on-surface-variant hover:text-primary transition-colors font-body text-base font-semibold py-2">Catálogo</Link>
          {isHome && <a href="#faq" onClick={() => setIsMobileMenuOpen(false)} className="text-on-surface-variant hover:text-primary transition-colors font-body text-base font-semibold py-2">FAQ</a>}

          <div className="pt-4 border-t border-outline-variant/30 flex flex-col space-y-3">
            {user ? (
              <>
                <Link to="/cuenta" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-2 text-primary font-body text-base font-semibold py-2">
                  <LayoutDashboard className="w-5 h-5" /> Mi cuenta
                </Link>
                <button onClick={handleLogout} className="flex items-center gap-2 text-on-surface-variant font-body text-base font-semibold py-2 text-left">
                  <LogOut className="w-5 h-5" /> Cerrar sesión
                </button>
              </>
            ) : (
              <>
                <Link to="/auth" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center justify-center gap-2 border border-outline text-primary font-body text-base font-bold py-3 rounded-default hover:bg-surface-container transition-colors">
                  <LogIn className="w-5 h-5" /> Iniciar sesión
                </Link>
                <Link to="/auth?tab=registro" onClick={() => setIsMobileMenuOpen(false)} className="bg-accent text-primary text-center font-body text-base font-bold py-3 rounded-default hover:bg-yellow-500 active:scale-95 transition-all">
                  Registrarse
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
