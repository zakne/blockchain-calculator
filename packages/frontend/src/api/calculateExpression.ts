import { ShuntingYard } from "../utils/ShuntingYard";

const API_BASE_URL = import.meta.env.VITE_CALCULATOR_API_BASE_URL;

interface CalculatedResult {
    result: string;
};

export const calculateExpression = async (expr: string): Promise<string> => {
    const url = `${API_BASE_URL}/calculate`;
    const payload = JSON.stringify(ShuntingYard.toRPN(expr));

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: payload,
    });

    if (!response.ok) {
        throw new Error('Server error while calculating.');
    }

    const data = await response.json() as CalculatedResult;
    return data.result;
};