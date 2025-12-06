'use client';

import Nav from '@/components/Nav';
import React, { useState } from 'react'

import styles from './page.module.css'

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
            <p className="text-sm text-gray-400 uppercase mb-1">CLICK TO TYPE</p>
            <input suppressHydrationWarning type='text' className={styles.centerInput} placeholder='Input your name' value={name} onChange={(e) => setName(e.target.value)} />
        </div>
    </>
  )
}
