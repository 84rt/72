
export default function RuleExplanation() {
  return (
    <div className="space-y-6 p-6 bg-cream newspaper-font newspaper-texture rounded-lg border border-gray-300">
      <h2 className="text-2xl font-bold mb-2">The Rule of 72</h2>
      <p className="mb-4 text-lg">
        The Rule of 72 is a simple way to estimate how long an investment will take to double, given a fixed annual interest rate. Divide 72 by the annual rate of return to get the approximate number of years required for doubling.
      </p>
      <div className="bg-cream p-4 rounded-lg border border-gray-200 newspaper-font">
        <p className="text-center font-mono text-lg mb-2">Formula: <span className="font-bold">Years to Double ≈ 72 ÷ Interest Rate (%)</span></p>
      </div>
      <div className="mt-4 space-y-2">
        <p className="font-medium">Examples:</p>
        <ul className="list-disc pl-5 space-y-1 text-sm">
          <li>At 6% interest, money doubles in ~12 years</li>
          <li>At 9% interest, money doubles in ~8 years</li>
          <li>To double in 6 years, you need ~12% return</li>
        </ul>
      </div>
      <div className="mt-8">
        <h3 className="text-xl font-bold mb-2">Why does the rule work?</h3>
        <p className="text-base">
          The Rule of 72 is based on the mathematics of compound interest. For small interest rates, the time to double can be estimated using logarithms:
        </p>
        <p className="italic my-2 text-center">Years to double = ln(2) / ln(1 + r)</p>
        <p className="text-base">
          For interest rates typically encountered in finance, <span className="font-mono">ln(1 + r) ≈ r</span> (when r is expressed as a decimal). Since <span className="font-mono">ln(2) ≈ 0.693</span>, and 0.693 × 100 ≈ 69.3, the rule uses 72 for easier mental math and to account for compounding frequency. That’s why dividing 72 by the interest rate gives a good estimate for doubling time.
        </p>
      </div>
    </div>
  );
}
