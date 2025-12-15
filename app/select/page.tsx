import Nav from '@/components/Nav'
import React from 'react'
import styles from './page.module.css'
import Link from 'next/link'
import FootNav from '@/components/FootNav'

export default function Page() {
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
            <Link href="/summary">
            <div className={`${styles.content} cursor-pointer! bg-gray-200!`}>
                <p className={styles["description"]}>EMOGRAPHICS</p>
                <div className={`${styles.square__wrapper} ${styles.square_1}`}>
                    <div className={`${styles.square}`}></div>
                </div>
            </div>
            </Link>
            <div className={styles.content}>
                <p className={styles["description"]}>SKIN TYPE DETAILS</p>
                <div className={styles["square__wrapper"]}>
                <div className={`${styles.square} ${styles.square_2}`}></div>
                </div>
            </div>
            <div className={styles.content}>
                <p className={styles["description"]}>WEATHER</p>
                <div className={styles["square__wrapper"]}>
                <div className={`${styles.square} ${styles.square_3}`}></div>
                </div>
            </div>
            <div className={styles.content}>
                <p className={styles["description"]}>CCOSMETIC<br/>ONCERNS</p>
                <div className={styles["square__wrapper"]}>
                <div className={`${styles.square} ${styles.square_4}`}></div>
                </div>
            </div>
        </div>
    </div>
    <FootNav leftLink="/result" rightLink="/summary" rightName="GET SUMMARY"  rightInnerName="SUM" />
    </>
  )
}
