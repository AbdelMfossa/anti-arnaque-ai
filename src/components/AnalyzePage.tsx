import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldAlert, ShieldCheck, Shield, UploadCloud, AlertTriangle, FileAudio, X, Search, AlertOctagon, Info, ArrowLeft } from 'lucide-react';
import { GoogleGenAI, Type } from '@google/genai/web';

// Initialize Gemini
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

type RiskLevel = 'Sûr' | 'Suspect' | 'Danger';

interface AnalysisResult {
  riskLevel: RiskLevel;
  diagnostic: string;
  redFlags: string[];
  advice: string;
}

interface AnalyzePageProps {
  onBack: () => void;
}

export function AnalyzePage({ onBack }: AnalyzePageProps) {
  const [text, setText] = useState('');
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setAudioFile(e.target.files[0]);
    }
  };

  const clearFile = () => {
    setAudioFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const getBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const result = reader.result as string;
        const base64Data = result.split(',')[1];
        resolve(base64Data);
      };
      reader.onerror = (error) => reject(error);
    });
  };

  const analyzeContent = async () => {
    if (!text && !audioFile) {
      setError('Veuillez fournir un texte ou un fichier audio à analyser.');
      return;
    }
    setError(null);
    setIsAnalyzing(true);
    setResult(null);

    try {
      const parts: any[] = [];
      if (text) {
        parts.push({ text });
      }
      if (audioFile) {
        const base64Data = await getBase64(audioFile);
        parts.push({
          inlineData: {
            mimeType: audioFile.type || 'audio/mp3',
            data: base64Data
          }
        });
      }

      const response = await ai.models.generateContent({
        model: 'gemini-3.1-pro-preview',
        contents: { parts },
        config: {
          systemInstruction: "Tu es un expert en cybersécurité. Analyse le contenu soumis. Détecte les techniques de manipulation sociale, les promesses irréalistes (faux espoirs) ou les anomalies dans le cas d'un audio. Rédige ton analyse de manière très simple et empathique, sans jargon technique, pour que la personne comprenne pourquoi elle est potentiellement ciblée.",
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              riskLevel: {
                type: Type.STRING,
                description: "Le niveau de risque détecté. Doit être exactement 'Sûr', 'Suspect', ou 'Danger'."
              },
              diagnostic: {
                type: Type.STRING,
                description: "Affiche la catégorie de l'arnaque (ex: Fausse offre d'emploi, Deepfake d'urgence, Phishing) et une explication simple."
              },
              redFlags: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "Une liste à puces mettant en évidence les éléments de langage suspects (urgence artificielle, demande de virement, pression psychologique)."
              },
              advice: {
                type: Type.STRING,
                description: "Un conseil immédiat donnant une instruction claire à la victime (ex: 'Ne répondez pas', 'Appelez la personne sur son vrai numéro')."
              }
            },
            required: ['riskLevel', 'diagnostic', 'redFlags', 'advice']
          }
        }
      });

      const jsonStr = response.text?.trim() || "{}";
      const parsedResult = JSON.parse(jsonStr) as AnalysisResult;
      
      // Ensure riskLevel is one of the allowed values
      if (!['Sûr', 'Suspect', 'Danger'].includes(parsedResult.riskLevel)) {
        parsedResult.riskLevel = 'Suspect';
      }
      setResult(parsedResult);
    } catch (err: any) {
      console.error(err);
      setError("Une erreur est survenue lors de l'analyse par notre IA. Vérifiez votre connexion ou réessayez plus tard.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto py-10 px-4 md:px-8 pb-24">
      <button 
        onClick={onBack}
        className="flex items-center space-x-2 text-sm font-medium text-slate-400 hover:text-slate-900 transition-colors mb-8 group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        <span>Retour à l'accueil</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full">
        {/* Input Section (Left) */}
        <div className="col-span-1 lg:col-span-7 flex flex-col space-y-6">
          <div className="bg-white rounded-[32px] shadow-sm border border-slate-200 p-8 md:p-10 flex-1 flex flex-col">
            <div className="mb-6 flex items-center space-x-4">
              <div className="w-12 h-12 bg-slate-50 border border-slate-100 rounded-full flex items-center justify-center">
                <Search className="w-6 h-6 text-slate-700" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Vérifier un contenu</h2>
                <p className="text-slate-500 font-light mt-1">Collez le message reçu ou téléchargez un fichier audio suspect.</p>
              </div>
            </div>
            
            <textarea 
              id="content"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="flex-1 w-full min-h-[200px] lg:min-h-0 p-6 bg-slate-50 border border-slate-200 rounded-[24px] resize-none focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-500 text-slate-700 leading-relaxed font-light"
              placeholder="Collez ici l'offre d'emploi, l'email ou le message WhatsApp qui vous semble suspect..."
            />

            <div className="flex flex-col gap-4 mt-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="file"
                  accept="audio/mp3,audio/wav,audio/*"
                  onChange={handleFileChange}
                  ref={fileInputRef}
                  className="hidden"
                  id="audio-upload"
                />
                {!audioFile ? (
                  <label 
                    htmlFor="audio-upload"
                    className="border-2 border-dashed border-slate-200 rounded-[24px] p-4 flex items-center justify-center space-x-3 cursor-pointer hover:border-slate-400 hover:bg-slate-50 transition-colors"
                  >
                    <UploadCloud className="h-5 w-5 text-slate-400" />
                    <span className="font-medium text-slate-600">Importer un audio</span>
                  </label>
                ) : (
                  <div className="border border-slate-200 rounded-[24px] p-4 flex items-center justify-between space-x-3 bg-slate-50">
                    <div className="flex items-center gap-3 overflow-hidden pl-2">
                      <FileAudio className="h-5 w-5 text-slate-400 shrink-0" />
                      <span className="font-medium text-slate-700 truncate">{audioFile.name}</span>
                    </div>
                    <button onClick={clearFile} className="p-2 hover:bg-slate-200 rounded-full transition-colors shrink-0" title="Retirer l'audio">
                      <X className="h-4 w-4 text-slate-500" />
                    </button>
                  </div>
                )}
                
                <button 
                  onClick={analyzeContent}
                  disabled={isAnalyzing || (!text && !audioFile)}
                  className="bg-slate-900 hover:bg-slate-800 disabled:bg-slate-300 disabled:text-slate-500 text-white font-medium rounded-[24px] py-4 shadow-sm transition-all flex items-center justify-center space-x-2"
                >
                  {isAnalyzing ? (
                    <>
                      <svg className="animate-spin h-5 w-5 border-2 border-white/20 border-t-white rounded-full" viewBox="0 0 24 24"></svg>
                      <span>Analyse en cours...</span>
                    </>
                  ) : (
                    <>
                      <span>Analyser le contenu</span>
                      <Search className="h-5 w-5" />
                    </>
                  )}
                </button>
              </div>
              {error && (
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-red-50 text-red-700 rounded-[20px] border border-red-100 flex items-start gap-3 mt-2">
                  <ShieldAlert className="w-5 h-5 shrink-0 mt-0.5" />
                  <p className="font-light leading-relaxed">{error}</p>
                </motion.div>
              )}
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-[24px] p-6 flex items-start space-x-4">
            <Info className="h-6 w-6 text-slate-400 mt-0.5 shrink-0" />
            <p className="text-slate-600 font-light leading-relaxed">
              <strong className="font-medium text-slate-800">Rappel de sécurité :</strong> Les arnaqueurs utilisent souvent l'urgence. Prenez toujours le temps de réfléchir et de ne jamais agir dans la précipitation.
            </p>
          </div>
        </div>

        {/* Result Section (Right) */}
        <div className="col-span-1 lg:col-span-5 flex flex-col space-y-6">
          <AnimatePresence mode="wait">
            {result && !isAnalyzing ? (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white rounded-[32px] shadow-sm border border-slate-200 flex flex-col h-full overflow-hidden"
              >
                <div className={`p-8 border-b ${
                  result.riskLevel === 'Danger' ? 'bg-red-50 border-red-100' :
                  result.riskLevel === 'Suspect' ? 'bg-orange-50 border-orange-100' :
                  'bg-green-50 border-green-100'
                }`}>
                  <div className="flex justify-between items-start mb-6">
                    <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Résultat</h2>
                    <span className={`px-4 py-1.5 text-xs font-bold rounded-full uppercase tracking-wider ${
                      result.riskLevel === 'Danger' ? 'bg-red-100 text-red-800' :
                      result.riskLevel === 'Suspect' ? 'bg-orange-100 text-orange-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {result.riskLevel === 'Danger' ? 'Alerte Critique' : result.riskLevel === 'Suspect' ? 'Attention' : 'Sûr'}
                    </span>
                  </div>

                  {/* Risk Meter */}
                  <div>
                    <div className="flex justify-between mb-3">
                      <span className="text-sm font-medium text-slate-600">Niveau de risque évalué</span>
                      <span className={`text-sm font-bold ${
                        result.riskLevel === 'Danger' ? 'text-red-700' :
                        result.riskLevel === 'Suspect' ? 'text-orange-600' :
                        'text-green-700'
                      }`}>
                        {result.riskLevel}
                      </span>
                    </div>
                    <div className="h-3 w-full bg-white/50 rounded-full overflow-hidden flex border border-black/5">
                      <div className={`h-full bg-green-500 transition-all duration-1000 ${
                        result.riskLevel === 'Danger' ? 'w-1/4' : 
                        result.riskLevel === 'Suspect' ? 'w-1/3' : 
                        'w-full'
                      }`}></div>
                      <div className={`h-full bg-orange-400 transition-all duration-1000 ${
                        result.riskLevel === 'Danger' ? 'w-1/4' : 
                        result.riskLevel === 'Suspect' ? 'w-2/3' : 
                        'w-0'
                      }`}></div>
                      <div className={`h-full bg-red-500 flex-1 transition-all duration-1000 ${
                        result.riskLevel === 'Danger' ? 'w-1/2' : 'w-0'
                      }`}></div>
                    </div>
                  </div>
                </div>

                {/* Diagnostic Details */}
                <div className="p-8 space-y-8 flex-1 flex flex-col">
                  <div>
                    <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">Diagnostic Décrypté</h3>
                    <p className="text-slate-800 font-medium leading-relaxed">{result.diagnostic}</p>
                  </div>

                  <div>
                    <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4">Signaux d'alarme recensés</h3>
                    <ul className="space-y-3">
                      {result.redFlags.map((flag, index) => (
                        <li key={index} className="flex items-start space-x-3 text-slate-600 font-light leading-relaxed">
                          <span className={`mt-1.5 shrink-0 ${
                            result.riskLevel === 'Danger' ? 'text-red-500' : 
                            result.riskLevel === 'Suspect' ? 'text-orange-500' : 
                            'text-green-500'
                          }`}>
                            <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 20 20"><circle cx="10" cy="10" r="10" /></svg>
                          </span>
                          <span>{flag}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-auto pt-6 border-t border-slate-100">
                    <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">Notre conseil immédiat</h3>
                    <div className={`p-5 rounded-[24px] ${
                      result.riskLevel === 'Danger' ? 'bg-red-50 text-red-900 border border-red-100' :
                      result.riskLevel === 'Suspect' ? 'bg-orange-50 text-orange-900 border border-orange-100' :
                      'bg-green-50 text-green-900 border border-green-100'
                    }`}>
                      <p className="font-semibold leading-relaxed">
                        {result.advice}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="hidden lg:flex bg-slate-50 border-2 border-dashed border-slate-200 rounded-[32px] p-10 flex-col items-center justify-center text-center h-full"
              >
                <div className="w-20 h-20 bg-white border border-slate-100 rounded-full flex items-center justify-center mb-6 shadow-sm">
                  <Shield className="w-10 h-10 text-slate-300" />
                </div>
                <h3 className="text-xl font-medium text-slate-700 mb-2">En attente d'analyse</h3>
                <p className="text-slate-500 font-light max-w-sm">Les résultats de votre recherche apparaîtront ici de manière détaillée et compréhensible.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
