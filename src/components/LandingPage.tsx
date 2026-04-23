import React from 'react';
import { Shield, ArrowRight, ShieldAlert, CheckCircle2, Search, Lock } from 'lucide-react';
import { motion } from 'motion/react';

interface LandingPageProps {
  onStart: () => void;
  onGuide: () => void;
}

export function LandingPage({ onStart, onGuide }: LandingPageProps) {
  return (
    <div className="flex flex-col items-center w-full pb-20">
      {/* Hero Section */}
      <section className="w-full bg-white border-b border-slate-200 pt-20 pb-24 px-4 flex flex-col items-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl w-full text-center space-y-8"
        >
          <div className="inline-flex items-center justify-center p-3 bg-slate-50 border border-slate-100 rounded-2xl mb-2">
            <Shield className="w-8 h-8 text-slate-800" />
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-slate-900 tracking-tight leading-[1.1]">
            Ne vous laissez plus <br />
            <span className="text-slate-400 font-light">manipuler en ligne.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed font-light">
            Bouclier Anti-Arnaque utilise l'intelligence artificielle pour analyser instantanément les offres d'emploi, les emails ou les vocaux suspects. Protégez-vous et vos proches en un clic.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-10">
            <button 
              onClick={onStart}
              className="w-full sm:w-auto px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-[24px] transition-all flex items-center justify-center space-x-3 text-lg group"
            >
              <Search className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" />
              <span className="font-medium">Vérifier un message suspect</span>
            </button>
            
            <button 
              onClick={onGuide}
              className="w-full sm:w-auto px-8 py-4 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-[24px] transition-all flex items-center justify-center space-x-3 text-lg"
            >
              <span className="font-medium">Mode d'emploi</span>
              <ArrowRight className="w-5 h-5 text-slate-400" />
            </button>
          </div>
        </motion.div>
      </section>

      {/* Features Grid */}
      <section className="w-full max-w-6xl px-4 mt-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm flex flex-col"
          >
            <div className="w-12 h-12 bg-slate-50 border border-slate-100 rounded-full flex items-center justify-center mb-6">
              <CheckCircle2 className="w-6 h-6 text-slate-700" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-3 tracking-tight">Analyse Textuelle</h3>
            <p className="text-slate-500 leading-relaxed font-light">Copiez-collez n'importe quel texte ou offre d'emploi. Notre système détecte instantanément le jargon suspect, les tactiques d'urgence et la manipulation psychologique.</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm flex flex-col"
          >
            <div className="w-12 h-12 bg-slate-50 border border-slate-100 rounded-full flex items-center justify-center mb-6">
              <ShieldAlert className="w-6 h-6 text-slate-700" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-3 tracking-tight">Détection de Deepfake</h3>
            <p className="text-slate-500 leading-relaxed font-light">Un proche vous demande de l'argent en urgence via un message vocal ? Importez-le pour vérifier son authenticité et détecter les clones vocaux.</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm flex flex-col"
          >
            <div className="w-12 h-12 bg-slate-50 border border-slate-100 rounded-full flex items-center justify-center mb-6">
              <Lock className="w-6 h-6 text-slate-700" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-3 tracking-tight">Respect de la Vie Privée</h3>
            <p className="text-slate-500 leading-relaxed font-light">Aucune donnée analysée n'est stockée ni conservée par nos serveurs. Vos fichiers et messages personnels restent sur votre appareil.</p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
