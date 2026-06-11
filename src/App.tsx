import { useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { TrustedBy } from './components/TrustedBy';
import { WhyChooseUs } from './components/WhyChooseUs';
import { Sectors } from './components/Sectors';
import { Process } from './components/Process';
import { ProductGallery } from './components/ProductGallery';
import { Faq } from './components/Faq';
import { ContactForm } from './components/ContactForm';
import { Footer } from './components/Footer';

function App() {
  useEffect(() => {
    const handleScroll = () => {
      const reveals = document.querySelectorAll('.reveal');
      for (let i = 0; i < reveals.length; i++) {
        const windowHeight = window.innerHeight;
        const elementTop = reveals[i].getBoundingClientRect().top;
        const elementVisible = 100;
        if (elementTop < windowHeight - elementVisible) {
          reveals[i].classList.add('active');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Trigger on mount
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="bg-background text-on-surface font-body antialiased min-h-screen flex flex-col">
      <Header />
      <main className="grow">
        <Hero />
        <TrustedBy />
        <WhyChooseUs />
        <Sectors />
        <Process />
        <ProductGallery />
        <Faq />
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
}

export default App;
