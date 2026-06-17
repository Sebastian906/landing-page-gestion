import React, { useState } from 'react';
import { Headset, ClipboardCheck, ClipboardList } from 'lucide-react';
import { submitLead } from '../lib/leadsService'

export const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    volume: 'Menos de 100 prendas',
    email: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const ok = await submitLead(formData)

    setLoading(false)

    if (ok) {
      setSubmitted(true)
      setTimeout(() => {
        setSubmitted(false)
        setFormData({ name: '', company: '', volume: 'Menos de 100 prendas', email: '' })
      }, 5000)
    } else {
      setError('No fue posible enviar tu solicitud. Por favor intenta de nuevo.')
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <section className="py-24 bg-primary relative overflow-hidden" id="contacto">
      {/* Abstract Design Elements */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute -right-20 -top-20 w-150 h-150 rounded-full border border-white/20"></div>
        <div className="absolute -right-40 -top-40 w-200 h-200 rounded-full border border-white/10"></div>
      </div>

      <div className="max-w-container-max mx-auto px-gutter relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Info Side */}
          <div className="reveal active text-on-primary">
            <h2 className="font-display text-3xl md:text-4xl text-on-primary font-bold mb-6 leading-tight">
              Lleva la imagen de tu organización al siguiente nivel.
            </h2>
            <p className="font-body text-base md:text-lg text-on-primary/80 mb-12">
              Contáctanos para agendar una asesoría personalizada. Nuestro equipo de expertos está listo para diseñar la solución textil perfecta para su empresa.
            </p>

            <div className="space-y-6">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mr-4 text-accent">
                  <Headset className="w-5 h-5" />
                </div>
                <span className="font-body text-sm md:text-base font-semibold">
                  Atención corporativa especializada
                </span>
              </div>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mr-4 text-accent">
                  <ClipboardCheck className="w-5 h-5" />
                </div>
                <span className="font-body text-sm md:text-base font-semibold">
                  Muestras físicas disponibles para aprobación
                </span>
              </div>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mr-4 text-accent">
                  <ClipboardList className="w-5 h-5" />
                </div>
                <span className="font-body text-sm md:text-base font-semibold">
                  Cotizaciones estructuradas en 24 horas
                </span>
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="reveal active">
            <div className="bg-surface-container-lowest rounded-xl p-8 shadow-ambient border border-outline-variant/30">
              <h3 className="font-display text-xl md:text-2xl text-primary font-bold mb-6">
                Hablar con un asesor
              </h3>

              {submitted ? (
                <div className="bg-green-50 border border-green-200 text-green-800 p-6 rounded-lg text-center">
                  <p className="font-display font-bold mb-2">¡Solicitud Enviada con Éxito!</p>
                  <p className="font-body text-sm text-green-700">
                    Un asesor especializado se comunicará con su empresa en menos de 24 horas hábiles.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {error && (
                    <div className="bg-error-container border border-error/20 text-on-error-container p-4 rounded-lg font-body text-sm">
                      {error}
                    </div>
                  )}

                  <div>
                    <label className="block font-body text-xs text-on-surface-variant mb-1.5 font-bold uppercase tracking-wider">
                      Nombre Completo
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Ej. Juan Pérez"
                      className="w-full h-12 px-4 border border-outline-variant rounded-default focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/10 transition-all font-body text-sm"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-body text-xs text-on-surface-variant mb-1.5 font-bold uppercase tracking-wider">
                        Empresa
                      </label>
                      <input
                        type="text"
                        name="company"
                        required
                        value={formData.company}
                        onChange={handleInputChange}
                        placeholder="Nombre de la empresa"
                        className="w-full h-12 px-4 border border-outline-variant rounded-default focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/10 transition-all font-body text-sm"
                      />
                    </div>
                    <div>
                      <label className="block font-body text-xs text-on-surface-variant mb-1.5 font-bold uppercase tracking-wider">
                        Volumen estimado
                      </label>
                      <select
                        name="volume"
                        value={formData.volume}
                        onChange={handleInputChange}
                        className="w-full h-12 px-4 border border-outline-variant rounded-default focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/10 transition-all font-body text-sm bg-white"
                      >
                        <option>Menos de 100 prendas</option>
                        <option>100 - 500 prendas</option>
                        <option>500 - 1000 prendas</option>
                        <option>Más de 1000 prendas</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block font-body text-xs text-on-surface-variant mb-1.5 font-bold uppercase tracking-wider">
                      Correo Electrónico Corporativo
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="ejemplo@empresa.com"
                      className="w-full h-12 px-4 border border-outline-variant rounded-default focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/10 transition-all font-body text-sm"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-accent text-primary font-body text-base font-bold py-3 rounded-default hover:bg-yellow-500 hover:shadow-ambient active:scale-95 transition-all h-12 flex items-center justify-center mt-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <span className="inline-block w-4 h-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                    ) : (
                      'Solicitar Cotización'
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
