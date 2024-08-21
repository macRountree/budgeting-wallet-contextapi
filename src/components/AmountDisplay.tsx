import {formatCurrecny} from '../helpers';

interface AmountDisplayProps {
  label?: string;
  amount: number;
}

export const AmountDisplay = ({label, amount}: AmountDisplayProps) => {
  return (
    <p className=" text-2xl text-green-600 font-bold">
      {label && `${label}:`}
      <span className="font-black text-black">{formatCurrecny(amount)}</span>
    </p>
  );
};
