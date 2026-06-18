import React from 'react';
import { ArrowRight, Globe } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section className="relative pt-20 pb-20 md:pt-32 md:pb-40 overflow-hidden bg-background">
      {/* Background Image and Overlays */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/imagenes/LogoCotexcal.png" 
          alt="High-tech textile manufacturing facility"
          className="w-full h-full object-cover object-center opacity-30 dark:opacity-20"
        />
        <div className="absolute inset-0 bg-linear-to-r from-background via-background/95 to-transparent"></div>
      </div>

      <div className="max-w-container-max mx-auto px-gutter relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
          <div className="lg:col-span-8 flex flex-col justify-center reveal active">
            
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-primary font-bold mb-6 leading-tight max-w-4xl">
              Uniformes que representan la excelencia de tu organización.
            </h1>
            <p className="font-body text-lg md:text-xl text-on-surface-variant mb-8 max-w-2xl">
              Fabricamos uniformes corporativos, académicos y del sector salud con altos estándares de calidad, personalización y cumplimiento.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <a 
                href="#contacto" 
                className="bg-accent text-primary font-body text-base font-bold px-8 py-3 rounded-default hover:bg-yellow-500 hover:shadow-ambient active:scale-95 transition-all flex items-center justify-center h-12"
              >
                Solicitar cotización
                <ArrowRight className="ml-2 w-5 h-5" />
              </a>
              <a 
                href="#galeria" 
                className="border border-outline text-primary font-body text-base font-bold px-8 py-3 rounded-default hover:border-primary hover:bg-surface/50 backdrop-blur-sm transition-colors flex items-center justify-center h-12"
              >
                Ver catálogo
              </a>
            </div>

            {/* Trust Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-outline-variant/30">
              <div>
                <div className="font-display text-3xl md:text-4xl font-bold text-primary mb-1">+10</div>
                <div className="font-body text-xs text-on-surface-variant uppercase tracking-wider font-semibold">
                  Años Experiencia
                </div>
              </div>
              <div>
                <div className="font-display text-3xl md:text-4xl font-bold text-primary mb-1">+50k</div>
                <div className="font-body text-xs text-on-surface-variant uppercase tracking-wider font-semibold">
                  Uniformes / Año
                </div>
              </div>
              <div>
                <div className="font-display text-3xl md:text-4xl font-bold text-primary mb-1">+500</div>
                <div className="font-body text-xs text-on-surface-variant uppercase tracking-wider font-semibold">
                  Clientes Activos
                </div>
              </div>
              <div>
                <div className="font-display text-3xl md:text-4xl font-bold text-primary mb-1 flex items-center h-10 md:h-11">
                  <Globe className="w-8 h-8 text-primary" />
                </div>
                <div className="font-body text-xs text-on-surface-variant uppercase tracking-wider font-semibold">
                  Cobertura Nacional
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
