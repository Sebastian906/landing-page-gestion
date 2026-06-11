import React from 'react';
import { Shirt, HeartPulse, GraduationCap, Hammer, Sparkles, Scissors, Layers, ShieldAlert, Download } from 'lucide-react';

interface ProductItem {
  title: string;
  icon: React.ReactNode;
  aspectClass: string;
}

export const ProductGallery: React.FC = () => {
  const items: ProductItem[] = [
    {
      title: "Empresariales",
      icon: <Shirt className="w-8 h-8" />,
      aspectClass: "aspect-square"
    },
    {
      title: "Médicos",
      icon: <HeartPulse className="w-8 h-8" />,
      aspectClass: "aspect-[4/5]"
    },
    {
      title: "Académicos",
      icon: <GraduationCap className="w-8 h-8" />,
      aspectClass: "aspect-[4/3]"
    },
    {
      title: "Dotación",
      icon: <Hammer className="w-8 h-8" />,
      aspectClass: "aspect-square"
    },
    {
      title: "Chaquetas",
      icon: <Sparkles className="w-8 h-8" />,
      aspectClass: "aspect-[3/4]"
    },
    {
      title: "Camisas",
      icon: <Scissors className="w-8 h-8" />,
      aspectClass: "aspect-square"
    },
    {
      title: "Pantalones",
      icon: <Layers className="w-8 h-8" />,
      aspectClass: "aspect-[4/5]"
    },
    {
      title: "Batas",
      icon: <ShieldAlert className="w-8 h-8" />,
      aspectClass: "aspect-square"
    }
  ];

  return (
    <section className="py-24 bg-surface-bright" id="galeria">
      <div className="max-w-container-max mx-auto px-gutter">
        {/* Header */}
        <div className="text-center mb-16 reveal active">
          <h2 className="font-display text-3xl md:text-4xl text-primary font-bold mb-4">
            Catálogo de Productos
          </h2>
          <p className="font-body text-base md:text-lg text-on-surface-variant max-w-2xl mx-auto">
            Explora nuestras categorías principales de manufactura y distribución.
          </p>
        </div>

        {/* Masonry-like grid using columns CSS or flexbox/grid */}
        <div className="columns-1 sm:columns-2 lg:columns-4 gap-6 space-y-6">
          {items.map((item, index) => (
            <div 
              key={index} 
              className={`break-inside-avoid w-full bg-surface-container-lowest p-6 rounded-xl premium-border text-center reveal active cursor-pointer group flex flex-col justify-center items-center shadow-ambient transition-all duration-300`}
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              <div className={`w-full ${item.aspectClass} bg-surface-container rounded-lg mb-4 flex items-center justify-center text-outline-variant group-hover:bg-surface-container-high transition-colors`}>
                <div className="group-hover:scale-110 group-hover:text-secondary transition-all duration-300">
                  {item.icon}
                </div>
              </div>
              <h4 className="font-display text-base text-primary font-bold transition-colors group-hover:text-secondary">
                {item.title}
              </h4>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16 reveal active">
          <a 
            href="#" 
            className="inline-flex items-center text-primary font-body text-sm font-bold border-b-2 border-primary pb-1 hover:text-secondary hover:border-secondary transition-colors gap-1.5"
          >
            Descargar Catálogo Completo (PDF) 
            <Download className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};
