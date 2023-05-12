// module
import styled from '@emotion/styled';
import { ReactSortable } from 'react-sortablejs';

export type GridActionType = 'edit' | 'delete' | 'sort'

interface GridProps<EntityModel extends { [key: string]: any }> {
    data: Array<EntityModel>;
    columns: Array<{ key: keyof EntityModel, title: string }>;
    sortable: boolean;
    actionable: boolean;
    actions: Array<{
        type: GridActionType
        icon: JSX.Element
        onClick?: (type: GridActionType, row: EntityModel) => void
    }>;
    onSort: (data: Array<EntityModel>) => void
}

const Grid = <EntityModel extends { id: number, [key: string]: any }>({
    data,
    columns,
    sortable,
    actionable,
    actions,
    onSort
}: GridProps<EntityModel>): JSX.Element => {
    return <GridWrapper>
        <GridRow key='header' isBody={false}>
            <GridCell key='row'>row</GridCell>
            {
                columns.map((col: { key: keyof EntityModel; title: string; }) => {
                    return <GridCell key={col.title}>{col.title}</GridCell>
                })
            }
            <GridCell key='actions'>actions</GridCell>
        </GridRow>
        <ReactSortable
            list={data}
            setList={(newList: Array<EntityModel>) => onSort(newList)}
            disabled={!sortable}
            animation={300}
            className='-------'
            style={{
                width: '100%',
                height: 'max-content',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'center',
                gap: '5px',
            }}
        >
            {
                data.length && data.map((row: EntityModel, i: number) => {
                    return <GridRow key={row.id + i.toString()} isBody={true} className='grid-row'>
                        <GridCell key='row'>{i + 1}</GridCell>
                        {
                            columns.map((col: { key: keyof EntityModel; title: string; }) => {
                                return <GridCell key={col.title}>{row[col.key]}</GridCell>
                            })
                        }
                        <GridCell>
                            <ActionsWrapper key='actions'>
                                {
                                    actions.map((actions: {
                                        type: GridActionType;
                                        icon: JSX.Element;
                                        onClick?: ((type: GridActionType, row: EntityModel) => void) | undefined;
                                    }) => {
                                        return <GridCell
                                            style={{ cursor: actionable ? 'pointer' : 'not-allowed' }}
                                            key={actions.type}
                                            onClick={() =>
                                                actionable &&
                                                actions.onClick &&
                                                actions.onClick(actions.type, row)}
                                        >
                                            {actions.icon}
                                        </GridCell>
                                    })
                                }
                            </ActionsWrapper>
                        </GridCell>
                    </GridRow>
                })
            }
        </ReactSortable>
        {
            !data.length && <span>Not Found Data</span>
        }
    </GridWrapper>
}

export default Grid;

const GridWrapper = styled.div(() => ({
    boxSizing: 'border-box',
    padding: 0,
    margin: 0,
    width: '100%',
    height: 'max-content',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: '20px',
}))

const GridRow = styled.div<any>(({ isBody, theme }) => ({
    boxSizing: 'border-box',
    paddingBlock: isBody ? '10px' : 0,
    paddingInline: '5px',
    margin: 0,
    width: '100%',
    height: 'max-content',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    cursor: isBody ? 'move' : 'default',
    borderBottom: `1px solid ${theme.palette.color}`
}))

const GridCell = styled.div(() => ({
    boxSizing: 'border-box',
    display: 'inline-flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1,
    flexBasis: 0,
}))

const ActionsWrapper = styled.div(() => ({
    boxSizing: 'border-box',
    display: 'inline-flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: '25px'
}))