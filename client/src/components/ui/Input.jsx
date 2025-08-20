const Input = ({ ...props }) => {
  return (
    <input
      className="w-full px-4 py-3 bg-white border-2 border-black focus:outline-none"
      {...props}
    />
  );
};

export default Input;
