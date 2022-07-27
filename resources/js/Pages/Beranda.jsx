import React, { useReducer, useState } from 'react'
import NavbarHome from '@/Components/NavbarHome'
import { Link, Head } from '@inertiajs/inertia-react'
import CountUp from 'react-countup';

import { BsPencilSquare } from 'react-icons/bs'
import { RiShareForwardFill } from 'react-icons/ri'
import { IoMdChatboxes } from 'react-icons/io'
import { GiCheckMark } from 'react-icons/gi'
import axios from 'axios'

import ContentLoader from 'react-content-loader'


export default function Beranda(props) {

    const initialState = {
        title: null,
        description: null,
        departmentId: null,
        categoryId: 1
    };

    const [formState, updateFormState] = useReducer(
        (state, updates) => ({ ...state, ...updates }),
        initialState
    );

    const [isLoading, setIsLoading] = useState(false)

    const onHandleSubmit = async (e) => {

        e.preventDefault()

        const attachments = document.getElementById('attachments-input')

        const formData = new FormData();
        for (let i = 0; i < attachments.files.length; i++) {
            formData.append(`attachments[]`, attachments.files[i]);
        }
        formData.append("title", formState.title);
        formData.append("description", formState.description);
        formData.append("departmentId", formState.departmentId);
        formData.append("categoryId", formState.categoryId);


        const res = await axios({
            method: "POST",
            url: route('benturan-kepentingan.store'),
            data: formData,
            headers: {
                "Content-Type": "multipart/form-data"
            }

        })
        console.log(res)
    }


    return (
        <>
            <Head title="Beranda" />
            <>
                <NavbarHome user={props.auth.user} />
                <section className='md:pt-56 pt-20 hero'>
                    <h1 className='text-5xl text-center font-bold'>Layanan Pengawasan Benturan Kepentingan</h1>
                    <p className='text-center text-xl my-6'>Sampaikan laporan anda adanya Benturan Kepentingan di Lingkup Pemerintahan Kabupaten Bangka</p>
                </section>

                <section className='mx-auto max-w-7xl mb-10 md:-mt-96'>
                    <div className="p-4 max-w-full bg-white rounded-lg border border-gray-200 shadow-lg sm:p-6 lg:p-8 dark:bg-gray-800 dark:border-gray-700">
                        <form onSubmit={onHandleSubmit} className="space-y-6" >
                            <h5 className="text-xl dark:text-gray-900 bg-blue-600 p-3 text-white font-bold">Sampaikan Laporan Anda</h5>

                            <div>
                                <h3 className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Pilih Jenis Benturan Kepentingan</h3>

                                <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white md:grid md:grid-cols-4">
                                    {props?.categories && props.categories.map((category, idx) => <li className={`w-full ${idx > 3 ? "" : "border-b"} border-gray-200 ${idx == 3 || idx == 6 ? "" : "sm:border-r"} dark:border-gray-600`} key={`category-key-${idx}`}>
                                        <div className="flex items-center pl-3">
                                            <input onChange={e => updateFormState({ categoryId: e.target.value })} type="radio" checked={formState.categoryId == category?.id} value={category?.id} className="radio-input dark: focus:ring-blue-600 dark:ring-offset-gray-700  dark:bg-gray-600 dark:border-gray-500" />
                                            <label htmlFor={category?.name} className="radio-label dark:text-gray-300">{category?.name}</label>
                                        </div>
                                    </li>)}
                                </ul>

                            </div>
                            <div>
                                <label htmlFor="judul" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Judul Laporan</label>
                                <input type="text" name="title" onChange={e => updateFormState({ title: e.target.value })} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Isikan judul laporan" required={true} />
                            </div>
                            <div>
                                <label htmlFor="deskripsi" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Deskripsi Laporan</label>
                                <textarea onChange={e => updateFormState({ description: e.target.value })} name='description' rows="10" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Uraikan detail laporan anda"></textarea>
                            </div>
                            <div>

                                <label htmlFor="countries" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Instansi/OPD</label>
                                <select id="countries" onChange={e => updateFormState({ departmentId: e.target.value })} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    <option defaultChecked>Pilih Instansi Terkait</option>
                                    {props.departments && <>
                                        {props.departments.map((dept) => <option key={`dept-${dept.id}`} value={dept.id}>{dept.name}</option>)}
                                    </>}
                                </select>


                            </div>
                            <div className='flex md:justify-between flex-col sm:flex-row gap-4 md:items-end'>
                                <div className='md:w-1/2'>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300" htmlFor="file_input">Upload Lampiran</label>
                                    <input id='attachments-input' multiple className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="file_input_help" type="file" />
                                    {/* <p className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">SVG, PNG, JPG or GIF (MAX. 800x400px).</p> */}

                                </div>
                                <button type="submit" className="py-3 px-5 md:w-1/4 text-base text-center text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 transition-all ease-in-out duration-200 font-bold uppercase">{isLoading ? <> <svg role="status" className="inline mr-3 w-4 h-4 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                                </svg>
                                    Loading...</> : "Lapor!"}</button>
                            </div>
                        </form>
                        <ContentLoader
                            speed={2}
                            width={"1280px"}
                            height={"949px"}
                            backgroundColor="#f3f3f3"
                            foregroundColor="#ecebeb"
                            style={{ width: "100%" }}
                            className="hidden"

                        >
                            <rect x="0" y="0" rx="0" ry="0" width="100%" height="7%" />
                            <rect x="0" y="9.8%" rx="0" ry="0" width="23%" height="2%" />
                            <rect x="0" y="13.5%" rx="10" ry="10" width="100%" height="9.5%" />
                            <rect x="0" y="25.8%" rx="0" ry="0" width="15%" height="2%" />
                            <rect x="0" y="30%" rx="10" ry="10" width="100%" height="6%" />
                            <rect x="0" y="38%" rx="0" ry="0" width="18%" height="2%" />
                            <rect x="0" y="42%" rx="10" ry="10" width="100%" height="24%" />
                            <rect x="0" y="68%" rx="0" ry="0" width="14%" height="2%" />
                            <rect x="0" y="72%" rx="10" ry="10" width="100%" height="5%" />
                            <rect x="0" y="79%" rx="0" ry="0" width="14%" height="2%" />
                            <rect x="0" y="83%" rx="10" ry="10" width="50%" height="5%" />
                            <rect x="78%" y="83%" rx="10" ry="10" width="22%" height="5%" />


                        </ContentLoader>

                    </div>
                </section>

                <section className='grid grid-cols-4 gap-5 max-w-7xl mx-auto my-24 text-center'>
                    <div>
                        <div className=' bg-blue-500 w-full h-1 relative z-0 left-1/2 top-8 rounded-xl overflow-hidden border-0'></div>
                        <div className='bg-blue-500 w-16 h-16 rounded-full m-auto drop-shadow-lg mb-4 flex items-center justify-center'>
                            <BsPencilSquare fill='#fff' size={'2rem'} />
                        </div>
                        <h2 className='font-bold text-base mb-2'>Tulis Laporan</h2>
                        <p className='text-sm hidden md:block'>Laporkan keluhan atau aspirasi anda dengan jelas dan lengkap</p>
                    </div>

                    <div>
                        <div className=' bg-slate-200 w-full h-1 relative z-0 left-1/2 top-8 rounded-xl overflow-hidden border-0'></div>
                        <div className='bg-white w-16 h-16 rounded-full m-auto drop-shadow-lg mb-4 flex items-center justify-center'>
                            <RiShareForwardFill fill='#000' size={'2rem'} />
                        </div>
                        <h2 className='font-bold text-base mb-2'>Proses Verifikasi</h2>
                        <p className='text-sm hidden md:block'>Laporan Anda akan diverifikasi dan diteruskan kepada instansi berwenang</p>
                    </div>

                    <div>
                        <div className=' bg-slate-200 w-full h-1 relative z-0 left-1/2 top-8 rounded-xl overflow-hidden border-0'></div>
                        <div className='bg-white w-16 h-16 rounded-full m-auto drop-shadow-lg mb-4 flex items-center justify-center'>
                            <IoMdChatboxes fill='#000' size={'2rem'} />
                        </div>
                        <h2 className='font-bold text-base mb-2'>Proses Tindak Lanjut</h2>
                        <p className='text-sm hidden md:block'>Laporan Anda akan segera ditindaklanjuti dan diidentifikasi</p>
                    </div>
                    <div>
                        <div className='bg-white w-16 h-16 rounded-full m-auto drop-shadow-lg mb-4 flex items-center justify-center'>
                            <GiCheckMark fill='#000' size={'2rem'} />
                        </div>
                        <h2 className='font-bold text-base mb-2'>Selesai</h2>
                        <p className='text-sm hidden md:block'>Laporan Anda akan terus ditindaklanjuti hingga terselesaikan</p>
                    </div>

                    <div className='text-center col-span-4 mt-8 md:mt-16'>
                        <Link href="#" className='text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-4 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-600 dark:focus:ring-blue-800 transition-all ease-in-out duration-200'>
                            Pelajari Lebih Lanjut
                        </Link>

                    </div>
                </section>

                <section style={{ background: `rgb(28,100,242)` }} className='hero-count h-72 my-20 text-center font-bold text-white mx-auto align-middle pt-12'>
                    <h2 className='text-3xl uppercase mb-10'>Jumlah Laporan Sekarang</h2>
                    <CountUp duration={3} className='text-8xl' end={props.totalCOI} />
                </section>

                <footer className='mb-10'>
                    <div className='flex justify-between my-10 mx-auto gap-0 max-w-md text-center'>
                        <div>
                            <h3>Dikelola oleh</h3>
                            <div className="flex justify-between mt-5">
                                <Link className='w-20 mx-auto' href='#'>
                                    <img className='w-full h-full' src='https://www.lapor.go.id/themes/lapor/assets/images/logo-kominfo.png' />
                                </Link>
                            </div>
                        </div>
                        <div>
                            <h3>Lebih Dekat dengan kami</h3>
                            <div className="flex justify-between mt-5 gap-2">
                                <Link className='mx-auto' href='#'>
                                    <img className='w-12 h-12 drop-shadow-lg' src='./facebook.png' />
                                </Link>
                                <Link className='mx-auto' href='#'>
                                    <img className='w-12 h-12 drop-shadow-lg' src='./twitter.png' />
                                </Link>
                                <Link className='mx-auto' href='#'>
                                    <img className='w-12 h-12 drop-shadow-lg' src='./instagram.png' />
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className='mb-5 mt-16'>
                        <ul className='flex justify-between max-w-4xl mx-auto gap-3 font-bold text-gray-500 text-sm'>
                            <li role="presentation" className="active">
                                <Link className='hover:underline' href="https://www.sipenbening.bangka.go.id">
                                    BERANDA
                                </Link>

                            </li>
                            <li role="presentation">
                                <Link className='hover:underline' href="https://blog.sipenbening.bangka.go.id" target="_blank">
                                    BLOG
                                </Link>

                            </li>
                            <li role="presentation">
                                <Link className='hover:underline' href="https://www.sipenbening.bangka.go.id/kisah-sukses">
                                    KISAH SUKSES
                                </Link>

                            </li>
                            <li role="presentation">
                                <Link className='hover:underline' href="https://www.sipenbening.bangka.go.id/terms-of-use">
                                    KETENTUAN LAYANAN
                                </Link>

                            </li>
                            <li role="presentation">
                                <Link className='hover:underline' href="https://www.sipenbening.bangka.go.id/tentang">
                                    TENTANG KAMI
                                </Link>

                            </li>
                            <li role="presentation">
                                <Link className='hover:underline' href="https://www.sipenbening.bangka.go.id/tutorial-video">
                                    TUTORIAL VIDEO
                                </Link>

                            </li>
                            <li role="presentation">
                                <Link className='hover:underline' href="https://www.sipenbening.bangka.go.id/hubungi">
                                    HUBUNGI KAMI
                                </Link>

                            </li>
                        </ul>
                    </div>
                    <div className="text-center text-sm text-gray-500">
                        Copyright 2022. <Link className='hover:underline hover:text-gray-500 text-blue-600' href="http://inspektorat.bangka.go.id/" data-toggle="tooltip" title="Inspektorat Bangka" target="_blank">Inspektorat Bangka</Link>. Hak cipta dilindungi Undang-Undang.
                    </div>
                </footer>

            </>
        </>
    );
}
