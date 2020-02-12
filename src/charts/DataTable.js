import React from 'react';

function DataTable({ data, configuration, ...props }) {

    const inverse = configuration.table.inverse;

    return (
        <table className="table table-striped table-bordered table-sm bg-white">
            <thead>
                <tr>
                    <th>{configuration.table.cornerHeader}</th>
                {inverse ?
                    data.labels.map((label, index) =>
                        <th key={index}>{label}</th>
                    )
                :
                    data.datasets.map((set, index) =>
                        <th key={index}>{set.label}</th>
                    )
                }
                </tr>
            </thead>
            <tbody>
            { inverse ?
            data.datasets.map((set, setIndex) =>
                <tr key={setIndex}>
                    <td>{set.label}</td>
                    {data.labels.map((label, index) =>
                        <td key={index}>{set.data[index]}</td>
                    )}
                </tr>
            )
            :
            data.labels.map((label, index) =>
                <tr key={index}>
                    <td>{ label }</td>
                    { data.datasets.map((set, setIndex) =>
                        <td key={setIndex}>{set.data[index]}</td>
                    )}
                </tr>
            ) }
            </tbody>
        </table>
    );
}

export default DataTable;