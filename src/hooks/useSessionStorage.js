import { useState, useEffect } from 'react';

// Custom hook for managing state with SessionStorage
const useSessionStorage = (key, initialValue) => {
  // Get initial value from SessionStorage or use provided initialValue
  const [value, setValue] = useState(() => {
    try {
      const item = sessionStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error('Error reading from SessionStorage:', error);
      return initialValue;
    }
  });

  // Update SessionStorage when value changes
  useEffect(() => {
    try {
      sessionStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Error writing to SessionStorage:', error);
    }
  }, [key, value]);

  return [value, setValue];
};

export default useSessionStorage;