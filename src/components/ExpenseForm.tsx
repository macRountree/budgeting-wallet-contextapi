import {categories} from '../data/categories';
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import {ChangeEvent, FormEvent, useEffect, useState} from 'react';
import type {DraftExpense} from '../interfaces';
import {Value} from '../interfaces/index';
import {ErrorMessage} from './ErrorMessage';
import {useBudget} from '../hooks/useBudget';

export const ExpenseForm = () => {
  // Create state for the form
  const [expense, setExpense] = useState<DraftExpense>({
    amount: 0,
    expenseName: '',
    category: '',
    date: new Date(),
  });

  const [error, setError] = useState('');
  const [previousAmount, setPreviousAmount] = useState(0);
  const {state, dispatch, remainingBudget} = useBudget();

  //*state is the object that contains the budget, modal, expenses, and updateId... need state to fill the form

  useEffect(() => {
    if (state.updateId) {
      const expenseToUpdate = state.expenses.filter(
        expense => expense.id === state.updateId
      )[0];

      setExpense(expenseToUpdate);
      setPreviousAmount(expenseToUpdate.amount);
    }
  }, [state.updateId]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    const {name, value} = e.target;

    const isAmountInput = ['amount'].includes(name);

    setExpense({...expense, [name]: isAmountInput ? +value : value}); //* Need to convert to number if isAmountInput is true
  };

  //* Value is a type from react-date-picker devs
  const handleChangeDate = (value: Value) => {
    setExpense({...expense, date: value});
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(e.target);

    //*Object.value is a method that returns an array of a given object's own enumerable property values

    if (Object.values(expense).includes('')) {
      // console.log('all fields are required');
      setError('All fields are required');
      return;
    }

    //*Check if the amount is greater than the budget
    if (expense.amount - previousAmount > remainingBudget) {
      // console.log('all fields are required');
      setError('The amount is greater than the remaining budget');
      return;
    }

    //*Add or update expense to the state
    if (state.updateId) {
      dispatch({
        type: 'update-expense',
        payload: {expense: {id: state.updateId, ...expense}},
      });
    } else {
      dispatch({type: 'add-expense', payload: {expense}});
    }

    //*Reset form
    setExpense({
      amount: 0,
      expenseName: '',
      category: '',
      date: new Date(),
    });
    setPreviousAmount(0);
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <legend className=" uppercase text-center text-2xl font-black border-b-4 border-green-600 py-2">
        {state.updateId ? 'Edit Expense' : 'New Expense'}
      </legend>

      {error && <ErrorMessage>{error} </ErrorMessage>}

      <div className="flex flex-col gap-2">
        <label htmlFor="expenseName" className="text-xl">
          Expense title:
        </label>
        <input
          type="text"
          name="expenseName"
          id="expenseName"
          placeholder="Enter expense title"
          className="bg-slate-200 rounded-lg p-2"
          value={expense.expenseName}
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="amount" className="text-xl">
          Amount:
        </label>
        <input
          type="number"
          name="amount"
          id="amount"
          placeholder="Enter amount"
          className="bg-slate-200 rounded-lg p-2"
          value={expense.amount}
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="category" className="text-xl">
          Category:
        </label>
        <select
          name="category"
          id="category"
          className="bg-slate-200 rounded-lg p-2"
          value={expense.category}
          onChange={handleChange}
        >
          {' '}
          <option value=""> --Select --</option>{' '}
          {categories.map(category => (
            <option key={category.id} value={category.id}>
              {category.name}{' '}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="" className="text-xl">
          Date:
        </label>
        <DatePicker
          className="bg-slate-100 border-0"
          value={expense.date}
          onChange={handleChangeDate}
        />
      </div>
      <input
        type="submit"
        className="bg-green-600 p-2 rounded-lg w-full text-white font-bold uppercase cursor-pointer"
        value={state.updateId ? 'Edit Expense' : 'Register New Expense'}
      />
    </form>
  );
};
