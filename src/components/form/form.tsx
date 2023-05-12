// module
import { useForm, UseFormProps, UseFormReturn } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import styled from '@emotion/styled'

export type FormType = 'CREATE' | 'UPDATE';

export interface TaskFormProps<EntityModel extends Record<string, any>> {
    formType: FormType;
    defaultValue: EntityModel;
    validation: any;
    useFormProps?: UseFormProps<EntityModel, any>;
    style?: FormWrapperProps['style'];
    fieldsRenderer: (data: {
        reactHookFormObject: UseFormReturn<EntityModel>,
        defaultValue: EntityModel
    }) => JSX.Element | Array<JSX.Element>;
}

const Form = <EntityModel extends Record<string, any>>({
    validation,
    useFormProps,
    style,
    defaultValue,
    fieldsRenderer
}: TaskFormProps<EntityModel>) => {

    const reactHookFormObject = useForm<EntityModel>({
        resolver: yupResolver(validation),
        mode: 'all',
        ...useFormProps
    });

    return <FormWrapper style={style}>
        {fieldsRenderer({ reactHookFormObject, defaultValue })}
    </FormWrapper>;
}

export default Form;


interface FormWrapperProps {
    style?: { [key: string]: string | number };
}

const FormWrapper = styled.form<FormWrapperProps>(({ style }) => ({
    width: '100%',
    maxWidth: '100%',
    height: 'max-content',
    maxHeight: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: 0,
    margin: 0,
    fontFamily: 'sans-serif',
    boxSizing: 'border-box',
    ...style,
}));