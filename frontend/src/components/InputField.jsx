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
    <div className="relative pt-2">
      {label && (
        <label
          htmlFor={name}
          className="absolute left-0 -top-3.5 text-sm font-bold text-white transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-3.5 peer-focus:text-sm peer-focus:text-gray-600 "
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
        className="border-3 w-full rounded-lg border border-zinc-800 bg-black p-2 text-white outline-offset-2 focus:outline focus:outline-blue-500 "
        placeholder={placeholder}
      />
    </div>
  );
};

export default InputField;
