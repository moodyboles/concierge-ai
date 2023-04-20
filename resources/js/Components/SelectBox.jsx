import { forwardRef, useEffect, useRef } from 'react';
import _ from 'lodash';

export default forwardRef(function SelectBox({ className = '', isFocused = false, selected, select, ...props }, ref) {
    const input = ref ? ref : useRef();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    return (
        <select
            {...props}
            className={
                'border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm ' +
                className
            }
            ref={input}
            onChange={(e) => select(e.target.value)}
            defaultValue={selected}
        >
            {_.map(props.options, (name, value) => {
                return (
                    <option 
                        key={value} 
                        value={value}
                    >
                        {name}
                    </option>
                );
            })}
        </select>
    );
});
