import React, { useState } from 'react';
import { Shield } from 'lucide-react';
import { LandingPage } from './components/LandingPage';
import { AnalyzePage } from './components/AnalyzePage';
import { GuidePage } from './components/GuidePage';

type View = 'home' | 'analyze' | 'guide';

export default function App() {
  const [currentView, setCurrentView] = useState<View>('home');

  return (
    <div className="w-full h-full bg-slate-50 font-sans text-slate-900 flex flex-col min-h-screen selection:bg-indigo-100">
      {/* Header */}
      <header className="bg-white border-b border-indigo-100 px-4 md:px-8 py-4">
        <div className="flex justify-between items-center max-w-7xl mx-auto w-full">
          <div 
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={() => setCurrentView('home')}
            role="button"
          >
            <div className="bg-indigo-950 p-2.5 text-white rounded-[14px] shadow-sm group-hover:bg-indigo-900 transition-colors border border-indigo-800">
              <Shield className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-indigo-950 leading-tight tracking-tight">Anti-Arnaque</h1>
              <p className="text-xs text-indigo-600 font-medium hidden sm:block uppercase tracking-wider">Bouclier Numérique</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 md:space-x-3">
            <button 
              onClick={() => setCurrentView('guide')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${currentView === 'guide' ? 'bg-indigo-50 text-indigo-900 border border-indigo-100' : 'text-slate-600 hover:bg-slate-100 hover:text-indigo-900 transparent border border-transparent'}`}
            >
              Mode d'emploi
            </button>
            <button 
              onClick={() => setCurrentView('analyze')}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${currentView === 'analyze' ? 'bg-indigo-950 text-white shadow-sm' : 'bg-indigo-800 text-white hover:bg-indigo-900'}`}
            >
              Analyser
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col items-center w-full">
        {currentView === 'home' && (
          <LandingPage 
            onStart={() => setCurrentView('analyze')} 
            onGuide={() => setCurrentView('guide')} 
          />
        )}
        
        {currentView === 'guide' && (
          <GuidePage onBack={() => setCurrentView('home')} />
        )}
        
        {currentView === 'analyze' && (
          <AnalyzePage onBack={() => setCurrentView('home')} />
        )}
      </main>

      {/* Footer Info */}
      <footer className="px-4 md:px-8 py-6 bg-white border-t border-slate-200 mt-auto">
        <div className="flex flex-col md:flex-row justify-between items-center text-[11px] text-slate-400 uppercase tracking-widest gap-4 max-w-7xl mx-auto w-full font-medium">
          <span className="text-center md:text-left">© {new Date().getFullYear()} Anti-Arnaque - Initiative Citoyenne</span>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            <span>Confidentialité Absolue</span>
            <span className="hidden md:inline">Aucun Stockage</span>
            <span className="hidden sm:inline">Protection des Ainés</span>
          </div>
        </div>
      </footer>
    </div>
  );
}


