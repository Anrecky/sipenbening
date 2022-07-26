import React, { useRef, useEffect } from 'react';
import { Link } from '@inertiajs/inertia-react';

export default function NavbarHome({ user }) {

    const menuRef = useRef()
    const navRef = useRef()

    const toggleNavMenu = () => {
        menuRef.current.classList.toggle('hidden')
    }

    const handleScroll = () => {
        const position = window.pageYOffset
        if (position > 100) {
            navRef.current.classList.add('-translate-y-40')
        }
        if (position <= 50) {
            navRef.current.classList.remove('-translate-y-40')
        }
    };


    useEffect(() => {

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };

    }, [])

    return (
        <>
            <nav ref={navRef} className="border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900 fixed w-full md:bg-transparent text-white md:mt-6 bg-blue-800 ease-in-out duration-500 transition-all">
                <div className="container flex flex-wrap justify-between items-center mx-auto">
                    <Link href={route('home')} className="flex items-center">
                        <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">SIPENBENING</span>
                    </Link>
                    <div className="flex md:order-2">
                        {user ? (
                            <Link href={route('dashboard')} className="hidden md:block text-sm text-gray-700 underline">
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link href={route('login')} className="hidden md:block text-white border border-white hover:bg-white hover:text-black focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-7 py-3 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-600 dark:focus:ring-blue-800 transition-all ease-in-out duration-200">
                                    Masuk
                                </Link>
                            </>
                        )}
                        <button onClick={toggleNavMenu} data-collapse-toggle="mobile-menu-4" type="button" className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="mobile-menu-4" aria-expanded="false">
                            <span className="sr-only">Open main menu</span>
                            <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
                            <svg className="hidden w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                        </button>
                    </div>
                    <div ref={menuRef} className="hidden justify-between items-center w-full md:flex md:w-auto md:order-1" id="mobile-menu-4">
                        <ul className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
                            <li>
                                <Link href="#" className="uppercase text-base font-bold block py-2 pr-4 pl-3 text-white border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-300 md:hover:underline md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Tentang</Link>
                            </li>

                            <li>
                                <Link href="#" className="uppercase text-base font-bold block py-2 pr-4 pl-3 text-white border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-300 md:hover:underline md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Benturan Kepentingan</Link>
                            </li>
                        </ul>
                        <Link href={route('login')} className="bg-white text-blue-700 md:hidden uppercase text-base  hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-block mt-5">
                            Masuk
                        </Link>
                    </div>
                </div>
            </nav>
        </>
    )
}
