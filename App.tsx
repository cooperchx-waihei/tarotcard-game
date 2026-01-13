
import React, { useState, useEffect, useCallback } from 'react';
import { MAJOR_ARCANA } from './constants';
import { CardReading, SpreadPosition, ReadingResponse } from './types';
import { getTarotInterpretation } from './services/geminiService';
import TarotCardView from './components/TarotCardView';
import ReadingPanel from './components/ReadingPanel';

const App: React.FC = () => {
  const [readings, setReadings] = useState<CardReading[]>([]);
  const [revealed, setRevealed] = useState<boolean>(false);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [isInterpreting, setIsInterpreting] = useState<boolean>(false);
  const [interpretation, setInterpretation] = useState<ReadingResponse | null>(null);
  const [stars, setStars] = useState<{ id: number, top: string, left: string, duration: string }[]>([]);

  useEffect(() => {
    // Generate background stars
    const newStars = Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      duration: `${2 + Math.random() * 4}s`
    }));
    setStars(newStars);
  }, []);

  const drawCards = useCallback(async () => {
    setIsDrawing(true);
    setRevealed(false);
    setInterpretation(null);
    
    // Shuffle and pick 3 cards
    const shuffled = [...MAJOR_ARCANA].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, 3).map((card, idx) => ({
      card,
      isReversed: Math.random() > 0.5,
      position: idx === 0 ? SpreadPosition.PAST : idx === 1 ? SpreadPosition.PRESENT : SpreadPosition.FUTURE
    }));

    // Small delay for effect
    setTimeout(() => {
      setReadings(selected);
      setIsDrawing(false);
      setRevealed(true);
      
      // Get AI interpretation
      interpret(selected);
    }, 1000);
  }, []);

  const interpret = async (newReadings: CardReading[]) => {
    setIsInterpreting(true);
    try {
      const result = await getTarotInterpretation(newReadings);
      setInterpretation(result);
    } catch (err) {
      console.error(err);
      alert("星辰移位，解析失败，请再试一次。");
    } finally {
      setIsInterpreting(false);
    }
  };

  return (
    <div className="relative min-h-screen p-4 md:p-8 overflow-hidden">
      {/* Star Field Background */}
      {stars.map(star => (
        <div 
          key={star.id} 
          className="star" 
          style={{ 
            top: star.top, 
            left: star.left, 
            '--duration': star.duration 
          } as React.CSSProperties} 
        />
      ))}

      <header className="relative z-10 text-center mb-12 animate-fade-in">
        <h1 className="text-5xl md:text-7xl font-cinzel text-transparent bg-clip-text bg-gradient-to-b from-amber-200 to-amber-600 mb-4 tracking-tighter">
          Mystic Mirror
        </h1>
        <p className="text-purple-300 font-cinzel tracking-widest uppercase text-sm">
          奥秘之镜 · 塔罗占卜
        </p>
      </header>

      <main className="relative z-10 container mx-auto flex flex-col items-center">
        {/* The Card Display */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16 mb-12">
          <TarotCardView 
            label="过去" 
            reading={readings[0]} 
            revealed={revealed} 
          />
          <TarotCardView 
            label="当下" 
            reading={readings[1]} 
            revealed={revealed} 
          />
          <TarotCardView 
            label="未来" 
            reading={readings[2]} 
            revealed={revealed} 
          />
        </div>

        {/* Action Button */}
        <div className="flex flex-col items-center gap-6">
          <button
            onClick={drawCards}
            disabled={isDrawing || isInterpreting}
            className={`
              px-10 py-4 rounded-full font-cinzel text-xl tracking-widest
              border-2 border-amber-500 text-amber-500
              hover:bg-amber-500 hover:text-slate-900 transition-all duration-300
              shadow-[0_0_30px_rgba(245,158,11,0.2)]
              disabled:opacity-50 disabled:cursor-not-allowed
            `}
          >
            {isDrawing ? '正在洗牌...' : readings.length > 0 ? '重新抽取' : '开启命运之门'}
          </button>
          
          <p className="text-slate-500 text-sm max-w-md text-center">
            深呼吸，冥想你的问题。当准备就绪，点击上方按钮抽取三张指引你命运的塔罗牌。
          </p>
        </div>

        {/* AI Result */}
        <ReadingPanel reading={interpretation} isLoading={isInterpreting} />
      </main>

      <footer className="relative z-10 mt-20 text-center text-slate-600 text-xs font-cinzel pb-8">
        © {new Date().getFullYear()} MYSTIC MIRROR · POWERED BY GEMINI AI
      </footer>

      <style dangerouslySetInnerHTML={{ __html: `
        .perspective-1000 { perspective: 1000px; }
        .transform-style-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
        
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 1s ease-out forwards;
        }
      `}} />
    </div>
  );
};

export default App;
