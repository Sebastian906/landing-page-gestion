import React from 'react';
import { ArrowRight, HardHat } from 'lucide-react';

export const Sectors: React.FC = () => {
  return (
    <section className="py-24 bg-surface-bright" id="sectores">
      <div className="max-w-container-max mx-auto px-gutter">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 reveal active">
          <div>
            <h2 className="font-display text-3xl md:text-4xl text-primary font-bold mb-4">
              Sectores de especialidad
            </h2>
            <p className="font-body text-base md:text-lg text-on-surface-variant max-w-2xl">
              Soluciones textiles diseñadas específicamente para los requerimientos técnicos y de imagen de cada industria.
            </p>
          </div>
          <a 
            href="#galeria" 
            className="mt-4 md:mt-0 inline-flex items-center text-secondary font-body text-sm font-semibold hover:text-primary transition-colors gap-1.5 group"
          >
            Ver portafolio completo 
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-auto md:h-150">
          {/* Sector salud (Large) */}
          <div className="md:col-span-8 rounded-xl overflow-hidden relative group cursor-pointer reveal active">
            <img 
              src="/imagenes/SectorSalud2.png" 
              alt="Group of corporate executives"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-linear-to-t from-primary/95 via-primary/40 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-8 w-full">
              <h3 className="font-display text-2xl md:text-3xl text-on-primary font-bold mb-2">
                Sector Salud
              </h3>
              <p className="font-body text-sm text-on-primary/80 mb-4 max-w-lg md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                Gorras, uniformes y batas antifluidos con tecnología antimicrobiana y diseño ergonómico.
              </p>
              <span className="inline-flex items-center text-accent font-body text-sm font-bold gap-1">
                Explorar sector 
                <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </div>

          {/* Right Column: Empresarial */}
          <div className="md:col-span-4 flex flex-col gap-6">
            {/* Sector empresarial */}
            <div className="h-72 md:h-1/2 rounded-xl overflow-hidden relative group cursor-pointer reveal active" style={{ transitionDelay: '100ms' }}>
              <img 
                src="/imagenes/SectorEmpresarial2.png" 
                alt="Corporate executives in tailored suits"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-t from-primary/95 via-primary/30 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-6 w-full">
                <h3 className="font-display text-xl text-on-primary font-bold mb-1">
                  Sector Empresarial
                </h3>
                <p className="font-body text-xs text-on-primary/80 mb-3 line-clamp-2">
                  Sastrería corporativa de alta gama.Camisas y conjuntos que proyectan autoridad y elegancia para personal de atención.
                </p>
                <span className="inline-flex items-center text-accent font-body text-xs font-bold gap-0.5">
                  Explorar 
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>

                    {/* Sector Academico */}
          <div
            className="h-72 md:h-1/2 rounded-xl overflow-hidden relative group cursor-pointer reveal active"
            style={{ transitionDelay: '200ms' }}
          >
            <img
              src="/imagenes/SectorAcademico2.png"
              alt="Sector Académico"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-linear-to-t from-primary/95 via-primary/30 to-transparent"></div>

            <div className="absolute bottom-0 left-0 p-6 w-full">
              <h3 className="font-display text-xl text-on-primary font-bold mb-1">
                Sector Académico
              </h3>

              <p className="font-body text-xs text-on-primary/80 mb-3">
                Uniformes escolares, universitarios y prendas institucionales
                con altos estándares de calidad y presentación.
              </p>

              <span className="inline-flex items-center text-accent font-body text-xs font-bold gap-0.5">
                Explorar
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
            
            
          </div>
          
        </div>
      </div>
    </section>
  );
};
