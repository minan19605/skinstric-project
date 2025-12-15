import React from 'react'
import Link from 'next/link'
import { FaPlay } from 'react-icons/fa'
import styles  from './FoodNav.module.css'

interface NavProps {
    leftLink: string;
    rightLink: string;
    rightName: string;
    rightInnerName: string
}

export default function FootNav({leftLink,rightLink, rightName, rightInnerName}:NavProps) {
  return (
    <>
    <div className={styles.footNav_wrapper}>
        <Link href={leftLink}>
            <div className={styles["left-btn__wrapper"]}>
                <div className={styles["btn-frame"]}>
                    <FaPlay size={12} className={styles["left-play"]}/>
                    <div className={styles["inner-content"]}>BACK</div>
                </div>
                <div className={styles["btn-content"]}>BACK</div>
            </div>
        </Link>

        <Link href={rightLink}>
            <div className={styles["right-btn__wrapper"]} >
                <div className={styles["btn-content"]}>{rightName}</div>
                <div className={styles["btn-frame"]}>
                    <FaPlay size={12} className={styles["right-play"]}/>
                    <div className={styles["inner-content"]}>{rightInnerName}</div>
                </div>
            </div>
        </Link>
    </div>
    </>
  )
}
