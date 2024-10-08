import {useMemo} from 'react';
import {useBudget} from '../hooks/useBudget';
import {ExpenseDetail} from './ExpenseDetail';

export const ExpenseList = () => {
  const {state} = useBudget();
  const filterExpenses = state.currentCategory
    ? state.expenses.filter(
        expense => expense.category === state.currentCategory
      )
    : state.expenses;
  const isEmpty = useMemo(() => filterExpenses.length === 0, [filterExpenses]);

  return (
    <div className="mt-10">
      {isEmpty ? (
        <p className="bg-red-600 p-2 text-center font-bold text-white rounded-lg">
          You don't have any expenses yet. Please enter one
        </p>
      ) : (
        <>
          <p className="text-gray-600 text-2xl font-bold my-5 text-center">
            {' '}
            List of Expenses
          </p>
          {filterExpenses.map(expense => (
            <ExpenseDetail key={expense.id} expense={expense} />
          ))}
        </>
      )}{' '}
    </div>
  );
};
