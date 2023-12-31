'use client'

import { cols } from '@/lib/react-table'
import { PlayerType } from '@/lib/validation'
import {
    flexRender,
    getCoreRowModel,
    useReactTable,
} from '@tanstack/react-table'
import Link from 'next/link'
import React from 'react'
import classNames from 'classnames'

interface ITable {
    data: PlayerType[]
    playersCount: number
    currentPage: number
}

function Table({ data, playersCount, currentPage }: ITable) {
    const table = useReactTable({
        data,
        columns: cols,
        getCoreRowModel: getCoreRowModel(),
    })

    return (
        <div className="w-full">
            <table className="rounded-lg overflow-hidden min-w-full">
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
            <div className="flex gap-3 mt-10 justify-center">
                {[...new Array(Math.ceil(playersCount / 10))].map(
                    (_, i: number) => (
                        <Link
                            key={i}
                            href={`/?page=${i + 1}`}
                            className={classNames(
                                'border px-4 py-2 rounded cursor-pointer',
                                {
                                    'bg-blue-400 border-blue-400 text-white':
                                        i + 1 === Number(currentPage),
                                }
                            )}
                        >
                            {i + 1}
                        </Link>
                    )
                )}
            </div>
        </div>
    )
}

export default Table
