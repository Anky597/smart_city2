import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Traffic from './pages/Traffic';
import Pollution from './pages/Pollution';
import GarbageCollection from './pages/GarbageCollection';
import Disasters from './pages/Disasters';

function App() {
  return (
    <BrowserRouter>
      <div className="flex h-screen bg-gray-50">
        <Sidebar />
        <main className="flex-1 overflow-y-auto">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/traffic" element={<Traffic />} />
            <Route path="/pollution" element={<Pollution />} />
            <Route path="/garbage" element={<GarbageCollection />} />
            <Route path="/disasters" element={<Disasters />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;