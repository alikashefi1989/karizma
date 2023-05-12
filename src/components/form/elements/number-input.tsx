// module
import { RegisterOptions, UseFormReturn } from "react-hook-form";
import styled from "@emotion/styled";

interface NumberInputProps<EntityModel extends Record<string, any>> {
    label: string | JSX.Element;
    name: keyof EntityModel;
    data: { reactHookFormObject: UseFormReturn<EntityModel>, defaultValue: EntityModel };
    registerOptions?: RegisterOptions<EntityModel, any>
    style?: WrapperProps['style'];
}

const NumberInput = <EntityModel extends Record<string, any>>({
    style,
    label,
    name,
    data,
    registerOptions
}: NumberInputProps<EntityModel>): JSX.Element => {
    return <Wrapper style={style}>
        <Label>{label}</Label>
        <NumberInputWrapper
            type='number'
            key={name.toString()}
            defaultValue={data.defaultValue[name]}
            error={typeof data.reactHookFormObject.formState.errors[name] !== 'undefined'}
            {...data.reactHookFormObject.register(name as any, registerOptions ? { ...registerOptions } : undefined)}
        />
        <Error>
            {
                data.reactHookFormObject.formState.errors &&
                data.reactHookFormObject.formState.errors[name] &&
                data.reactHookFormObject.formState.errors[name]?.message &&
                `${data.reactHookFormObject.formState.errors[name]?.message}`
            }
        </Error>
    </Wrapper>;
};

export default NumberInput;

interface WrapperProps {
    style?: { [key: string]: string | number };
}

const Wrapper = styled.div<WrapperProps>(({ style }) => ({
    width: '100%',
    height: 'max-content',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'start',
    marginTop: '10px',
    marginBottom: '10px',
    ...style,
    '> input[type=number]': {
        '::-webkit-inner-spin-button': {
            '-webkit-appearance': 'none',
            margin: 0,
        },
        '::-webkit-outer-spin-button': {
            '-webkit-appearance': 'none',
            margin: 0,
        }
    }
}));

const NumberInputWrapper = styled.input<any>(({ error, theme }) => ({
    width: '100%',
    height: '50px',
    borderRadius: '5px',
    fontSize: '20px',
    padding: '5px',
    marginBottom: '7px',
    marginTop: '10px',
    boxSizing: 'border-box',
    fontFamily: 'sans-serif',
    backgroundColor: theme.palette.backgroundColor,
    border: `1px solid ${error ? 'red' : theme.palette.color}`,
    color: theme.palette.color,
}));

const Label = styled.div<any>(({ theme }) => ({
    width: '100%',
    height: '15px',
    textAlign: 'left',
    fontWeight: 600,
    fontSize: '20px',
    textTransform: 'capitalize',
    fontFamily: 'sans-serif',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    color: theme.palette.color,
}));

const Error = styled.div(() => ({
    width: '100%',
    height: '15px',
    textAlign: 'left',
    fontWeight: 200,
    fontSize: '12px',
    color: 'red',
    fontFamily: 'sans-serif',
}));