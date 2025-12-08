import Nav from '@/components/Nav'
import Image from "next/image";
import React from 'react'
import styles from './page.module.css'
import { FaPlay } from 'react-icons/fa';
import Link from 'next/link';

export default function Page() {
  return (
    <>
        <Nav />
        <div className={styles.title}>TO START ANALYSIS</div>
        <div className={styles["preview-wrapper"]}>
            <p className={styles["para"]}>Preview</p>
            <div className={styles["preview-box"]}></div>
        </div>

        <div className="flex flex-row">
            <div className={styles.container}>
                <div className={`${styles.square} ${styles.square_1}`}></div>
                <div className={`${styles.square} ${styles.square_2}`}></div>
                <div className={`${styles.square} ${styles.square_3}`}></div>
                <div className={styles["icon-wrapper"]}>
                    <Image className={styles["icon"]} src="/assets/camera-icon.webp" width={120} height={120} alt="Take photo" />
                    <div className={styles["camera"]}>
                        <Image className={styles.scan_line} src="/assets/ResScanLine.webp" width={66} height={59} alt="Take photo" />
                        <div className={styles["indication"]}>
                            <p>ALLOW A.I.</p>
                            <p>TO SCAN YOUR FACE</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.container}>
                <div className={`${styles.square} ${styles.square_1}`}></div>
                <div className={`${styles.square} ${styles.square_2}`}></div>
                <div className={`${styles.square} ${styles.square_3}`}></div>
                <div className={styles["icon-wrapper"]}>
                    <Image className={styles["icon"]} src="/assets/gallery-icon.webp" width={120} height={120} alt="Take photo" />
                    <div className={styles["upload"]}>
                        <Image className={styles.scan_line} src="/assets/ResScanLine.webp" width={66} height={59} alt="Take photo" />
                        <div className={styles["indication"]}>
                            <p>ALLOW A.I.</p>
                            <p>ACCESS GALLERY</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className={styles.row_wrapper}>
            <Link href="/testing">
                <div className={styles["left-btn__wrapper"]}>
                    <div className={styles["btn-frame"]}>
                        <FaPlay size={12} className={styles["left-play"]}/>
                        <div className={styles["inner-content"]}>BACK</div>
                    </div>
                    <div className={styles["btn-content"]}>BACK</div>
                </div>
            </Link>
        </div>
    </>
  )
}
