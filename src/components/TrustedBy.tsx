import React from 'react';

export const TrustedBy: React.FC = () => {
  const logos = [
    'LANS',
    'CONSOLATA',
    'U DE CALDAS',
    'U DE MANIZALES',
    'U AUTÓNOMA'
  ];

  return (
    <section className="py-8 border-b border-outline-variant/20 bg-surface-bright overflow-hidden">
      <div className="max-w-container-max mx-auto px-gutter">
        <p className="text-center font-body text-xs text-on-surface-variant mb-6 uppercase tracking-widest font-semibold">
          Confiamos en la excelencia de estas organizaciones
        </p>
        <div className="flex justify-between items-center opacity-60 grayscale space-x-8 overflow-x-auto pb-2 hide-scrollbar">
          {logos.map((logo, index) => (
            <div 
              key={index} 
              className="font-display text-lg md:text-xl font-bold tracking-widest text-primary shrink-0 transition-opacity hover:opacity-100 duration-200 cursor-default px-4"
            >
              {logo}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
