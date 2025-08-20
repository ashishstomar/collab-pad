const Button = ({ children, onClick, disabled, color = "lime", ...props }) => {
  const colorClasses = {
    lime: "bg-lime-400",
    cyan: "bg-cyan-400",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-full flex items-center justify-center px-4 py-3 text-black font-bold border-2 border-black shadow-[4px_4px_0_0_#000] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all disabled:opacity-50 ${colorClasses[color]}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
