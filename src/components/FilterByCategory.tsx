import {ChangeEvent} from 'react';
import {categories} from '../data/categories';
import {useBudget} from '../hooks/useBudget';

export const FilterByCategory = () => {
  const {dispatch} = useBudget();
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    console.log(e.target.value);
    dispatch({type: 'filter-by-category', payload: {id: e.target.value}});
  };
  return (
    <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg  p-10">
      <form action="">
        <div className="flex flex-col md:flex-row md:items-center gap-5">
          <label htmlFor="category" className="text-center">
            Spent Filter
          </label>
          <select
            id="category"
            className="flex-1 md:w-52 shadow-lg rounded-lg bg-slate-200"
            onChange={handleChange}
          >
            <option value="" className="text-center ">
              --All Categories--
            </option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {' '}
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </form>
    </div>
  );
};
