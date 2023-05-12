// module
import { ReactNode, useEffect, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import styled from "@emotion/styled";
import * as yup from "yup";
import { BsArrowsMove, BsPencilSquare, BsTrashFill } from "react-icons/bs";
// custom
import Form from '../components/form/form';
import StringInput from "../components/form/elements/string-input";
import Button from "../components/form/elements/button";
import { Toaster } from "../components/notices/toaster";
import { TaskEntity } from "../models/task.entity";
import useStore from "../state-management/store";
import { Store } from "../models/store";
import Grid, { GridActionType } from "../components/grid/grid";
import jsonLineSpliter from "../utils/jsonLineSpliter";
import stringToValidJsonConvertor from "../utils/stringToValidJsonConvertor";

const TodoList = (): ReactNode => {
    const tasks: Array<TaskEntity> = useStore((store: Store) => store.tasks);
    const [form, setForm] = useState<TaskEntity>({ content: '', id: 0 });
    const [json, setJson] = useState<string>(jsonLineSpliter(tasks))
    const addTask = useStore((store: Store) => store.addTask);
    const updateTask = useStore((store: Store) => store.updateTask);
    const deleteTask = useStore((store: Store) => store.deleteTask);
    const updateTasks = useStore((store: Store) => store.updateTasks);
    const deleteTasks = useStore((store: Store) => store.deleteTasks);

    useEffect(() => { setJson(jsonLineSpliter(tasks)) }, [tasks])

    return (
        <PageWrapper>
            <Form<TaskEntity>
                formType={form.id ? 'UPDATE' : 'CREATE'}
                defaultValue={form}
                validation={todoFormValidation}
                style={{
                    width: '50%',
                    flexDirection: 'column'
                }}
                fieldsRenderer={(data: {
                    reactHookFormObject: UseFormReturn<TaskEntity>;
                    defaultValue: TaskEntity;
                }) => {
                    return <>
                        <StringInput<TaskEntity>
                            data={data}
                            name='id'
                            label={<>
                                <span style={{ paddingRight: '3px' }}>id</span>
                                <span style={{ color: 'red' }}>*</span>
                            </>}
                            style={{ display: 'none' }}
                        />
                        <StringInput<TaskEntity>
                            data={data}
                            name='content'
                            label={<>
                                <span style={{ paddingRight: '3px' }}>content</span>
                                <span style={{ color: 'red' }}>*</span>
                            </>}
                        />
                        <Button
                            disable={!data.reactHookFormObject.formState.isValid}
                            title={form.id ? 'Update' : 'Create'}
                            onClick={() => {
                                data.reactHookFormObject.handleSubmit(
                                    (formData: TaskEntity) => {
                                        if (form.id > 0) {
                                            updateTask({ ...formData, id: form.id })
                                        } else {
                                            addTask({ ...formData, id: tasks.length + 1 });
                                        }
                                        setForm({ content: '', id: 0 })
                                        data.reactHookFormObject.reset();
                                    },
                                    () => Toaster.error('you should enter a text', { position: 'top-right', toastId: 'Strength' })
                                )()
                            }}
                        />
                    </>
                }}
            />
            <ActionsWrapper>
                <Button
                    disable={tasks.length ? false : true}
                    title="Delete All"
                    onClick={() => deleteTasks()}
                />
            </ActionsWrapper>
            <PageSpliter>
                <Grid<TaskEntity>
                    data={tasks}
                    columns={[
                        { key: 'content', title: 'content' },
                        { key: 'id', title: 'id' },
                    ]}
                    sortable={true}
                    actionable={form.id === 0 && form.content === ''}
                    actions={[
                        {
                            type: 'sort',
                            icon: <BsArrowsMove color='green' cursor='move' title='move' />
                        },
                        {
                            type: 'edit',
                            icon: <BsPencilSquare color='blue' title='edit' />,
                            onClick: (type: GridActionType, row: TaskEntity) => setForm(row)
                        },
                        {
                            type: 'delete',
                            icon: <BsTrashFill color='red' title='delete' />,
                            onClick: (type: GridActionType, row: TaskEntity) => deleteTask(row.id)
                        },
                    ]}
                    onSort={(data: Array<TaskEntity>) => {
                        const modifiedData: Array<TaskEntity> = data.map(
                            (item: TaskEntity, i: number) => {
                                if ('chosen' in item) {
                                    delete (item.chosen);
                                }
                                return { ...item, id: i + 1 }
                            }
                        )
                        updateTasks(modifiedData)
                    }}
                />
                <JsonPlaceholder>
                    <Textarea
                        row={15}
                        value={json}
                        onChange={(e: any) => setJson(e.target.value)}
                        onKeyDown={(e: any) => {
                            const data: Array<TaskEntity> | false =
                                stringToValidJsonConvertor<TaskEntity>(e.target.value, { 'id': 'number', 'content': 'string' })
                            if (e.key === "Enter" && data !== false) {
                                updateTasks(data);
                            } else {
                                if (e.key === "Enter") {
                                    Toaster.error('Please enter valid JSON', { toastId: 'not-valid-json' })
                                }
                            }
                        }}
                    />
                </JsonPlaceholder>
            </PageSpliter>
        </PageWrapper>
    );
};

export default TodoList;

const todoFormValidation = yup.object({
    content: yup.string().required('field required'),
    id: yup.number()
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
}));

const ActionsWrapper = styled.div(() => ({
    boxSizing: 'border-box',
    width: '100%',
    height: 'max-content',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: '15px',
}));

const PageSpliter = styled.div(() => ({
    boxSizing: 'border-box',
    width: '100%',
    height: 'max-content',
    padding: 0,
    margin: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    '> div': {
        width: '50%',
        maxWidth: '50%',
    }
}));

const JsonPlaceholder = styled.div(() => ({
    boxSizing: 'border-box',
    height: 'max-content',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '15px'
}))

const Textarea = styled.textarea<any>(({ theme }) => ({
    boxSizing: 'border-box',
    width: '100%',
    minHeight: '300px',
    overflowY: 'auto',
    border: `1px solid ${theme.palette.color}`,
    borderRadius: '5px',
}))