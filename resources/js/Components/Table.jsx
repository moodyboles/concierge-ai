import _ from 'lodash';

export default function Table({ heads, rows, className = '' }) {

    return (
        <table className={"border-collapse table-auto w-full text-sm " + className}>
            <thead className='bg-white dark:bg-slate-700'>
                <tr>
                    {heads.map((head, idx) => (
                        <th 
                            key={idx}
                            className='border-b dark:border-slate-600 font-medium p-4 pl-8 text-slate-400 dark:text-slate-200 text-left'
                        >
                            {head}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {rows.map((row, idx) => (
                    <tr key={idx} className='bg-white dark:bg-slate-800 hover:bg-slate-900'>
                        {row.map((cell, idx) => (
                            <td 
                                key={idx}
                                className='border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400'
                            >
                                {cell}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
