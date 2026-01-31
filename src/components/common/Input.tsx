import { type FC, type InputHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  name?: string;
  placeholder?: string;
  label?: string;
  type?: string;
  color?: 'black';
  containerClasses?: string;
  inputClasses?: string;
  labelClasses?: string;
};

const Input: FC<InputProps> = (props) => {
  const { label, containerClasses, inputClasses, labelClasses, color='black', ...rest } = props;

  const colors = {
    black: 'bg-black/50  text-white'
  }

  return (
    <div className={twMerge("w-full", containerClasses)}>
      {label && <div className={twMerge(labelClasses)}>{label}</div>}
      <input
        className={twMerge(
          'w-full focus:outline-none px-4 py-2 focus:py-4 rounded-2xl transition-all disabled:cursor-not-allowed',
          colors[color],
          inputClasses
        )}
        {...{ ...rest }}
      />
    </div>
  );
};

export default Input;
