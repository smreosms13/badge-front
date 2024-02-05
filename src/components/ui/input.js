import { cn } from "@/lib/utils";

const Select = ({ defaultValue, options, onChange, selectRef, className, ...props }) => {
    const handleChange = () => {
        const newValue = selectRef.current.value;
        onChange(newValue);
    };
  
    return (
        <select 
            ref={selectRef}
            defaultValue={defaultValue}
            onChange={handleChange}
            className={cn("appearance-none p-2 border rounded-xl mt-4 ring-0 focus-visible:bg-none focus:outline-none", className)}
            {...props}
        >
            <option key="default" value={defaultValue} disabled>{defaultValue}</option>
            {options.map((option) => (
                <option key={option} value={option}>
                    {option}
                </option>
            ))}
        </select>
    );
  };

const Input = ({ value, onChange, inputRef, className, ...props }) => {
    const handleChange = () => {
        const newValue = inputRef.current.value;
        onChange(newValue);
    };

    return (
        <input
            ref={inputRef}
            value={value}
            onChange={handleChange}
            className={cn("appearance-none p-2 border rounded-xl mt-4 ring-0 focus-visible:bg-none focus:outline-none", className)}
            {...props}
        />
    );
};


export { Select, Input };