import { useEffect, useState } from 'react';

const useDebounce = (value, time) => {
    const [debounceValue, setDebounceValue] = useState(value);

    useEffect(() => {
        const handle = setTimeout(() => {
            setDebounceValue(value);
        }, time);

        return () => {
            clearTimeout(handle);
        };
        // eslint-disable-next-line
    }, [value]);
    return debounceValue;
};

export default useDebounce;
