
import Spinner from "./Spinner";

interface CalculatorButtonProps {
    loading?: boolean;
    onClick?: () => void;
}

export const CalculatorButton = ({ onClick, loading }: CalculatorButtonProps) => {
    return (
        <button
            className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-2xl px-5 py-1.5 text-center cursor-pointer self-end"
            onClick={onClick}
        >
            {loading && <Spinner />}
            {loading ? "Calculating..." : "Calculate"}
        </button>
    );
}