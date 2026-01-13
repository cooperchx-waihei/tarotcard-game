
import React from 'react';
import { ReadingResponse } from '../types';

interface ReadingPanelProps {
  reading: ReadingResponse | null;
  isLoading: boolean;
}

const ReadingPanel: React.FC<ReadingPanelProps> = ({ reading, isLoading }) => {
  if (isLoading) {
    return (
      <div className="mt-12 w-full max-w-2xl mx-auto p-8 border border-purple-500/30 rounded-2xl bg-slate-900/50 backdrop-blur-md text-center animate-pulse">
        <div className="text-purple-300 font-cinzel mb-4">冥思中...</div>
        <p className="text-slate-400">正在连接宇宙能量，解析塔罗指引。</p>
      </div>
    );
  }

  if (!reading) return null;

  return (
    <div className="mt-12 w-full max-w-3xl mx-auto space-y-8 animate-fade-in">
      <div className="p-8 border-2 border-amber-500/20 rounded-2xl bg-slate-900/80 backdrop-blur-xl shadow-2xl">
        <h2 className="text-3xl font-cinzel text-amber-400 mb-6 text-center border-b border-amber-500/20 pb-4">
          圣坛启示录
        </h2>
        
        <div className="mb-10 text-center italic text-xl text-purple-200">
          "{reading.summary}"
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {reading.interpretations.map((interp, idx) => (
            <div key={idx} className="p-4 rounded-lg bg-white/5 border border-white/10">
              <div className="text-amber-500 font-cinzel text-xs tracking-widest mb-2 uppercase">
                {interp.position === 'Past' ? '过去' : interp.position === 'Present' ? '当下' : '未来'}
              </div>
              <p className="text-slate-300 text-sm leading-relaxed">
                {interp.meaning}
              </p>
            </div>
          ))}
        </div>

        <div className="p-6 border-t border-amber-500/20">
          <div className="flex items-center gap-3 mb-4">
            <svg className="w-6 h-6 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <h3 className="text-xl font-cinzel text-amber-400">命运指南</h3>
          </div>
          <p className="text-slate-300 leading-relaxed italic">
            {reading.guidance}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReadingPanel;
