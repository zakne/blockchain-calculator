import { useState, useCallback, useRef } from "react";
import { CalculatorButton } from "./CalculatorButton";
import { calculateExpression } from "../api/calculateExpression";

export const CalculatorForm = () => {
  const [expression, setExpression] = useState<string>('0');
  const [result, setResult] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleExpressionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let validValue = event.target.value.replace(/[^0-9+\-*/^()]/g, '');
    validValue = validValue.replace(/^0+(?!$)/, '');
    setResult('');
    setExpression(validValue || '0');
  };

  const handleDivClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
      const length = inputRef.current.value.length;
      inputRef.current.setSelectionRange(length, length);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleCalculate();
    }
  };

  const handleCalculate = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await calculateExpression(expression);
      setResult(expression);
      setExpression(result);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to calculate. Please try again');
    } finally {
      setLoading(false);
    }
  }, [expression]);

  return (
    <>
      <div className="w-full p-2 rounded-2xl border border-gray-300 focus-within:border-blue-400 transition-all duration-300"
        onClick={handleDivClick} >
        <span className="block text-black text-right">{result} =</span>
        <input
          type="text"
          className="font-bold text-right text-3xl w-full text-black outline-none caret-transparent"
          value={expression}
          onChange={handleExpressionChange}
          onKeyDown={handleKeyDown}
          ref={inputRef}
        />
      </div>
      <CalculatorButton onClick={handleCalculate} loading={loading} />
      {error && <p className="text-red-600 text-center mt-2">{error}</p>}
    </>
  );
};