import React from 'react'

export default function Card({ icon, isRoundedIcon, statsTitle, statsValue, statsDetail }) {
    return (
        <div className='bg-white p-6 rounded shadow-md h-fit'>
            <div className="flex items-center justify-between">
                <div>
                    <h3 className='my-1 text-sm text-slate-500'>{statsTitle}</h3>
                    <p className='text-3xl font-bold my-5'>{statsValue}</p>
                    {statsDetail && <p className='text-xs flow-root'>
                        {statsDetail}
                    </p>}
                </div>
                <div className='pl-5'>
                    {isRoundedIcon && icon && <div className='rounded-full bg-blue-100 p-4 shadow-md'>
                        {icon}
                    </div>}
                    {!isRoundedIcon && icon && { icon }}
                </div>
            </div>
        </div>
    )
}
