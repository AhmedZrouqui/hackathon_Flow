'use client'

import { cols } from '@/lib/react-table'
import { IPlayer } from '@/lib/types'
import {
    flexRender,
    getCoreRowModel,
    useReactTable,
} from '@tanstack/react-table'
import React from 'react'

interface ITable {
    data: IPlayer[]
}

function Table({ data }: ITable) {
    const table = useReactTable({
        data,
        columns: cols,
        getCoreRowModel: getCoreRowModel(),
    })
    return (
        <div className="w-full flex flex-col items-center justify-center">
            <table className="rounded-lg overflow-hidden min-w-[800px]">
                <thead className=" bg-gray-300">
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <th key={header.id} className="py-2">
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                              header.column.columnDef.header,
                                              header.getContext()
                                          )}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map((row) => (
                        <tr key={row.id} className="border-b">
                            {row.getVisibleCells().map((cell) => (
                                <td key={cell.id} className="text-center py-2">
                                    {flexRender(
                                        cell.column.columnDef.cell,
                                        cell.getContext()
                                    )}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Table
