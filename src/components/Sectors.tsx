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
          {/* Sector Empresarial (Large) */}
          <div className="md:col-span-8 rounded-xl overflow-hidden relative group cursor-pointer reveal active">
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDRNmS_66Nk3DthpSq9dp2i0004vAJtVI-bzoZSsgIuyWw1sHygFP9y-lvvojTCHkyKX5lpOEzTx4EI0ROnnzzuXcKmTjyZDtN8eWGvpqnvc_FMHlS9CHewuhSq8qI0Ou13T7sEn1IhmBZ7WjQCuJnkeLv4ZyMQoHiMNf6sKQ_fJgznoIFiPGjgjy4bLemnae-zy9S5qSCZY5j8JRR_bGrOKingoNPzb3HEFHiYph_VqAMSLRe9-yRUgAyG8SXUkQ3c5A_rQP_dZGU" 
              alt="Group of corporate executives"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-linear-to-t from-primary/95 via-primary/40 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-8 w-full">
              <h3 className="font-display text-2xl md:text-3xl text-on-primary font-bold mb-2">
                Sector Empresarial
              </h3>
              <p className="font-body text-sm text-on-primary/80 mb-4 max-w-lg md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                Sastrería corporativa de alta gama. Trajes, camisas y conjuntos que proyectan autoridad y elegancia para ejecutivos y personal de atención.
              </p>
              <span className="inline-flex items-center text-accent font-body text-sm font-bold gap-1">
                Explorar sector 
                <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </div>

          {/* Right Column: Salud & Industrial */}
          <div className="md:col-span-4 flex flex-col gap-6">
            {/* Sector Salud */}
            <div className="h-72 md:h-1/2 rounded-xl overflow-hidden relative group cursor-pointer reveal active" style={{ transitionDelay: '100ms' }}>
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCMwlTCADYVgG-fFXagwwkylApCmpu4VDGGo6b4hNhRphf88bY_1E0GYww0Mey9-EjABj5ACZidDclwW9xWsF8ZFLpP-rO3_3DalJl5oOHW2S8F_5Rspcgrb535F61mW-P57qOkBucGd_xS-yEhWC7NZkR5vHq19tjIdXIz_01jz-yYbNeTuoMnBxHxIzVi5AjBhh6he8ZUYucc9NbS_f09Pgd40UWcVpw06Q7uYhZdhWuK8u3d67ZAbK3sicnQJQlj7eEvlIXK1_4" 
                alt="Medical professionals in premium scrubs"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-t from-primary/95 via-primary/30 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-6 w-full">
                <h3 className="font-display text-xl text-on-primary font-bold mb-1">
                  Sector Salud
                </h3>
                <p className="font-body text-xs text-on-primary/80 mb-3 line-clamp-2">
                  Scrubs y batas antifluidos con tecnología antimicrobiana y diseño ergonómico.
                </p>
                <span className="inline-flex items-center text-accent font-body text-xs font-bold gap-0.5">
                  Explorar 
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>

            {/* Sector Industrial */}
            <div className="h-72 md:h-1/2 rounded-xl bg-surface-container-high p-8 flex flex-col justify-end relative group cursor-pointer reveal active" style={{ transitionDelay: '200ms' }}>
              <div className="absolute top-8 right-8 text-secondary">
                <HardHat className="w-8 h-8" />
              </div>
              <h3 className="font-display text-xl text-primary font-bold mb-1.5">
                Sector Industrial
              </h3>
              <p className="font-body text-sm text-on-surface-variant mb-4">
                Dotación técnica de alta resistencia. Telas ignífugas, reflectivas y prendas de seguridad (EPP).
              </p>
              <span className="inline-flex items-center text-primary font-body text-sm font-bold gap-1 group-hover:text-secondary transition-colors">
                Explorar 
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
