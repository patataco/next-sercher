type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({
  children,
  type = 'button',
  className,
  ...rest
}: ButtonProps) => {
  return (
    <button type={type} className={`${className}`} {...rest}>
      {children}
    </button>
  );
};

export default Button;
