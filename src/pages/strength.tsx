// module
import { ReactNode, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import styled from "@emotion/styled";
import * as yup from "yup";
// custom
import Form from '../components/form/form';
import NumberInput from "../components/form/elements/number-input";
import Button from "../components/form/elements/button";
import { Toaster } from "../components/notices/toaster";
import strengthCalculator from "../utils/strengthCalculator";

interface StrengthForm {
    number: number | string
}

const Strength = (): ReactNode => {
    const form: StrengthForm = { number: '' };
    const [data, setData] = useState<{
        number: number,
        count: number,
        result: number
    }>({ number: 0, count: 0, result: 0 });

    return (
        <PageWrapper>
            <Form<StrengthForm>
                formType='CREATE'
                defaultValue={form}
                validation={strengthFormValidation}
                style={{
                    width: '50%',
                    flexDirection: 'column'
                }}
                fieldsRenderer={(data: {
                    reactHookFormObject: UseFormReturn<StrengthForm>;
                    defaultValue: StrengthForm;
                }) => {
                    return <>
                        <NumberInput<StrengthForm>
                            data={data}
                            name='number'
                            label={<>
                                <span style={{ paddingRight: '3px' }}>enter your number</span>
                                <span style={{ color: 'red' }}>*</span>
                            </>}
                        />
                        <Button
                            disable={!data.reactHookFormObject.formState.isValid}
                            title="Calculate"
                            onClick={() => {
                                data.reactHookFormObject.handleSubmit(
                                    (formData: StrengthForm) => {
                                        setData({ ...strengthCalculator(Number(formData.number), Number(formData.number), 0) });
                                        data.reactHookFormObject.reset();
                                    },
                                    () => Toaster.error('you should enter valid number', { position: 'top-right', toastId: 'Strength' })
                                )()
                            }}
                        />
                    </>
                }}
            />
            {
                data.number !== 0 &&
                <ResultWrapper>
                    <span>{`The number is ${data.number}`}</span>
                    <span>{`And ${data.count} times multiplication has been done`}</span>
                    <span>{`and the final value is ${data.result}`}</span>
                </ResultWrapper>
            }
        </PageWrapper>
    );
};

export default Strength;

const strengthFormValidation = yup.object({
    number: yup.number().required('field required').min(1).integer(),
}).required();

const PageWrapper = styled.div(() => ({
    boxSizing: 'border-box',
    width: '100%',
    height: 'max-content',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: '20px',
    padding: '50px',
}))

const ResultWrapper = styled.div(() => ({
    boxSizing: 'border-box',
    width: '100%',
    height: 'max-content',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    fontSize: '25px',
}))