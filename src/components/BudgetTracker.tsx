import {CircularProgressbar, buildStyles} from 'react-circular-progressbar';
import {useBudget} from '../hooks/useBudget';
import {AmountDisplay} from './AmountDisplay';
import 'react-circular-progressbar/dist/styles.css';
export const BudgetTracker = () => {
  const {state, remainingBudget, totalExpenses, dispatch} = useBudget();

  const percentageSpent = +((totalExpenses / state.budget) * 100).toFixed(2);

  // console.log(percentageSpent);
  const percentageStyles =
    percentageSpent <= 50
      ? '#16a34a'
      : percentageSpent <= 75
      ? '#ca8a04'
      : percentageSpent <= 95
      ? '#ea580c'
      : '#f02849';
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <div className="flex justify-center">
        <CircularProgressbar
          value={percentageSpent}
          styles={buildStyles({
            pathColor: `${percentageStyles}`,
            trailColor: '#F5F5F5',
            textSize: '10px',
            textColor: `${percentageStyles} `,
          })}
          text={`${percentageSpent}% Spent`}
          // className="bg-orange-600"
        />
        {/*
         '#ca8a04'- yellow ,
          #ea580c - orange,
          #16a34a - green,
          #f02849 - red,
        */}
      </div>
      <div className="flex flex-col justify-center items-center gap-8">
        <button
          type="button"
          className="bg-orange-600 w-full rounded-lg font-bold text-white p-2 uppercase"
          onClick={() => dispatch({type: 'reset-app'})}
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
