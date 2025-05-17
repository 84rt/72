import { useState, useEffect, useRef, FC } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import Timer from "./Timer";
import { toast } from "sonner";

type QuestionType = 'years' | 'rate';

interface QuestionProps {
  isTimedMode: boolean;
  onCorrectAnswer: () => void;
  onIncorrectAnswer: () => void;
  resetStatus: boolean;
}

const Question: FC<QuestionProps> = ({ 
  isTimedMode, 
  onCorrectAnswer, 
  onIncorrectAnswer,
  resetStatus 
}) => {
  const [questionType, setQuestionType] = useState<QuestionType>('years');
  const [interestRate, setInterestRate] = useState<number>(0);
  const [yearsToDouble, setYearsToDouble] = useState<number>(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [feedbackType, setFeedbackType] = useState<"correct" | "incorrect" | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [isQuestionActive, setIsQuestionActive] = useState(true);
  const [questionKey, setQuestionKey] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const generateNewQuestion = () => {
    // Randomly choose question type
    const newQuestionType: QuestionType = Math.random() > 0.5 ? 'years' : 'rate';
    setQuestionType(newQuestionType);
    
    if (newQuestionType === 'years') {
      // For years question: generate random interest rate (1-20% in 0.5% increments)
      const newRate = (Math.floor(Math.random() * 39) + 2) / 2;
      setInterestRate(newRate);
    } else {
      // For rate question: generate random years to double (2-36 years in 0.5 year increments)
      const newYears = (Math.floor(Math.random() * 69) + 4) / 2;
      setYearsToDouble(newYears);
    }
    
    setUserAnswer("");
    setFeedbackMessage("");
    setFeedbackType(null);
    setShowHint(false);
    setIsQuestionActive(true);
    setQuestionKey(prev => prev + 1);
  };

  const handleSubmit = () => {
    if (!isQuestionActive || userAnswer === "") return;

    const parsedAnswer = parseFloat(userAnswer);
    if (isNaN(parsedAnswer)) {
      toast.error("Please enter a valid number");
      return;
    }

    if (questionType === 'years') {
      const exactAnswer = 72 / interestRate;
      // Use 10% tolerance or 0.5, whichever is larger
      const tolerance = Math.max(0.5, exactAnswer * 0.1);
      const lowerBound = exactAnswer - tolerance;
      const upperBound = exactAnswer + tolerance;
      
      if (parsedAnswer >= lowerBound && parsedAnswer <= upperBound) {
        setFeedbackMessage(`Correct! The exact answer is ${exactAnswer.toFixed(2)} years.`);
        setFeedbackType("correct");
        onCorrectAnswer();
      } else {
        setFeedbackMessage(`Incorrect. The answer is ${exactAnswer.toFixed(2)} years.`);
        setFeedbackType("incorrect");
        onIncorrectAnswer();
      }
    } else {
      const exactAnswer = 72 / yearsToDouble;
      // Use 10% tolerance or 0.5, whichever is larger
      const tolerance = Math.max(0.5, exactAnswer * 0.1);
      const lowerBound = exactAnswer - tolerance;
      const upperBound = exactAnswer + tolerance;
      
      if (parsedAnswer >= lowerBound && parsedAnswer <= upperBound) {
        setFeedbackMessage(`Correct! The exact answer is ${exactAnswer.toFixed(1)}%.`);
        setFeedbackType("correct");
        onCorrectAnswer();
      } else {
        setFeedbackMessage(`Incorrect. The answer is ${exactAnswer.toFixed(1)}%.`);
        setFeedbackType("incorrect");
        onIncorrectAnswer();
      }
    }
    
    setIsQuestionActive(false);
  };

  const handleTimeUp = () => {
    if (!isQuestionActive) return;
    
    let message = "";
    
    if (questionType === 'years') {
      const exactAnswer = 72 / interestRate;
      message = `Time's up! The answer is ${exactAnswer.toFixed(2)} years.`;
    } else {
      const exactAnswer = 72 / yearsToDouble;
      message = `Time's up! The answer is ${exactAnswer.toFixed(1)}%.`;
    }
    
    setFeedbackMessage(message);
    setFeedbackType("incorrect");
    onIncorrectAnswer();
    setIsQuestionActive(false);
  };

  // Focus the input when a new question is generated
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [interestRate]);

  // Generate a new question when the component mounts
  useEffect(() => {
    generateNewQuestion();
  }, []);

  // Reset the question when resetStatus changes
  useEffect(() => {
    if (resetStatus) {
      generateNewQuestion();
    }
  }, [resetStatus]);

  const toggleHint = () => {
    setShowHint(!showHint);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div key={questionKey} className="animate-fade-in">
      <Timer 
        isTimedMode={isTimedMode} 
        isActive={isQuestionActive} 
        timeLimit={10} 
        onTimeUp={handleTimeUp} 
      />
      <Card className="border-2 shadow-sm mt-6">
        <CardContent className="pt-6">
          <div className="text-center mb-6">
            <p className="text-lg font-medium mb-2">
              {questionType === 'years' 
                ? `At ${interestRate}% annual interest, how many years will it take for your money to double?`
                : `If your money doubles in ${yearsToDouble} years, what is the estimated annual interest rate?`
              }
            </p>
            <div className="flex justify-center items-center gap-2">
              <Input
                ref={inputRef}
                type="number"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                className="w-32 text-center text-lg"
                disabled={!isQuestionActive}
                placeholder="?"
                min="0"
                step={questionType === 'years' ? '0.1' : '0.1'}
              />
              <span>{questionType === 'years' ? 'years' : '%'}</span>
            </div>
          </div>

          <div className="flex justify-center gap-4 mt-4">
            {isQuestionActive ? (
              <>
                <Button 
                  onClick={handleSubmit} 
                  disabled={!isQuestionActive}
                  className="w-32"
                >
                  Submit
                </Button>
                <Button 
                  variant="outline" 
                  onClick={toggleHint}
                  className="w-32"
                >
                  {showHint ? 'Hide Hint' : 'Show Hint'}
                </Button>
              </>
            ) : (
              feedbackMessage && (
                <Button 
                  onClick={generateNewQuestion}
                  className="w-32"
                >
                  Next Question
                </Button>
              )
            )}
          </div>

          {feedbackMessage && (
            <div className={`mt-4 p-3 rounded-md text-center ${
              feedbackType === 'correct' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              {feedbackMessage}
            </div>
          )}

          {showHint && (
            <div className="mt-4 p-3 bg-blue-50 rounded-md">
              <p className="text-sm text-blue-800">
                <strong>Hint:</strong> {questionType === 'years' 
                  ? 'Use the Rule of 72: 72 ÷ interest rate = years to double.\nFor example, at 9% interest: 72 ÷ 9 = 8 years to double.'
                  : 'Use the Rule of 72: 72 ÷ years to double = interest rate.\nFor example, if money doubles in 8 years: 72 ÷ 8 = 9% interest.'
                }
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Question;
