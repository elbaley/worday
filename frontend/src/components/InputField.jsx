const InputField = ({
  name,
  value,
  onChange,
  label,
  labelText,
  placeholder = name,
  type = "text",
}) => {
  return (
    <div className='relative pt-2'>
      {label && (
        <label
          htmlFor={name}
          className='absolute font-bold left-0 -top-3.5 text-white text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm '
        >
          {labelText}
        </label>
      )}
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        className='w-full focus:outline outline-offset-2 focus:outline-blue-500 bg-black p-2 text-white border-zinc-800 border border-3 rounded-lg '
        placeholder={placeholder}
      />
    </div>
  );
};

export default InputField;
