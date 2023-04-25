const ErrorMessage = ({ message }:{message:string}) => {
  return (
    <div className="mb-4 rounded-md border border-red-200 bg-red-100 px-4 py-2 text-red-700">
      {message}
    </div>
  );
};

export default ErrorMessage;
