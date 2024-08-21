import {ChangeEvent, FormEvent, useMemo, useState} from 'react';
import {useBudget} from '../hooks/useBudget';

export const BudgetForm = () => {
  const [budget, setBudget] = useState(0);
  const {dispatch} = useBudget();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log('desdeChange', +e.target.value);
    setBudget(+e.target.value);
  };
  const isValid = useMemo(() => {
    return isNaN(budget) || budget <= 0;
  }, [budget]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // console.log('Mandando Budget', e.target);

    dispatch({type: 'add-budget', payload: {budget}});
  };

  return (
    <form action="" className="space-y-5" onSubmit={handleSubmit}>
      <div className="flex flex-col space-y-5">
        <label
          htmlFor="budget"
          className="text-4xl text-green-600 font-bold text-center"
        >
          Define Budget
        </label>
        <input
          id="budgetId"
          type="number"
          className="w-full bg-white border border-gray-200 p-2"
          placeholder="Enter your budget"
          name="budget"
          value={budget}
          onChange={handleChange}
        />
      </div>
      <input
        type="submit"
        value="Define Budget"
        className="bg-green-600 hover:bg-green-700 cursor-pointer w-full text-white font-black p-2 uppercase disabled:opacity-50"
        disabled={isValid}
      />
    </form>
  );
};
