import Nav from '@/components/Nav'
import React from 'react'
import styles from './page.module.css'
import Link from 'next/link'
import { FaPlay } from 'react-icons/fa'

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
            <div className={`${styles.content} cursor-pointer! bg-gray-200!`}>
                <p className={styles["description"]}>EMOGRAPHICS</p>
                <div className={`${styles.square__wrapper} ${styles.square_1}`}>
                    <div className={`${styles.square}`}></div>
                </div>
            </div>
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
        <Link href="/result">
            <div className={styles["right-btn__wrapper"]} >
                <div className={styles["btn-content"]}>GET SUMMARY</div>
                <div className={styles["btn-frame"]}>
                    <FaPlay size={12} className={styles["right-play"]}/>
                    <div className={styles["inner-content"]}>SUM</div>
                </div>
            </div>
        </Link>
    </div>
    </>
  )
}
