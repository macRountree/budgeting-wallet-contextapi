import {v4 as uuidv4} from 'uuid';
import {Category, DraftExpense, Expense} from '../interfaces';

// * Action

export type BudgetActions =
  | {
      type: 'add-budget';
      payload: {budget: number};
    }
  | {type: 'show-modal'}
  | {type: 'hide-modal'}
  | {type: 'add-expense'; payload: {expense: DraftExpense}} //*No need id
  | {type: 'delete-expense'; payload: {id: Expense['id']}}
  | {type: 'update-expense-by-id'; payload: {id: Expense['id']}}
  | {type: 'update-expense'; payload: {expense: Expense}}
  | {type: 'reset-app'}
  | {type: 'filter-by-category'; payload: {id: Category['id']}};
// *State

export interface BudgetState {
  budget: number;
  modal: boolean;
  expenses: Expense[];
  updateId: Expense['id'];
  currentCategory: Category['id'];
}
//*From localStorage needs budget and expenses
const initialBudget = (): number => {
  const budgetStorage = localStorage.getItem('budget');
  return budgetStorage ? +budgetStorage : 0;
};

const initialExpenses = (): Expense[] => {
  const expensesStorage = localStorage.getItem('expenses');
  return expensesStorage ? JSON.parse(expensesStorage) : [];
};
export const initialState: BudgetState = {
  budget: initialBudget(),
  modal: false,
  expenses: initialExpenses(),
  updateId: '',
  currentCategory: '',
};

const createExpense = (draftExpense: DraftExpense): Expense => {
  return {...draftExpense, id: uuidv4()};
};

// *Reducer
export const budgetReducer = (
  state: BudgetState = initialState,
  action: BudgetActions
) => {
  if (action.type === 'add-budget') {
    return {...state, budget: action.payload.budget};
  }
  if (action.type === 'show-modal') {
    return {...state, modal: true};
  }
  if (action.type === 'hide-modal') {
    return {...state, modal: false, updateId: ''};
  }
  if (action.type === 'add-expense') {
    const expense = createExpense(action.payload.expense);
    return {...state, expenses: [...state.expenses, expense], modal: false};
  }
  if (action.type === 'delete-expense') {
    const expenses = state.expenses.filter(
      expense => expense.id !== action.payload.id
    );
    return {...state, expenses};
  }

  if (action.type === 'update-expense-by-id') {
    return {...state, updateId: action.payload.id, modal: true};
  }
  if (action.type === 'update-expense') {
    return {
      ...state,
      expenses: state.expenses.map(expense =>
        expense.id === action.payload.expense.id
          ? action.payload.expense
          : expense
      ),
      modal: false,
      updateId: '',
    };
  }
  if (action.type === 'reset-app') {
    return {...state, budget: 0, expenses: []};
  }
  if (action.type === 'filter-by-category') {
    return {...state, currentCategory: action.payload.id};
  }
  return state;
};
