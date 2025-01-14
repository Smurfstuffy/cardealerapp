const Button = ({ label, onClick, disabled }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`px-4 py-2 text-xl md:text-3xl rounded-md text-white ${
      disabled
        ? 'bg-gray-400 cursor-not-allowed'
        : 'bg-blue-500 hover:bg-blue-600'
    }`}
  >
    {label}
  </button>
);

export default Button;
