'use client';

import Nav from '@/components/Nav'
import React, { useEffect, useState } from 'react'
import Image from "next/image";
import { useRouter } from 'next/navigation';

import styles from './page.module.css'

export default function Page() {
    const [loading, setLoading] = useState(true)

    const router = useRouter();
    
    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false)
            router.push("/camera/capture")

        }, 1500);

        return () => clearTimeout(timer)
    }, [])
    
  return (
    <>
    <Nav />
    {loading &&
    <div className="flex flex-col">
        <div className={styles.container}>
            <div className={`${styles.square} ${styles.square_1}`}></div>
            <div className={`${styles.square} ${styles.square_2}`}></div>
            <div className={`${styles.square} ${styles.square_3}`}></div>
            <div className={styles["icon-wrapper"]}>
                <Image className={styles["icon"]} src="/assets/camera-icon.webp" width={120} height={120} alt="Take photo" />
                <div className={styles["indication"]}>
                    <p>SETTING UP CAMERA ...</p>
                </div>
            </div>
        </div>
        <div className={styles["discriptions"]}>
            <p>TO GET BETTER RESULTS MAKE SURE TO HAVE</p>
            <div className={styles["methods__wrapper"]}>
                <div className={styles["method"]}>
                    <div className={styles["small__square"]}></div><span>NEURAL EXPRESSION</span>
                </div>
                <div className={styles["method"]}>
                    <div className={styles["small__square"]}></div><span>FRONTAL POSE</span>
                </div>
                <div className={styles["method"]}>
                    <div className={styles["small__square"]}></div><span>ADEQUATE LIGHTING</span>
                </div>
            </div>
        </div>
    </div>}
    </>

  )
}
