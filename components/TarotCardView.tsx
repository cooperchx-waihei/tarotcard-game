
import React from 'react';
import { CardReading } from '../types';

interface TarotCardViewProps {
  reading?: CardReading;
  revealed: boolean;
  label: string;
}

const TarotCardView: React.FC<TarotCardViewProps> = ({ reading, revealed, label }) => {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="text-sm font-cinzel text-amber-200/60 tracking-widest uppercase mb-2">
        {label}
      </div>
      
      <div className="relative w-48 h-80 group perspective-1000">
        <div className={`relative w-full h-full transition-transform duration-1000 transform-style-3d ${revealed ? 'rotate-y-180' : ''}`}>
          
          {/* Back of Card - Classic Mystical Pattern */}
          <div className="absolute inset-0 backface-hidden flex items-center justify-center bg-[#1a1a2e] border-4 border-[#3a2a0d] rounded-lg shadow-[0_0_20px_rgba(0,0,0,0.5)] overflow-hidden">
            <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/vintage-speckle.png')]"></div>
            <div className="w-[90%] h-[90%] border border-amber-900/40 rounded-md flex items-center justify-center relative">
              {/* Ornate Diamond Pattern Simulation */}
              <div className="absolute inset-0 grid grid-cols-4 grid-rows-6 gap-1 p-2 opacity-10">
                {Array.from({length: 24}).map((_, i) => (
                  <div key={i} className="border border-amber-500 transform rotate-45 scale-75"></div>
                ))}
              </div>
              <div className="z-10 w-20 h-20 border-2 border-amber-700/50 rounded-full flex items-center justify-center bg-slate-900/80 shadow-inner">
                <svg className="w-10 h-10 text-amber-600/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Front of Card - Classic RWS Design */}
          <div className="absolute inset-0 backface-hidden rotate-y-180 bg-[#fdf6e3] border-4 border-[#c5a059] rounded-lg overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.8)]">
            {reading && (
              <div className={`w-full h-full flex flex-col ${reading.isReversed ? 'rotate-180' : ''}`}>
                <div className="relative h-full w-full">
                  <img 
                    src={reading.card.image} 
                    alt={reading.card.name} 
                    className="w-full h-full object-contain bg-[#f4e4bc] p-1"
                  />
                  {/* Title overlay at the bottom of the front card frame */}
                  <div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent py-4 text-center ${reading.isReversed ? 'rotate-180' : ''}`}>
                    <div className="text-[#fdf6e3] font-cinzel text-xs font-bold tracking-widest drop-shadow-md">
                      {reading.card.name_zh}
                    </div>
                    <div className="text-amber-400 text-[10px] mt-0.5 opacity-80">
                      {reading.isReversed ? 'REVERSED 逆位' : 'UPRIGHT 正位'}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default TarotCardView;
