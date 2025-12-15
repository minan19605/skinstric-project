'use client'

import Nav from '@/components/Nav'
import React, { useState } from 'react'
import styles from './page.module.css'
import Link from 'next/link'
import FootNav from '@/components/FootNav'

export default function Page() {
    type HoverKey = 'EMOGRAPHICS' | 'SKIN' | 'WEATHER' | 'COSMETIC' | null;
    const [hoverKey, setHoverKey] = useState<HoverKey>(null)

  return (
    <>
    <Nav />
    <div className={styles["title__wrapper"]}>
        <p className={styles["header"]}>A.I. ANALYSIS</p>
        <p className={styles["para"]}>
            A.I. has estimated the following.<br/>
            Fix estimated information if needed.
        </p>
    </div>

    <div className={styles.container}>
        <div className={styles["content__wrapper"]}>
            <div
                className={`${styles.overlay} ${hoverKey ? styles.overlay_show : ''} ${
                    hoverKey === 'EMOGRAPHICS' ? styles.overlay_1 :
                    hoverKey === 'SKIN' ? styles.overlay_2 :
                    hoverKey === 'WEATHER' ? styles.overlay_3 :
                    hoverKey === 'COSMETIC' ? styles.overlay_4 : ''
                }`}
                >
                <div className={styles.overlay_inner} />
            </div>
            <Link href="/summary">
                <div className={`${styles.content} cursor-pointer! bg-gray-200!`}
                    onMouseEnter={() => setHoverKey('EMOGRAPHICS')}
                    onMouseLeave={() => setHoverKey(null)}>
                    <p className={styles["description"]}>EMOGRAPHICS</p>
                </div>
            </Link>
            <div className={styles.content}
                onMouseEnter={() => setHoverKey('SKIN')}
                onMouseLeave={() => setHoverKey(null)}>
                <p className={styles["description"]}>SKIN TYPE DETAILS</p>
            </div>
            <div className={styles.content}
                onMouseEnter={() => setHoverKey('WEATHER')}
                onMouseLeave={() => setHoverKey(null)}>
                <p className={styles["description"]}>WEATHER</p>
            </div>
            <div className={styles.content}
                onMouseEnter={() => setHoverKey('COSMETIC')}
                onMouseLeave={() => setHoverKey(null)}>
                <p className={styles["description"]}>COSMETIC<br/>CONCERNS</p>
            </div>
        </div>
    </div>
    <FootNav leftLink="/result" rightLink="/summary" rightName="GET SUMMARY"  rightInnerName="SUM" />
    </>
  )
}
