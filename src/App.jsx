import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import DocsInstallation from './pages/DocsInstallation';
import DocsTools from './pages/DocsTools';
import DocsArchitecture from './pages/DocsArchitecture';
import UseCases from './pages/UseCases';
import Changelog from './pages/Changelog';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col justify-between bg-white text-zinc-900 dark:bg-[#09090b] dark:text-zinc-100 font-sans selection:bg-brand-500 selection:text-white transition-colors duration-200">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/docs" element={<Navigate to="/docs/installation" replace />} />
            <Route path="/docs/installation" element={<DocsInstallation />} />
            <Route path="/docs/tools" element={<DocsTools />} />
            <Route path="/docs/architecture" element={<DocsArchitecture />} />
            <Route path="/use-cases" element={<UseCases />} />
            <Route path="/changelog" element={<Changelog />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
