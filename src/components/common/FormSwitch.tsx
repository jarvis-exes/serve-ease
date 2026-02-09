import { Controller, type Control, type FieldValues, type Path } from 'react-hook-form'
import * as Switch from '@radix-ui/react-switch';

type FormSwitchProps<T extends FieldValues> = {
    name: Path<T>;
    control: Control<T>;
    label?: string;
}

const FormSwitch = <T extends FieldValues>({ name, control, label }: FormSwitchProps<T>) => {
    return (<Controller
        name={name}
        control={control}
        render={({ field }) => (
            <div className='flex gap-2'>
                <label className="font-medium text-slate-700" htmlFor={name}>
                    {label}
                </label>
                <Switch.Root
                    id={name}
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="w-10 h-6 bg-slate-300 rounded-full relative data-[state=checked]:bg-green-500 transition-colors outline-none"
                >
                    <Switch.Thumb
                        className="block w-4 h-4 bg-white rounded-full transition-transform translate-x-1 will-change-transform data-[state=checked]:translate-x-5"
                    />
                </Switch.Root>
            </div>
        )}
    />)
}

export default FormSwitch

