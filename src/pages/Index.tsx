
import { useState, useEffect } from 'react';
import { SimpleTabs } from '@/components/SimpleTabs';
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
    <div className="flex flex-col min-h-screen bg-cream newspaper-texture newspaper-font py-8 px-4">
      <div className="flex-1 flex flex-col justify-center">
        <div className="max-w-md mx-auto bg-cream border border-gray-300 rounded-lg shadow-md p-6 newspaper-font newspaper-texture">
          <h1 className="text-2xl font-bold text-center mb-6 newspaper-font">Rule of 72</h1>
          <SimpleTabs
            tabs={[
              {
                label: 'Practice',
                children: (
                  <>
                    <ModeToggle isTimedMode={isTimedMode} onModeChange={handleModeChange} />
                    <ScoreDisplay
                      currentScore={currentScore}
                      highestScore={highestScore}
                    />
                    <Question 
                      isTimedMode={isTimedMode}
                      onCorrectAnswer={handleCorrectAnswer}
                      onIncorrectAnswer={handleIncorrectAnswer}
                      resetStatus={resetQuestionStatus}
                    />
                  </>
                )
              },
              {
                label: 'Learn',
                children: <RuleExplanation />
              }
            ]}
          />
        </div>
      </div>
      <footer className="w-full mt-10 flex justify-center newspaper-font">
        <span className="text-xs text-gray-500 flex items-center gap-1">
          Made with <span aria-label="yellow heart" role="img">💛</span> by <a href="https://github.com/84rt/" target="_blank" rel="noopener noreferrer" className="underline"><code>84rt</code></a>
        </span>
      </footer>
    </div>
  );
};

export default Index;
