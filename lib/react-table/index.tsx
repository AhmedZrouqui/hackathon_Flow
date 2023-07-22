import { createColumnHelper } from '@tanstack/react-table'
import { IPlayer } from '../types'
import TableActions from '@/components/TableActions'

const columnHelper = createColumnHelper<IPlayer>()

export const cols = [
    columnHelper.accessor('firstname', { header: '', cell: () => {} }),
    columnHelper.accessor('lastname', { header: '', cell: () => {} }),
    columnHelper.accessor('devise', { header: '', cell: () => {} }),
    columnHelper.accessor('id', {
        header: 'ID',
        cell: (info) => <p>{info.getValue()}</p>,
    }),
    columnHelper.display({
        header: 'Full Name',
        cell: (info) => {
            return (
                <p>
                    {info.row.getValue('firstname')}{' '}
                    {info.row.getValue('lastname')}
                </p>
            )
        },
        footer: (props) => props.column.id,
    }),
    columnHelper.accessor('salary', {
        header: 'Salary',
        cell: (info) => (
            <p>
                {' '}
                {info.getValue()} {info.row.getValue('devise')}{' '}
            </p>
        ),
    }),
    columnHelper.accessor('goal', {
        header: 'Goals',
        cell: (info) => <p> {info.getValue()}</p>,
    }),
    columnHelper.display({
        header: 'Actions',
        cell: (info) => <TableActions playerId={info.row.getValue('id')} />,
    }),
]
