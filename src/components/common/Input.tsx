import { type FC, type InputHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  name?: string;
  placeholder?: string;
  label?: string;
  type?: string;
  color?: 'black' | 'white';
  containerClasses?: string;
  inputClasses?: string;
  labelClasses?: string;
  animate?: boolean;
};

const Input: FC<InputProps> = (props) => {
  const { label, containerClasses, inputClasses, labelClasses, color='black', animate, ...rest } = props;

  const colors = {
    white: 'bg-black/10  text-black',
    black: 'bg-black/50  text-white'
  }

  return (
    <div className={twMerge("w-full flex gap-2 justify-center items-center", containerClasses)}>
      {label && <div className={twMerge(labelClasses)}>{label}</div>}
      <input
        className={twMerge(
          'w-full focus:outline-none px-4 py-2 rounded-2xl transition-all disabled:cursor-not-allowed',
          animate ? 'focus:py-4' : '',
          colors[color],
          inputClasses
        )}
        {...{ ...rest }}
      />
    </div>
  );
};

export default Input;
