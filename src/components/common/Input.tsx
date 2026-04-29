import { useRef, type FC, type InputHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";
import { MdClear } from "react-icons/md";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  name?: string;
  placeholder?: string;
  label?: string;
  type?: string;
  color?: 'black' | 'white' | 'slate';
  containerClasses?: string;
  inputClasses?: string;
  labelClasses?: string;
  animate?: boolean;
  onClear?: () => void;
};

const Input: FC<InputProps> = (props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { placeholder, label, value, containerClasses, inputClasses, labelClasses, color = 'black', animate, onClear, ...rest } = props;

  const colors = {
    white: 'bg-black/10 text-black',
    black: 'bg-black/50 text-white',
    slate: 'bg-slate-300 text-slate-600'
  }

  const handleClear = () => {
    onClear?.()
  }


  return (
    <div className={twMerge("w-full h-full flex flex-col gap-2 justify-center items-center", containerClasses)}>
      {label && <div className={twMerge(labelClasses)}>{label}</div>}
      <div className={twMerge("flex w-full h-full gap-2 p-1  items-center rounded-2xl transition-all disabled:cursor-not-allowed",
        colors[color],
        inputClasses,
        animate ? 'focus:py-4' : '',
        )}>
        <input
          ref={inputRef}
          value={value}
          placeholder={placeholder}
          className={twMerge('w-full m-1 ml-2 focus:outline-none')}
          {...{ ...rest }}
        />
        {onClear && value && 
          <MdClear className="h-full w-9 cursor-pointer" onClick={handleClear} />
        }
      </div>

    </div>
  );
};

export default Input;
