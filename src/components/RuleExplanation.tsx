
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const RuleExplanation = () => {
  return (
    <Card className="bg-accent border-secondary mb-6 shadow-md">
      <CardHeader className="pb-2 border-b border-muted">
        <CardTitle className="text-lg font-serif font-medium">The Rule of 72</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-sm text-foreground font-serif">
          The Rule of 72 is a simple way to estimate how long an investment will take to double given a fixed annual interest rate. 
          Divide 72 by the annual rate of return to get the approximate number of years required for doubling.
          <br/><br/>
          <span className="font-medium italic">Formula: Years to Double ≈ 72 ÷ Interest Rate (%)</span>
        </CardDescription>
      </CardContent>
    </Card>
  );
};

export default RuleExplanation;
