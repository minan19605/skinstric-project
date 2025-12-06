'use client';

import Nav from '@/components/Nav';
import React, { useState } from 'react'

import styles from './page.module.css'
import { FaPlay } from 'react-icons/fa';
import Link from 'next/link';

export default function Page() {
    const [name, setName] = useState('')
  return (
    <>
        <Nav />
        <div className={styles.title}>TO START ANALYSIS</div>
        <div className={styles.container}>
            <div className={`${styles.square} ${styles.square_1}`}></div>
            <div className={`${styles.square} ${styles.square_2}`}></div>
            <div className={`${styles.square} ${styles.square_3}`}></div>
            <div className='flex flex-col items-center'>
                <p className="text-sm text-gray-400 uppercase mb-1">CLICK TO TYPE</p>
                <input suppressHydrationWarning type='text' className={styles.centerInput} placeholder='Introduce Yourself' value={name} onChange={(e) => setName(e.target.value)} />
            </div>
        </div>
        <div className={styles.row_wrapper}>
            <Link href="/">
                <div className={styles["left-btn__wrapper"]}>
                    <div className={styles["btn-frame"]}>
                        <FaPlay size={12} className={styles["left-play"]}/>
                        <div className={styles["inner-content"]}>BACK</div>
                    </div>
                    <div className={styles["btn-content"]}>BACK</div>
                </div>
            </Link>
            <Link href="/testing">
                <div className={styles["right-btn__wrapper"]}>
                    <div className={styles["btn-content"]}>Need TEST</div>
                    <div className={styles["btn-frame"]}>
                        <FaPlay size={12} className={styles["right-play"]}/>
                        <div className={styles["inner-content"]}>TEST</div>
                    </div>
                </div>
            </Link>
        </div>
    </>
  )
}
