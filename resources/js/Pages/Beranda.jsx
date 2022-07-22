import React from 'react'
import { Head } from '@inertiajs/inertia-react'
import NavbarHome from '@/Components/NavbarHome'
import { Link } from '@inertiajs/inertia-react'
import CountUp from 'react-countup';

import { BsPencilSquare } from 'react-icons/bs'
import { RiShareForwardFill } from 'react-icons/ri'
import { IoMdChatboxes } from 'react-icons/io'
import { GiCheckMark } from 'react-icons/gi'


export default function Beranda(props) {

    const onHandleSubmit = (e) => {
        e.preventDefault()
        let radioList = e.target.elements.listRadio
        let checkedRadio = Array.from(radioList).find(node => node.checked == true).value
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

                            <h3 className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Pilih Jenis Benturan Kepentingan</h3>

                            <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white md:grid md:grid-cols-4">
                                <li className="w-full border-b border-gray-200 sm:border-r dark:border-gray-600">
                                    <div className="flex items-center pl-3">
                                        <input type="radio" value="coitype1" name="listRadio" defaultChecked className="radio-input dark: focus:ring-blue-600 dark:ring-offset-gray-700  dark:bg-gray-600 dark:border-gray-500" />
                                        <label htmlFor="gratifikasi" className="radio-label dark:text-gray-300">Gratifikasi</label>
                                    </div>
                                </li>
                                <li className="w-full border-b border-gray-200 sm:border-r dark:border-gray-600">
                                    <div className="flex items-center pl-3">
                                        <input type="radio" value="coitype2" name="listRadio" className="radio-input dark: focus:ring-blue-600 dark:ring-offset-gray-700  dark:bg-gray-600 dark:border-gray-500" />
                                        <label htmlFor="Penggunaan Aset (BMN)" className="radio-label dark:text-gray-300">Penggunaan Aset (BMN)</label>
                                    </div>
                                </li>
                                <li className="w-full border-b border-gray-200 sm:border-r dark:border-gray-600">
                                    <div className="flex items-center pl-3">
                                        <input type="radio" value="coitype3" name="listRadio" className="radio-input dark: focus:ring-blue-600 dark:ring-offset-gray-700  dark:bg-gray-600 dark:border-gray-500" />
                                        <label htmlFor="Rahasia Jabatan/Instansi" className="radio-label dark:text-gray-300">Rahasia Jabatan/Instansi</label>
                                    </div>
                                </li>
                                <li className="w-full border-b border-gray-200 dark:border-gray-600">
                                    <div className="flex items-center pl-3">
                                        <input type="radio" value="coitype4" name="listRadio" className="radio-input dark: focus:ring-blue-600 dark:ring-offset-gray-700  dark:bg-gray-600 dark:border-gray-500" />
                                        <label htmlFor="Perangkapan Jabatan" className="radio-label dark:text-gray-300">Perangkapan Jabatan</label>
                                    </div>
                                </li>
                                <li className="w-full border-gray-200 sm:border-r dark:border-gray-600">
                                    <div className="flex items-center pl-3">
                                        <input type="radio" value="coitype5" name="listRadio" className="radio-input dark: focus:ring-blue-600 dark:ring-offset-gray-700  dark:bg-gray-600 dark:border-gray-500" />
                                        <label htmlFor="Rekrutmen Pegawai" className="radio-label dark:text-gray-300">Rekrutmen Pegawai</label>
                                    </div>
                                </li>
                                <li className="w-full border-gray-200 sm:border-r dark:border-gray-600">
                                    <div className="flex items-center pl-3">
                                        <input type="radio" value="coitype6" name="listRadio" className="radio-input dark: focus:ring-blue-600 dark:ring-offset-gray-700  dark:bg-gray-600 dark:border-gray-500" />
                                        <label htmlFor="Penyalahgunaan Jabatan" className="radio-label dark:text-gray-300">Penyalahgunaan Jabatan</label>
                                    </div>
                                </li>
                                <li className="w-full dark:border-gray-600">
                                    <div className="flex items-center pl-3">
                                        <input type="radio" value="coitype7" name="listRadio" className="radio-input dark: focus:ring-blue-600 dark:ring-offset-gray-700  dark:bg-gray-600 dark:border-gray-500" />
                                        <label htmlFor="Pengawasan Tidak Prosedur" className="radio-label dark:text-gray-300">Pengawasan Tidak Prosedur</label>
                                    </div>
                                </li>

                            </ul>

                            <div>
                                <label htmlFor="judul" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Judul Laporan</label>
                                <input type="text" name="title" id="title" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="Isikan judul laporan" required={true} />
                            </div>
                            <div>
                                <label htmlFor="deskripsi" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Deskripsi Laporan</label>
                                <textarea id="deskripsi" name='description' rows="10" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Uraikan detail laporan anda"></textarea>
                            </div>



                            <div className='flex md:justify-between flex-col sm:flex-row gap-4 md:items-end'>
                                <div className='md:w-1/2'>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300" htmlFor="file_input">Upload Lampiran</label>
                                    <input className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="file_input_help" id="file_input" type="file" />
                                    {/* <p className="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">SVG, PNG, JPG or GIF (MAX. 800x400px).</p> */}

                                </div>
                                <button type="submit" className="py-3 px-5 md:w-1/4 text-base text-center text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 transition-all ease-in-out duration-200 font-bold uppercase">Lapor</button>
                            </div>
                        </form>
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
                        <p className='text-sm hidden md:block'>Inspektorat akan menindaklanjuti laporan Anda</p>
                    </div>
                    <div>
                        <div className='bg-white w-16 h-16 rounded-full m-auto drop-shadow-lg mb-4 flex items-center justify-center'>
                            <GiCheckMark fill='#000' size={'2rem'} />
                        </div>
                        <h2 className='font-bold text-base mb-2'>Selesai</h2>
                        <p className='text-sm hidden md:block'>Laporan Anda akan terus ditindaklanjuti hingga terselesaikan</p>
                    </div>

                    <div className='text-center col-span-4 mt-8 md:mt-16'>
                        <Link href="#" className='text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-4 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-600 dark:focus:ring-blue-800'>
                            Pelajari Lebih Lanjut
                        </Link>

                    </div>
                </section>

                <section style={{ background: `rgb(28,100,242)` }} className='hero-count h-72 my-20 text-center font-bold text-white mx-auto align-middle pt-12'>
                    <h2 className='text-3xl uppercase mb-10'>Jumlah Laporan Sekarang</h2>
                    <CountUp duration={3} className='text-8xl' end={1021021} />
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
                            <li role="presentation" className="active  ">
                                <Link className='hover:underline' href="https://www.sipenbening.bangka.go.id">
                                    BERANDA
                                </Link>

                            </li>
                            <li role="presentation" className="  ">
                                <Link className='hover:underline' href="https://blog.sipenbening.bangka.go.id" target="_blank">
                                    BLOG
                                </Link>

                            </li>
                            <li role="presentation" className="  ">
                                <Link className='hover:underline' href="https://www.sipenbening.bangka.go.id/kisah-sukses">
                                    KISAH SUKSES
                                </Link>

                            </li>
                            <li role="presentation" className="  ">
                                <Link className='hover:underline' href="https://www.sipenbening.bangka.go.id/terms-of-use">
                                    KETENTUAN LAYANAN
                                </Link>

                            </li>
                            <li role="presentation" className="  ">
                                <Link className='hover:underline' href="https://www.sipenbening.bangka.go.id/tentang">
                                    TENTANG KAMI
                                </Link>

                            </li>
                            <li role="presentation" className="  ">
                                <Link className='hover:underline' href="https://www.sipenbening.bangka.go.id/tutorial-video">
                                    TUTORIAL VIDEO
                                </Link>

                            </li>
                            <li role="presentation" className="  ">
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
