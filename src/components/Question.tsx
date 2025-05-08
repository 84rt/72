
import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import Timer from "./Timer";
import { toast } from "sonner";

interface QuestionProps {
  isTimedMode: boolean;
  onCorrectAnswer: () => void;
  onIncorrectAnswer: () => void;
  resetStatus: boolean;
}

const Question: React.FC<QuestionProps> = ({ 
  isTimedMode, 
  onCorrectAnswer, 
  onIncorrectAnswer,
  resetStatus 
}) => {
  const [interestRate, setInterestRate] = useState(2);
  const [userAnswer, setUserAnswer] = useState("");
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [feedbackType, setFeedbackType] = useState<"correct" | "incorrect" | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [isQuestionActive, setIsQuestionActive] = useState(true);
  const [questionKey, setQuestionKey] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const generateNewQuestion = () => {
    // Generate random interest rate between 1 and 20, in 0.5 increments
    const newRate = (Math.floor(Math.random() * 39) + 2) / 2;
    setInterestRate(newRate);
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

    const exactAnswer = 72 / interestRate;
    const lowerBound = exactAnswer - 0.5;
    const upperBound = exactAnswer + 0.5;
    
    if (parsedAnswer >= lowerBound && parsedAnswer <= upperBound) {
      setFeedbackMessage(`Correct! The exact answer is ${exactAnswer.toFixed(2)} years.`);
      setFeedbackType("correct");
      onCorrectAnswer();
    } else {
      setFeedbackMessage(`Incorrect. The answer is ${exactAnswer.toFixed(2)} years.`);
      setFeedbackType("incorrect");
      onIncorrectAnswer();
    }
    
    setIsQuestionActive(false);
  };

  const handleTimeUp = () => {
    if (!isQuestionActive) return;
    
    const exactAnswer = 72 / interestRate;
    setFeedbackMessage(`Time's up! The answer is ${exactAnswer.toFixed(2)} years.`);
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

      <Card className="border-2 shadow-sm">
        <CardContent className="pt-6">
          <div className="text-center mb-6">
            <p className="text-sm text-muted-foreground mb-2">How many years will it take for an investment to double with an annual interest rate of:</p>
            <h2 className="text-4xl font-bold text-primary">{interestRate}%</h2>
          </div>

          <div className="mb-6">
            <div className="flex gap-4 mb-4">
              <Input
                ref={inputRef}
                type="number"
                placeholder="Years to double"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={!isQuestionActive}
                className="text-lg"
                step="0.1"
                min="0"
              />
              <Button 
                onClick={handleSubmit} 
                disabled={!isQuestionActive || userAnswer === ""}
                className="bg-primary hover:bg-primary-hover text-white"
              >
                Submit
              </Button>
            </div>

            <div className="flex justify-between">
              <Button 
                variant="outline" 
                onClick={toggleHint}
                className="text-sm"
                disabled={!isQuestionActive}
              >
                {showHint ? "Hide Hint" : "Show Hint"}
              </Button>
              <Button 
                onClick={generateNewQuestion} 
                variant="outline"
                className="text-sm"
                disabled={isQuestionActive}
              >
                Next Question
              </Button>
            </div>
          </div>

          {showHint && (
            <div className="bg-accent p-4 rounded-md mb-4 text-sm">
              <p><strong>Hint:</strong> Use the Rule of 72 formula: <span className="font-medium">72 ÷ {interestRate} = ?</span></p>
            </div>
          )}

          {feedbackMessage && (
            <div className={`answer-feedback ${feedbackType === "correct" ? "correct-answer" : "incorrect-answer"}`}>
              {feedbackMessage}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Question;
