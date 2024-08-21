import {createContext, Dispatch, useMemo, useReducer} from 'react';
import {
  BudgetActions,
  budgetReducer,
  BudgetState,
  initialState,
} from '../reducers/budgetReducer';

interface BudgetContextProps {
  state: BudgetState;
  dispatch: Dispatch<BudgetActions>;
  totalExpenses: number;
  remainingBudget: number;
}

interface BudgetProviderProps {
  children: React.ReactNode;
}

//*Context:
export const BudgetContext = createContext<BudgetContextProps>(null!);

//* Provider : Access to the state and dispatch
//* children: Children of the component
export const BudgetProvider = ({children}: BudgetProviderProps) => {
  const [state, dispatch] = useReducer(budgetReducer, initialState);

  const totalExpenses = useMemo(
    () => state.expenses.reduce((total, expense) => expense.amount + total, 0),
    [state.expenses]
  );

  const remainingBudget = state.budget - totalExpenses;
  return (
    <BudgetContext.Provider
      value={{state, dispatch, totalExpenses, remainingBudget}}
    >
      {' '}
      {/*  
      Value: state and dispatch BudgetContext.Provider: Provider of the
      
      context.. connects the state and dispatch */}
      {children}
    </BudgetContext.Provider>
  );
};
