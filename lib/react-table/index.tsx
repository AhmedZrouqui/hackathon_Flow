import { createColumnHelper } from '@tanstack/react-table'
import TableActions from '@/components/TableActions'
import { PlayerType } from '../validation'

const columnHelper = createColumnHelper<PlayerType>()

function reformulateSalary(salary: number): string {
    const suffixes = ['', 'k', 'M', 'B', 'T', 'Q']

    if (salary === 0) return salary.toString()

    const getSuffix = (num: number): string => {
        const magnitude = Math.floor(Math.log10(num) / 3)
        return suffixes[magnitude]
    }

    const formatNumber = (num: number, suffix: string): string => {
        const divisor = Math.pow(10, Math.floor(Math.log10(num) / 3) * 3)
        const formatted = (num / divisor).toFixed(2)
        return formatted + suffix
    }

    const suffix = getSuffix(salary)
    return formatNumber(salary, suffix)
}

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
                {info.row.getValue('devise')}{' '}
                {reformulateSalary(info.getValue())}
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
