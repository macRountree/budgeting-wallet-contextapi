import {ReactNode} from 'react';

interface ErrorMessageProps {
  children: ReactNode;
}

export const ErrorMessage = ({children}: ErrorMessageProps) => {
  return (
    <p className="bg-red-600 text-center p-2 rounded-lg text-white font-bold">
      {children}{' '}
    </p>
  );
};
