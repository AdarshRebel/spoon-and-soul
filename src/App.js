import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import TopBar from './components/TopBar';

import Home from './pages/Home';
import Blog from './pages/Blog';
import About from './pages/About';
import Contact from './pages/Contact';
import PrivacyPolicy from './pages/PrivacyPolicy';
import RecipeDetail from './pages/RecipeDetail';

import AdminApp from './admin/AdminApp';

export default function App() {
  return (
    <Routes>

      {/* ───── ADMIN ROUTES ───── */}
      <Route path="/admin/*" element={<AdminApp />} />

      {/* ───── USER SITE ───── */}
      <Route
        path="/*"
        element={
          <>
            <TopBar />
            <Navbar />
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/recipe/:slug" element={<RecipeDetail />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              </Routes>
            </main>
            <Footer />
          </>
        }
      />

    </Routes>
  );
}