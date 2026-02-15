import { Controller, type Control, type FieldValues, type Path } from 'react-hook-form'
import SwitchButton from './Switch';

type FormSwitchProps<T extends FieldValues> = {
    name: Path<T>;
    control?: Control<T>;
    label?: string;
    className?: string
}

const FormSwitch = <T extends FieldValues>({ name, control, label, className }: FormSwitchProps<T>) => {
    return (<Controller
        name={name}
        control={control}
        render={({ field }) => (
            <SwitchButton 
                name={name}
                label={label}
                checked={field.value}
                className={className}
                onChange={field.onChange}
            />
        )}
    />)
}

export default FormSwitch

