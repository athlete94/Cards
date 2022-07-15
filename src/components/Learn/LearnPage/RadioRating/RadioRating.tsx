import React, {ChangeEvent, InputHTMLAttributes, DetailedHTMLProps} from "react";

type DefaultRadioPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

type RadioInputPropsTypePropsType = DefaultRadioPropsType & {
    options?: any[]
    onChangeOption?: (option: any) => void
};

export const RadioRating: React.FC<RadioInputPropsTypePropsType> = (
    {
        type, name,
        options, value,
        onChange, onChangeOption,
        ...restProps
    }
) => {
    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
        onChange && onChange(e);
        onChangeOption && onChangeOption(e.currentTarget.value);
    }

    const mappedOptions: any[] = options ? options.map((opt, i) => (
        <label key={name + '-' + i} >
            <input
                type={'radio'}
                name={name}
                value={opt}
                checked={opt === value}
                onChange={onChangeCallback}
                {...restProps}
            />
            {opt}
        </label>
    )) : []

    return (
        <div>
            {mappedOptions}
        </div>
    );
}

