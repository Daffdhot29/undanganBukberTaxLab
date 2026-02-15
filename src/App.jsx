import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import Invitation from "./components/Invitation";
import HomePage from "./components/Home";
import Backsound from './components/Backsound';
import PageTransition from './components/PageTransition';
// 1. Import komponen baru
import FallingDatesBg from './components/FallingDatesBg'; 

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route 
          path="/" 
          element={
            <PageTransition>
              <HomePage />
            </PageTransition>
          } 
        />
        <Route 
          path="/Invitation" 
          element={
            <PageTransition>
              <Invitation />
            </PageTransition>
          } 
        />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    // Pastikan relative dan overflow-hidden
    <div className="relative w-full min-h-screen overflow-hidden bg-[#F5EFE6]">
      <BrowserRouter>
        
        {/* 2. Pasang Background Kurma Jatuh di sini */}
        {/* Posisinya di atas AnimatedRoutes agar z-indexnya bekerja benar sebagai background */}
        <FallingDatesBg />

        <Backsound />
        
        {/* Konten halaman akan berada di atas background kurma karena struktur CSSnya */}
        <AnimatedRoutes />
      </BrowserRouter>
    </div>
  );
}

export default App;