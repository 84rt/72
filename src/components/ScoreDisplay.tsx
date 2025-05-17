
import React from 'react';
import { Button } from "@/components/ui/button";

interface ScoreDisplayProps {
  currentScore: number;
  highestScore: number;
  onResetScore: () => void;
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
      <div className="flex flex-row justify-end mt-1">
        <Button
          variant="outline"
          onClick={onResetScore}
          className="border border-[#847e58] text-[#847e58] hover:bg-[#f7f3e9] hover:text-[#6e6c64] px-3 py-1 text-sm rounded newspaper-font shadow-none"
        >
          Reset Score
        </Button>
      </div>
    </div>
  );
};

export default ScoreDisplay;
