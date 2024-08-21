import {useBudget} from '../hooks/useBudget';
import {AmountDisplay} from './AmountDisplay';

export const BudgetTracker = () => {
  const {state, remainingBudget, totalExpenses} = useBudget();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <div className="flex justify-center">
        <img src="/grafico.jpg" alt="graphic img" />
      </div>
      <div className="flex flex-col justify-center items-center gap-8">
        <button
          type="button"
          className="bg-orange-600 w-full rounded-lg font-bold text-white p-2 uppercase"
        >
          Reset App
        </button>
        <AmountDisplay label="Budget" amount={state.budget} />
        <AmountDisplay label="Available" amount={remainingBudget} />
        <AmountDisplay label="Spent" amount={totalExpenses} />
      </div>
    </div>
  );
};
