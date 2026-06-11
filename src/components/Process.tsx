import React from 'react';

interface ProcessStep {
  number: number;
  title: string;
  description: string;
}

export const Process: React.FC = () => {
  const steps: ProcessStep[] = [
    {
      number: 1,
      title: "Asesoría y Conceptualización",
      description: "Análisis de requerimientos técnicos, imagen corporativa y condiciones de uso de las prendas."
    },
    {
      number: 2,
      title: "Diseño y Moldería",
      description: "Desarrollo de patrones digitales precisos y confección de prototipos físicos para validación."
    },
    {
      number: 3,
      title: "Selección de Materiales",
      description: "Sourcing de textiles técnicos de alto rendimiento y avíos de la más alta resistencia."
    },
    {
      number: 4,
      title: "Producción Industrial",
      description: "Corte automatizado de precisión y costura en líneas de producción altamente optimizadas."
    },
    {
      number: 5,
      title: "Control de Calidad",
      description: "Inspección exhaustiva de 3 puntos (hilos, costura, tallaje) en cada lote terminado."
    },
    {
      number: 6,
      title: "Logística y Entrega",
      description: "Empaque individual por empleado (opcional) y distribución optimizada a nivel nacional."
    }
  ];

  return (
    <section className="py-24 bg-background" id="proceso">
      <div className="max-w-container-max mx-auto px-gutter">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Timeline side */}
          <div className="reveal active">
            <h2 className="font-display text-3xl md:text-4xl text-primary font-bold mb-6">
              Un proceso de manufactura meticuloso
            </h2>
            <p className="font-body text-base md:text-lg text-on-surface-variant mb-12">
              Nuestro flujo de trabajo estructurado garantiza precisión y cumplimiento desde la concepción del diseño hasta la entrega del lote final.
            </p>

            {/* Timeline */}
            <div className="relative timeline-line pl-8 space-y-8">
              {steps.map((step, index) => (
                <div key={index} className="relative reveal active" style={{ transitionDelay: `${index * 50}ms` }}>
                  {/* Bullet */}
                  <div className="absolute -left-8 top-1.5 w-6 h-6 rounded-full bg-background border-2 border-primary flex items-center justify-center z-10">
                    {index === 0 && <div className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse"></div>}
                  </div>

                  <h4 className="font-display text-lg md:text-xl text-primary font-bold mb-1.5">
                    {step.number}. {step.title}
                  </h4>
                  <p className="font-body text-sm md:text-base text-on-surface-variant leading-relaxed">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Image side */}
          <div className="hidden lg:block relative reveal active rounded-xl overflow-hidden shadow-ambient h-170 self-center">
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDqtOxlsHhKNNPFVlRwshLl-ztwdtViBbYXIabZ799fkDgbqiaiLmZaOHdNYWot59AY-2kbm13Qi7nK-23cYcHGfKHhSGYAYMacTjaajwu8_8l7gFZC18K5eKWRie0zNFvy3cdWJTBS89SrZ1POqS-POZxi3sgnczubgXlMNJubpnh-iUsVCmYM1jOxF0n7GheVnVU591vqrO9jUhAaiA548oh9ADMZzXIJqKHq-qQTPdAHZHxgVWp-_cMYesL9NuTirur51EkxrpM" 
              alt="High-quality embroidery process"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
