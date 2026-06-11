import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-primary dark:bg-primary-container border-t border-primary-fixed-variant/20">
      <div className="max-w-container-max mx-auto py-16 px-gutter grid grid-cols-1 md:grid-cols-4 gap-12 text-on-primary">
        {/* Brand Block */}
        <div className="md:col-span-1">
          <a href="#" className="font-display text-2xl font-bold mb-4 block hover:opacity-90">
            Cotexcal
          </a>
          <p className="font-body text-sm text-on-primary/70 leading-relaxed mb-6">
            Precision Tailoring at Industrial Scale. Soluciones textiles de alto rendimiento para organizaciones exigentes.
          </p>
        </div>

        {/* Links Blocks */}
        <div className="md:col-span-2 flex flex-wrap gap-x-16 gap-y-8 md:justify-center">
          {/* Column 1 */}
          <div className="flex flex-col space-y-3 min-w-30">
            <h4 className="font-display text-sm font-bold text-on-primary mb-2">Compañía</h4>
            <a href="#" className="font-body text-sm text-on-primary/70 hover:text-on-primary hover:underline transition-all">
              Sobre Nosotros
            </a>
            <a href="#proceso" className="font-body text-sm text-on-primary/70 hover:text-on-primary hover:underline transition-all">
              Proceso de Calidad
            </a>
            <a href="#" className="font-body text-sm text-on-primary/70 hover:text-on-primary hover:underline transition-all">
              Sostenibilidad
            </a>
            <a href="#" className="font-body text-sm text-on-primary/70 hover:text-on-primary hover:underline transition-all">
              Carreras
            </a>
          </div>

          {/* Column 2 */}
          <div className="flex flex-col space-y-3 min-w-30">
            <h4 className="font-display text-sm font-bold text-on-primary mb-2">Soporte</h4>
            <a href="#contacto" className="font-body text-sm text-on-primary/70 hover:text-on-primary hover:underline transition-all">
              Contacto
            </a>
            <a href="#faq" className="font-body text-sm text-on-primary/70 hover:text-on-primary hover:underline transition-all">
              FAQ
            </a>
            <a href="#" className="font-body text-sm text-on-primary/70 hover:text-on-primary hover:underline transition-all">
              Guía de Tallas
            </a>
          </div>

          {/* Column 3 */}
          <div className="flex flex-col space-y-3 min-w-30">
            <h4 className="font-display text-sm font-bold text-on-primary mb-2">Legal</h4>
            <a href="#" className="font-body text-sm text-on-primary/70 hover:text-on-primary hover:underline transition-all">
              Privacidad
            </a>
            <a href="#" className="font-body text-sm text-on-primary/70 hover:text-on-primary hover:underline transition-all">
              Términos de Servicio
            </a>
          </div>
        </div>

        {/* Copyright Block */}
        <div className="md:col-span-1 flex flex-col items-start md:items-end md:text-right">
          <p className="font-body text-xs text-on-primary/60 leading-relaxed">
            © 2026 Cotexcal Manufacturing. <br />
            Todos los derechos reservados. <br />
            Precision Tailoring at Industrial Scale.
          </p>
        </div>
      </div>
    </footer>
  );
};
