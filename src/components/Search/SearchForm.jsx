import { forwardRef } from "react";

export const RangeDateInput = forwardRef(
  ({ value, onChange, onClick, className, placeholder, ...rest }, ref) => {
    const handleChange = (e) => {
      const cleaned = e.target.value.replace(/[^\d.\-\s]/g, "");
      onChange({
        target: { ...e.target, value: cleaned },
      });
    };

    return (
      <input
        ref={ref}
        value={value ?? ""}
        onChange={handleChange}
        onClick={onClick}
        className={className}
        placeholder={placeholder}
        inputMode="numeric"
        autoComplete="off"
        {...rest}
      />
    );
  },
);

export const SearchForm = ({
  value,
  onChange,
  onFocus,
  onBlur,
  suggestions,
  onSelect,
  placeholder,
  isOpen,
  label,
  isFocused,
}) => {
  const isFloating = isFocused || (value && value.length > 0);
  return (
    <div className="flex relative flex-col  h-14 w-55">
      <input
        className=" border-2 border-outline placeholder-text-secondary rounded-lg h-14 w-full pt-2 pl-4 pr-4"
        type="text"
        value={value}
        placeholder={placeholder}
        onBlur={onBlur}
        onFocus={onFocus}
        onChange={onChange}
      />
      {label && (
        <label
          className={`absolute left-4 pointer-events-none transition-all duration-200
            ${
              isFloating
                ? "top-2 text-xs text-primary"
                : "top-1/2 -translate-y-1/2 text-text-secondary"
            }`}
        >
          {label}
        </label>
      )}
      {isOpen && value && suggestions.length > 0 && (
        <ul className="absolute mt-14 bg-surface-container border-2 border-outline rounded-lg w-full max-h-48 overflow-y-auto z-10">
          {suggestions.map((city) => (
            <li onMouseDown={() => onSelect(city)} key={city.id}>
              {city.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
