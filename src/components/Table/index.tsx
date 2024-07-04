"use client";

import DataTable from "react-data-table-component";
import "./table.scss";
import { useEffect, useState } from "react";

export default function Table({ data, cols }: { data: Array<any>; cols: Array<any> }) {
    const [columns, setColumns] = useState(cols);

    useEffect(() => {
        setColumns(
            cols.map(c => {
                c.selector = (row: any) => row[c.name.toLowerCase()];
                return c;
            }),
        );
    }, [cols]);

    return <DataTable data={data} columns={columns} />;
}
