import { useState } from 'react';

export const useInput = (initialValue?: string) => {
  const [value, setValue] = useState(initialValue || '');
  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };
  const onInitial = () => setValue(initialValue || '');
  return { value, setValue, onChange, onInitial };
};
