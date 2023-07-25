'use client'

import { cols } from '@/lib/react-table'
import { PlayerType } from '@/lib/validation'
import {
    flexRender,
    getCoreRowModel,
    useReactTable,
    getPaginationRowModel,
} from '@tanstack/react-table'
import { useRouter } from 'next/navigation'
import React from 'react'

interface ITable {
    data: PlayerType[]
    playersCount: number
    currenPage: number
}

function Table({ data, playersCount, currenPage }: ITable) {
    const table = useReactTable({
        data,
        columns: cols,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        initialState: {
            pagination: {
                pageIndex: 0,
            },
        },
    })

    const router = useRouter()

    const goToPage = (page: number) => {
        router.push('/?page=' + page)
    }

    console.log(currenPage)

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
                    (_: any, i: number) => (
                        <button
                            key={i}
                            onClick={() => goToPage(i + 1)}
                            className={`border px-3 py-1 rounded ${
                                i + 1 === Number(currenPage)
                                    ? 'bg-blue-400 border-blue-400 text-white'
                                    : ''
                            }`}
                        >
                            {i + 1}
                        </button>
                    )
                )}
            </div>
        </div>
    )
}

export default Table
