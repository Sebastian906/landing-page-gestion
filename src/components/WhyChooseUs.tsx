import React from 'react';
import { Factory, ShieldAlert, Palette, Shield, Truck, Building2 } from 'lucide-react';

interface ValueCard {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export const WhyChooseUs: React.FC = () => {
  const cards: ValueCard[] = [
    {
      icon: <Factory className="w-6 h-6" />,
      title: "Producción propia",
      description: "No tercerizamos. Nuestras instalaciones albergan tecnología de punta para manufactura directa."
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Control de calidad",
      description: "Inspección de 3 puntos en cada lote. Garantizamos consistencia de color, resistencia de costuras y medidas exactas."
    },
    {
      icon: <Palette className="w-6 h-6" />,
      title: "Diseños personalizados",
      description: "Adaptamos la moldería a las necesidades ergonómicas de su equipo, incorporando su identidad visual corporativa."
    },
    {
      icon: <ShieldAlert className="w-6 h-6" />,
      title: "Durabilidad",
      description: "Textiles técnicos seleccionados específicamente para resistir el uso industrial y lavados frecuentes."
    },
    {
      icon: <Truck className="w-6 h-6" />,
      title: "Entregas oportunas",
      description: "Logística integrada y planificación de producción que asegura el cumplimiento estricto de los tiempos acordados."
    },
    {
      icon: <Building2 className="w-6 h-6" />,
      title: "Escala industrial",
      description: "Capacidad instalada para atender dotaciones masivas sin comprometer la calidad ni el detalle."
    }
  ];

  return (
    <section className="py-24 bg-background" id="calidad">
      <div className="max-w-container-max mx-auto px-gutter">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 reveal active">
          <h2 className="font-display text-3xl md:text-4xl text-primary font-bold mb-4">
            El estándar Cotexcal
          </h2>
          <p className="font-body text-base md:text-lg text-on-surface-variant">
            Controlamos cada etapa del proceso para garantizar una calidad impecable, desde la selección del hilo hasta la entrega final.
          </p>
        </div>

        {/* Value Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card, index) => (
            <div
              key={index}
              className="bg-surface-container-lowest p-8 rounded-xl premium-border shadow-ambient reveal active transition-all duration-300"
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center mb-6 text-secondary">
                {card.icon}
              </div>
              <h3 className="font-display text-xl text-primary font-bold mb-3">
                {card.title}
              </h3>
              <p className="font-body text-sm text-on-surface-variant leading-relaxed">
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
