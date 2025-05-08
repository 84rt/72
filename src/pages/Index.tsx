
import React, { useState, useEffect } from 'react';
import RuleExplanation from '@/components/RuleExplanation';
import ModeToggle from '@/components/ModeToggle';
import ScoreDisplay from '@/components/ScoreDisplay';
import Question from '@/components/Question';
import { toast } from "sonner";

const Index = () => {
  const [isTimedMode, setIsTimedMode] = useState(false);
  const [currentScore, setCurrentScore] = useState(0);
  const [highestScore, setHighestScore] = useState(0);
  const [resetQuestionStatus, setResetQuestionStatus] = useState(false);

  // Load highest score from localStorage
  useEffect(() => {
    const savedScore = localStorage.getItem('rule72-highest-score');
    if (savedScore) {
      setHighestScore(parseInt(savedScore, 10));
    }
  }, []);

  // Save highest score to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('rule72-highest-score', highestScore.toString());
  }, [highestScore]);

  const handleCorrectAnswer = () => {
    const newScore = currentScore + 1;
    setCurrentScore(newScore);
    
    if (newScore > highestScore) {
      setHighestScore(newScore);
      toast.success("New high score!");
    }
  };

  const handleIncorrectAnswer = () => {
    setCurrentScore(0);
    toast("Score reset to 0", {
      description: "Try again!"
    });
  };

  const handleModeChange = (timed: boolean) => {
    setIsTimedMode(timed);
    setResetQuestionStatus(!resetQuestionStatus);
    if (timed) {
      toast("Timed Mode activated", {
        description: "You have 10 seconds to answer each question!",
      });
    } else {
      toast("Standard Mode activated", {
        description: "Take your time to calculate the correct answer.",
      });
    }
  };

  const handleResetScore = () => {
    setCurrentScore(0);
    setHighestScore(0);
    localStorage.removeItem('rule72-highest-score');
    toast("Scores reset to 0");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">Rule of 72 Trainer</h1>
          <p className="text-gray-600">Master the art of calculating investment doubling time</p>
        </div>
        
        <RuleExplanation />
        <ModeToggle isTimedMode={isTimedMode} onModeChange={handleModeChange} />
        <ScoreDisplay 
          currentScore={currentScore} 
          highestScore={highestScore} 
          onResetScore={handleResetScore}
        />
        
        <Question 
          isTimedMode={isTimedMode}
          onCorrectAnswer={handleCorrectAnswer}
          onIncorrectAnswer={handleIncorrectAnswer}
          resetStatus={resetQuestionStatus}
        />

        <div className="mt-8 text-center text-xs text-gray-500">
          Practice regularly to improve your mental math skills and financial literacy!
        </div>
      </div>
    </div>
  );
};

export default Index;
