interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "contained" | "outlined";
}

const Button = ({ variant = "contained", ...rest }: ButtonProps) => {
  return (
    <button
      {...rest}
      className={`${
        variant === "contained"
          ? "bg-blue-500 hover:bg-blue-700 text-white border-blue-500 border"
          : "bg-transparent hover:bg-blue-500 text-blue-700 hover:text-white border-blue-500 border hover:border-transparent"
      } py-2 px-4 rounded disabled:pointer-events-none disabled:opacity-50`}
    >
      {rest.children}
    </button>
  );
};

export { Button };

//
