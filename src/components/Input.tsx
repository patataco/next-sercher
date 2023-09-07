import React from 'react';

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;
const Input = ({ className, ...rest }: InputProps) => {
  return <input className={`${className}`} {...rest} />;
};

export default Input;
