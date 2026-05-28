import { useEffect, useState } from "react";

export default function useDebounce(value: string, delay = 500) {
  const [debounceValue, setDebounceValue] = useState<string>("");

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      setDebounceValue(value);
    }, delay);

    return () => clearTimeout(timeOutId);
  }, [value, delay]);

  return debounceValue;
}
