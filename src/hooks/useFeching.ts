import { useState } from 'react';

type CallbackType = () => Promise<void>;

const useFetching = (callback: CallbackType) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setFetchError] = useState('');

  const fetching = async () => {
    try {
      setIsLoading(true);
      await callback();
    } catch (e: any) {
      if (e instanceof Error) {
        setFetchError(e.message);
      } else {
        setFetchError('An unknown error occurred.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return [fetching, isLoading, error] as const;
};
export default useFetching;
