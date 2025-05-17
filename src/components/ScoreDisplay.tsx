
import React from 'react';

interface ScoreDisplayProps {
  currentScore: number;
  highestScore: number;
}

const ScoreDisplay: React.FC<ScoreDisplayProps> = ({ currentScore, highestScore, onResetScore }) => {
  return (
    <div className="flex flex-col gap-2 mb-4 newspaper-font">
      <div className="flex flex-row items-center justify-center gap-6">
        <div className="text-center">
          <div className="text-xs text-gray-600 mb-1">Current Score</div>
          <div className="text-2xl font-bold text-[#6e6c64]">{currentScore}</div>
        </div>
        <div className="h-8 border-l border-gray-300 mx-2" />
        <div className="text-center">
          <div className="text-xs text-gray-600 mb-1">Highest Score</div>
          <div className="text-2xl font-bold text-[#6e6c64]">{highestScore}</div>
        </div>
      </div>

    </div>
  );
};

export default ScoreDisplay;
