const Selector = ({ placeholder, options, value, onChange }) => (
  <select
    value={value}
    onChange={onChange}
    className="border border-gray-400 bg-gray-200 text-gray-800 text-xl md:text-3xl rounded-md p-2 w-full"
  >
    <option value="" disabled>
      {placeholder}
    </option>
    {options.map((option) => (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    ))}
  </select>
);

export default Selector;
