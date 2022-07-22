import React, { useEffect } from 'react'
import DateRangePicker from '@themesberg/tailwind-datepicker/DateRangePicker';
import Datepicker from '@themesberg/tailwind-datepicker/Datepicker';
import id from '@themesberg/tailwind-datepicker/locales/id';
import { Link } from '@inertiajs/inertia-react'
import { Inertia } from '@inertiajs/inertia'


Object.assign(Datepicker.locales, id);

const DateButton = ({ active, setActive }) => {


    const handleClick = (e) => {
        const { id } = e.target
        setActive(id)
    }
    const isActive = (id) => active === id

    useEffect(() => {
        const dateRangePickerEl = document.getElementById('dateRangePicker')
        const dateRangePicker = new DateRangePicker(dateRangePickerEl, { language: "id", format: "dd MM yyyy", allowOneSidedRange: true, clearBtn: true, todayBtn: true, todayBtnMode: 1 })
        dateRangePicker.datepickers.map((value) => {
            value.element.addEventListener("changeDate", (evt) => evt.detail.datepicker.refresh('picker', true))
            value.element.addEventListener("show", (evt) => evt.detail.datepicker.refresh('picker', true))
            value.element.addEventListener("hide", function (evt) {

                evt.detail.datepicker.refresh('picker', true)
                const startDate = dateRangePicker.datepickers[0].getDate('yyyy-mm-dd')
                const endDate = dateRangePicker.datepickers[1].getDate('yyyy-mm-dd')

                if (startDate && endDate) return Inertia.get(route('dashboard'), { start_date: startDate, end_date: endDate }, { preserveState: true })
                // return Inertia.get(route('dashboard'), { start_date: null, end_date: null }, { preserveState: true })
            })
        })


        return () => {
            dateRangePicker.destroy()
        }
    }, [])

    return (
        <div className='flex justify-center md:justify-end md:space-x-4 flex-wrap space-y-4 md:space-y-0'>

            <div className="flex overflow-hidden shadow-sm sm:rounded-lg w-fit space-x-1">
                <Link preserveState onClick={handleClick} href={route('dashboard', 'week')} method="get" as="button" type="button" id='weekBtn' className={`card-button ${isActive('weekBtn') ? "active" : ""}`}>Minggu</Link>
                <Link preserveState onClick={handleClick} href={route('dashboard', 'month')} method="get" as="button" type="button" id='monthBtn' className={`card-button ${isActive('monthBtn') ? "active" : ""}`}>Bulan</Link>
                <Link preserveState onClick={handleClick} href={route('dashboard', 'year')} method="get" as="button" type="button" id='yearBtn' className={`card-button ${isActive('yearBtn') ? "active" : ""}`}>Tahun</Link>
                <Link preserveState onClick={handleClick} href={route('dashboard')} method="get" as="button" type="button" id='allBtn' className={`card-button ${isActive('allBtn') ? "active" : ""}`}>Seluruh</Link>
            </div>

            <div className=" overflow-hidden w-fit bg-none">
                <div id='dateRangePicker' className="flex items-center w-fit p-1">
                    <div className="relative">
                        <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                            <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"></path></svg>
                        </div>
                        <input name="start" type="text" className="bg-white shadow border-0  text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Tgl mulai" />
                    </div>
                    <span className="mx-2 text-gray-700 ">-</span>
                    <div className="relative">
                        <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                            <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"></path></svg>
                        </div>
                        <input name="end" type="text" className="bg-white shadow border-0  text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Tgl akhir" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DateButton
