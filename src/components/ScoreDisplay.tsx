
import React from 'react';
import { Button } from "@/components/ui/button";

interface ScoreDisplayProps {
  currentScore: number;
  highestScore: number;
  onResetScore: () => void;
}

const ScoreDisplay: React.FC<ScoreDisplayProps> = ({ currentScore, highestScore, onResetScore }) => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between mb-6 bg-accent/70 p-4 rounded-md shadow-sm border border-secondary">
      <div className="flex flex-col md:flex-row items-center gap-4 mb-3 md:mb-0">
        <div className="bg-secondary rounded-md px-4 py-2 w-36 text-center border border-muted">
          <p className="text-xs font-serif text-muted-foreground">Current Score</p>
          <p className="text-2xl font-serif font-bold text-primary">{currentScore}</p>
        </div>
        <div className="bg-secondary rounded-md px-4 py-2 w-36 text-center border border-muted">
          <p className="text-xs font-serif text-muted-foreground">Highest Score</p>
          <p className="text-2xl font-serif font-bold text-primary">{highestScore}</p>
        </div>
      </div>
      <Button 
        variant="outline" 
        onClick={onResetScore}
        className="border-destructive text-destructive hover:bg-destructive/10 font-serif"
      >
        Reset Score
      </Button>
    </div>
  );
};

export default ScoreDisplay;
