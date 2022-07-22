import React, { useState } from 'react';

import DateButton from './DateButton';
import Card from './Card';
import { BsArrowUp, BsArrowDown } from 'react-icons/bs'

import { AiOutlineSolution } from 'react-icons/ai'

export default function Cards({ cardsStats }) {

    const [active, setActive] = useState(`${route().params?.date ? route().params?.date + "Btn" : "allBtn"}`)

    const statsDetailComponent = (type = null, value) => {
        let floatValue = parseFloat(value)

        const dateIndo = {
            "weekBtn": "dibanding seminggu yang lalu",
            "monthBtn": "dibanding sebulan yang lalu",
            "yearBtn": "dibanding setahun yang lalu"
        }

        if (type == 'percent') {
            if (floatValue > 0) return <><span className='text-green-400'><BsArrowUp className='inline' /> </span>
                <span className='text-green-400'>{`${floatValue.toFixed(3)}`}% </span>
                <span> {dateIndo[active]}</span></>
            if (floatValue < 0) return <><span className='text-red-400'><BsArrowDown className='inline' /> </span>
                <span className='text-red-400'>{`${floatValue.toFixed(3)}`}% </span>
                <span>{dateIndo[active]}</span></>
        }
        if (type == 'description') return <>
            <span className='text-xs mb-2 text-blue-500 font-bold'>({value})</span>
        </>
        return null
    }

    return (
        <>
            <DateButton active={active} setActive={setActive} />
            <div className={`grid grid-cols-${cardsStats.length} gap-4 my-4`}>
                {cardsStats.map((cardData, cardIndex) => (<Card key={cardIndex} statsTitle={cardData.statsTitle} statsValue={cardData.statsValue} statsDetail={statsDetailComponent(cardData.statsDetail?.type, cardData.statsDetail?.value)} icon={<AiOutlineSolution className='text-3xl text-blue-600' />} isRoundedIcon={true} />))}</div>
        </>
    )
}
