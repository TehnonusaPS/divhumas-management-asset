import React from 'react';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from '@/Components/ui/Table';

export default function DataTable({
    columns = [], // Array of { key, label, render, className, cellClassName }
    data = [],    // Array of records
    emptyText = 'Tidak ada data untuk ditampilkan',
}) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    {columns.map((column) => (
                        <TableHead key={column.key} className={column.className}>
                            {column.label}
                        </TableHead>
                    ))}
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.length === 0 ? (
                    <TableRow>
                        <TableCell colSpan={columns.length} className="text-center py-10 text-muted">
                            {emptyText}
                        </TableCell>
                    </TableRow>
                ) : (
                    data.map((row, rowIndex) => (
                        <TableRow key={row.id || rowIndex}>
                            {columns.map((column) => (
                                <TableCell key={column.key} className={column.cellClassName}>
                                    {column.render
                                        ? column.render(row, rowIndex)
                                        : row[column.key]}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))
                )}
            </TableBody>
        </Table>
    );
}
