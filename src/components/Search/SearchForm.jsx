export const SearchForm = ({
  value,
  onChange,
  onFocus,
  onBlur,
  suggestions,
  onSelect,
  placeholder,
  isOpen,
}) => (
  <div className="flex flex-col relative h-14 w-44">
    <input
      className="border-2 border-outline placeholder-text-secondary rounded-lg h-14 w-full pl-4 pr-4"
      type="text"
      value={value}
      placeholder={placeholder}
      onBlur={onBlur}
      onFocus={onFocus}
      onChange={onChange}
    />
    {isOpen && value && suggestions.length > 0 && (
      <ul className="absolute mt-14 bg-surface-container border-2 border-outline rounded-lg w-full max-h-48 overflow-y-auto z-10">
        {suggestions.map((city) => (
          <li onMouseDown={() => onSelect(city.name)} key={city.id}>
            {city.name}
          </li>
        ))}
      </ul>
    )}
  </div>
);
