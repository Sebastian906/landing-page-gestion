import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

export const Faq: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const faqItems: FaqItem[] = [
    {
      question: "¿Cuál es el volumen mínimo de pedido (MOQ)?",
      answer: "Nuestro volumen mínimo estándar es de 50 prendas por referencia de diseño, lo que nos permite ofrecer precios de escala industrial manteniendo un estricto control de calidad."
    },
    {
      question: "¿Ofrecen muestras físicas antes de iniciar la producción en masa?",
      answer: "Sí, por supuesto. Tras la fase de diseño digital, confeccionamos y enviamos muestras físicas para que su equipo apruebe las telas, la moldería y la moldería antes de la producción industrial."
    },
    {
      question: "¿Cuáles son los tiempos de entrega promedio?",
      answer: "El plazo estándar de entrega es de 30 a 45 días calendario desde la aprobación de la muestra física. Diseñamos planes logísticos a la medida para entregas escalonadas de grandes dotaciones."
    },
    {
      question: "¿Qué tipo de garantía ofrecen en sus prendas?",
      answer: "Ofrecemos garantía de 6 meses contra cualquier defecto de confección (costuras, cremalleras, broches). Todos nuestros textiles cuentan con certificaciones de solidez del color y resistencia al desgaste."
    }
  ];

  const handleToggle = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="py-24 bg-background" id="faq">
      <div className="max-w-container-max mx-auto px-gutter">
        {/* Header */}
        <div className="text-center mb-16 reveal active">
          <h2 className="font-display text-3xl md:text-4xl text-primary font-bold mb-4">
            Preguntas Frecuentes
          </h2>
          <p className="font-body text-base md:text-lg text-on-surface-variant max-w-2xl mx-auto">
            Respuestas a las dudas más comunes sobre nuestro proceso de diseño y producción.
          </p>
        </div>

        {/* Accordions */}
        <div className="max-w-3xl mx-auto space-y-4">
          {faqItems.map((item, index) => {
            const isActive = activeIndex === index;
            return (
              <div 
                key={index} 
                className="border border-outline-variant/30 rounded-xl overflow-hidden bg-surface-container-lowest transition-all"
              >
                {/* Header */}
                <button
                  onClick={() => handleToggle(index)}
                  className={`w-full flex justify-between items-center p-6 text-left font-display text-base font-bold text-primary transition-colors cursor-pointer ${
                    isActive ? 'bg-surface-container-low' : 'hover:bg-surface-container-low/55'
                  }`}
                >
                  <span>{item.question}</span>
                  <ChevronDown 
                    className={`w-5 h-5 text-secondary stroke-[1.5] transition-transform duration-300 ${
                      isActive ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {/* Content */}
                <div 
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    isActive ? 'max-h-40 border-t border-outline-variant/20' : 'max-h-0'
                  }`}
                >
                  <div className="p-6 font-body text-sm md:text-base text-on-surface-variant leading-relaxed">
                    {item.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
