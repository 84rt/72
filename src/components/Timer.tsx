
import React, { useEffect, useState } from 'react';
import { Progress } from "@/components/ui/progress";

interface TimerProps {
  isTimedMode: boolean;
  isActive: boolean;
  timeLimit: number;
  onTimeUp: () => void;
}

const Timer: React.FC<TimerProps> = ({ isTimedMode, isActive, timeLimit, onTimeUp }) => {
  const [timeLeft, setTimeLeft] = useState(timeLimit);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (isTimedMode && isActive) {
      setTimeLeft(timeLimit);
      setProgress(100);
      
      timer = setInterval(() => {
        setTimeLeft(prevTime => {
          const newTime = prevTime - 0.1;
          if (newTime <= 0) {
            clearInterval(timer);
            onTimeUp();
            return 0;
          }
          
          // Calculate new progress percentage
          const newProgress = (newTime / timeLimit) * 100;
          setProgress(newProgress);
          
          return newTime;
        });
      }, 100);
    }
    
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isTimedMode, isActive, timeLimit, onTimeUp]);
  
  if (!isTimedMode) {
    return null;
  }
  
  return (
    <div className="w-full mb-4">
      <div className="flex justify-between mb-1 text-sm">
        <span>Time Left</span>
        <span>{Math.ceil(timeLeft)}s</span>
      </div>
      <Progress 
        value={progress} 
        className={`h-2 ${timeLeft < 3 ? 'bg-red-200' : 'bg-secondary'}`} 
        // Removed the indicatorClassName prop as it's not supported
      />
    </div>
  );
};

export default Timer;
