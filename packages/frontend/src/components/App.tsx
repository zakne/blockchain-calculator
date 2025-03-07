import { CalculatorForm } from './CalculatorForm';
import '../styles/App.css';

function App() {
  return (
    <section className="flex flex-col items-center justify-center gap-2 pb-60 bg-white max-w-md mx-auto min-h-screen p-4">
      <h1 className="text-4xl font-bold text-gray-700 mb-4">Blockchain Calculator</h1>
      <CalculatorForm />
    </section>
  );
}

export default App
