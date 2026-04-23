import React from 'react';
import { BookOpen, FileText, FileAudio, ShieldAlert, ArrowLeft, Lightbulb, AlertTriangle, MessageSquareWarning } from 'lucide-react';
import { motion } from 'motion/react';

interface GuidePageProps {
  onBack: () => void;
}

export function GuidePage({ onBack }: GuidePageProps) {
  return (
    <div className="w-full max-w-5xl mx-auto py-12 px-4 pb-24">
      <button 
        onClick={onBack}
        className="flex items-center space-x-2 text-sm font-medium text-slate-400 hover:text-slate-900 transition-colors mb-10 group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        <span>Retour à l'accueil</span>
      </button>

      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full"
      >
        <div className="flex flex-col items-center text-center space-y-4 mb-16">
          <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl">
            <BookOpen className="w-8 h-8 text-slate-800" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">Mode d'emploi</h1>
          <p className="text-lg text-slate-500 max-w-2xl font-light">
            Découvrez comment identifier rapidement les tentatives d'escroquerie et protéger vos proches.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Text Guide */}
          <div className="bg-white p-8 md:p-10 rounded-[32px] border border-slate-200 shadow-sm flex flex-col">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-12 h-12 bg-slate-50 border border-slate-100 rounded-full flex items-center justify-center">
                <FileText className="w-6 h-6 text-slate-700" />
              </div>
              <h2 className="text-2xl font-semibold text-slate-900 tracking-tight">Analyse Textuelle</h2>
            </div>
            <div className="space-y-4 text-slate-500 font-light leading-relaxed">
              <p>1. Copiez le texte que vous avez reçu (email, SMS, message WhatsApp ou une offre d'emploi trouvée sur un site).</p>
              <p>2. Allez sur la page <span className="font-medium text-slate-700">Analyser</span> et collez le texte dans le grand champ prévu à cet effet.</p>
              <p>3. Cliquez sur le bouton <span className="font-medium text-slate-700">Analyser le contenu</span>.</p>
              <p>4. Lisez les signaux d'alarme et suivez le conseil immédiat pour savoir comment réagir correctement.</p>
            </div>
          </div>

          {/* Audio Guide */}
          <div className="bg-white p-8 md:p-10 rounded-[32px] border border-slate-200 shadow-sm flex flex-col">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-12 h-12 bg-slate-50 border border-slate-100 rounded-full flex items-center justify-center">
                <FileAudio className="w-6 h-6 text-slate-700" />
              </div>
              <h2 className="text-2xl font-semibold text-slate-900 tracking-tight">Analyse Audio (Deepfake)</h2>
            </div>
            <div className="space-y-4 text-slate-500 font-light leading-relaxed">
              <p>1. Sauvegardez le message vocal suspect sur votre téléphone ou ordinateur (formats .mp3 ou .wav supportés).</p>
              <p>2. Sur la page <span className="font-medium text-slate-700">Analyser</span>, utilisez la zone pour <span className="font-medium text-slate-700">Importer un audio</span>.</p>
              <p>3. Sélectionnez le fichier sur votre appareil puis cliquez sur <span className="font-medium text-slate-700">Analyser le contenu</span>.</p>
              <p>4. L'IA détectera s'il y a des anomalies vocales ou un caractère urgent créé par un clone IA.</p>
            </div>
          </div>
        </div>

        {/* Best Practices Section */}
        <div className="bg-slate-50 p-8 md:p-12 rounded-[32px] border border-slate-200 flex flex-col">
          <div className="flex items-center justify-center space-x-3 mb-10 text-center">
            <ShieldAlert className="w-6 h-6 text-slate-800" />
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">Les 3 Règles d'Or</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm border border-slate-100">
                <AlertTriangle className="w-5 h-5 text-amber-500" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900">L'Urgence est l'ennemie</h3>
              <p className="text-sm text-slate-500 font-light leading-relaxed">
                Un service public, une banque ou un proche ne vous demandera jamais un virement immédiat en 5 minutes pour éviter une catastrophe. Prenez le temps de réfléchir.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm border border-slate-100">
                <MessageSquareWarning className="w-5 h-5 text-rose-500" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900">Raccrochez et Rappelez</h3>
              <p className="text-sm text-slate-500 font-light leading-relaxed">
                Si un conseiller bancaire ou un proche vous appelle pour demander de l'argent de façon inhabituelle, raccrochez et rappelez-le sur son numéro de téléphone officiel.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm border border-slate-100">
                <Lightbulb className="w-5 h-5 text-blue-500" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900">Ne donnez rien</h3>
              <p className="text-sm text-slate-500 font-light leading-relaxed">
                Aucune institution ne vous demandera votre mot de passe, vos identifiants ou vos codes de carte bancaire par téléphone, SMS ou email. Jamais.
              </p>
            </div>
          </div>
        </div>

      </motion.div>
    </div>
  );
}
