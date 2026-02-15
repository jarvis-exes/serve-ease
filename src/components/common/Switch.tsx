import { type FC } from 'react'
import { twMerge } from 'tailwind-merge'
import * as Switch from '@radix-ui/react-switch';

type SwitchProps = {
    name: string;
    label?: string;
    checked?: boolean;
    className?: string;
    onChange?: () => void;
}

const SwitchButton: FC<SwitchProps> = ({ name, label, checked = true, className, onChange }) => {
    return (
        <div className={twMerge('flex gap-2', className)}>
            <label className="font-medium text-slate-700" htmlFor={name}>
                {label}
            </label>
            <Switch.Root
                id={name}
                checked={checked}
                onCheckedChange={onChange}
                className="w-10 h-6 bg-slate-300 rounded-full relative data-[state=checked]:bg-green-500 transition-colors outline-none"
            >
                <Switch.Thumb
                    className="block w-4 h-4 bg-white rounded-full transition-transform translate-x-1 will-change-transform data-[state=checked]:translate-x-5"
                />
            </Switch.Root>
        </div>
    )
}

export default SwitchButton