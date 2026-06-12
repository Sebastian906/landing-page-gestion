import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ProtectedRoute } from './components/ProtectedRoute';
import { HomePage } from './pages/HomePage';
import { CatalogPage } from './pages/CatalogPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { AuthPage } from './pages/AuthPage';
import { QuoteCartPage } from './pages/QuoteCartPage';
import { AccountDashboardPage } from './pages/AccountDashboardPage';
import { NotFoundPage } from './pages/NotFoundPage';

/**
 * Handles scroll behavior on route changes:
 * - If the URL has a hash (e.g. /#contacto), smooth-scrolls to that section.
 * - Otherwise, scrolls to the top of the page.
 */
function ScrollManager() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const el = document.getElementById(id);
      if (el) {
        // Wait a tick for the route's content to render before scrolling
        requestAnimationFrame(() => {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
        return;
      }
    }
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [location]);

  return null;
}

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
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="bg-background text-on-surface font-body antialiased min-h-screen flex flex-col">
      <ScrollManager />
      <Header />
      <main className="grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/catalogo" element={<CatalogPage />} />
          <Route path="/catalogo/:productId" element={<ProductDetailPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/cotizacion" element={<QuoteCartPage />} />
          <Route
            path="/cuenta"
            element={
              <ProtectedRoute>
                <AccountDashboardPage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
